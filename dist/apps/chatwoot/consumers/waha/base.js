"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBaseHandler = exports.MessageReportInfo = exports.ChatWootWAHABaseConsumer = void 0;
exports.ListenEventsForChatWoot = ListenEventsForChatWoot;
const AppConsumer_1 = require("../../../app_sdk/AppConsumer");
const JobLoggerWrapper_1 = require("../../../app_sdk/JobLoggerWrapper");
const JobUtils_1 = require("../../../app_sdk/JobUtils");
const types_1 = require("../../client/types");
const mutex_1 = require("../mutex");
const WhatsAppContactInfo_1 = require("../../contacts/WhatsAppContactInfo");
const DIContainer_1 = require("../../di/DIContainer");
const storage_1 = require("../../storage");
const ids_1 = require("../../../../core/utils/ids");
const enums_dto_1 = require("../../../../structures/enums.dto");
const responses_dto_1 = require("../../../../structures/responses.dto");
const promiseTimeout_1 = require("../../../../utils/promiseTimeout");
const templates_1 = require("../../i18n/templates");
const jids_1 = require("../../../../core/utils/jids");
const waha_1 = require("../../waha");
const timehelper_1 = require("../../../../utils/timehelper");
const env_1 = require("../../env");
function ListenEventsForChatWoot(config) {
    const events = [
        enums_dto_1.WAHAEvents.MESSAGE_ANY,
        enums_dto_1.WAHAEvents.MESSAGE_REACTION,
        enums_dto_1.WAHAEvents.MESSAGE_EDITED,
        enums_dto_1.WAHAEvents.MESSAGE_REVOKED,
        enums_dto_1.WAHAEvents.SESSION_STATUS,
        enums_dto_1.WAHAEvents.CALL_RECEIVED,
        enums_dto_1.WAHAEvents.CALL_ACCEPTED,
        enums_dto_1.WAHAEvents.CALL_REJECTED,
    ];
    if (config.conversations.markAsRead) {
        events.push(enums_dto_1.WAHAEvents.MESSAGE_ACK);
    }
    return events;
}
class ChatWootWAHABaseConsumer extends AppConsumer_1.AppConsumer {
    constructor(manager, log, rmutex, consumerName) {
        super('ChatWoot', consumerName, log, rmutex);
        this.manager = manager;
        this.consumerName = consumerName;
    }
    ErrorHeaderKey() {
        return templates_1.TKey.WHATSAPP_MESSAGE_RECEIVING_ERROR;
    }
    async ProcessAndReportErrors(job) {
        const errorReportInfo = new MessageReportInfo();
        try {
            const result = await this.Process(job, errorReportInfo);
            await this.ReportErrorRecovered(errorReportInfo, job);
            return result;
        }
        catch (err) {
            await this.ReportErrorForMessage(errorReportInfo, job, err);
            throw err;
        }
    }
    async DIContainer(job, appId) {
        const knex = this.manager.store.getWAHADatabase();
        this.appRepository = new storage_1.AppRepository(knex);
        const logger = new JobLoggerWrapper_1.JobLoggerWrapper(job, this.logger);
        const app = await this.appRepository.getById(appId);
        return new DIContainer_1.DIContainer(app.pk, app.config, logger, knex);
    }
    ShouldProcess(event) {
        return true;
    }
    async processJob(job) {
        const event = job.data.event;
        if (!this.ShouldProcess(event)) {
            return;
        }
        const key = (0, mutex_1.WhatsAppChatIdKey)(job.data.app, this.GetChatId(event));
        return await this.withMutex(job, key, () => this.ProcessAndReportErrors(job));
    }
    async ReportErrorForMessage(info, job, err) {
        const container = await this.DIContainer(job, job.data.app);
        let conversation;
        if (info.conversationId) {
            conversation = container
                .ContactConversationService()
                .ConversationById(info.conversationId);
        }
        else {
            conversation = await container
                .ContactConversationService()
                .InboxNotifications();
        }
        const header = this.ErrorHeaderKey()
            ? container.Locale().key(this.ErrorHeaderKey()).render()
            : err.message || `${err}`;
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportError(conversation, header, info.type || types_1.MessageType.INCOMING, err);
        throw err;
    }
    async ReportErrorRecovered(info, job) {
        if (!(0, JobUtils_1.HasBeenRetried)(job)) {
            return;
        }
        const container = await this.DIContainer(job, job.data.app);
        let conversation;
        if (info.conversationId) {
            conversation = container
                .ContactConversationService()
                .ConversationById(info.conversationId);
        }
        else {
            conversation = await container
                .ContactConversationService()
                .InboxNotifications();
        }
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportSucceeded(conversation, info.type || types_1.MessageType.INCOMING);
    }
}
exports.ChatWootWAHABaseConsumer = ChatWootWAHABaseConsumer;
class MessageReportInfo {
    constructor() {
        this.conversationId = null;
        this.type = null;
    }
    onConversationId(id) {
        this.conversationId = id;
    }
    onMessageType(type) {
        this.type = type;
    }
}
exports.MessageReportInfo = MessageReportInfo;
class MessageBaseHandler {
    constructor(job, mappingService, repo, logger, info, session, l, waha) {
        this.job = job;
        this.mappingService = mappingService;
        this.repo = repo;
        this.logger = logger;
        this.info = info;
        this.session = session;
        this.l = l;
        this.waha = waha;
    }
    get historyMessage() {
        return false;
    }
    finalizeContent(content, payload) {
        if (!content) {
            return content;
        }
        if (!payload.timestamp) {
            return content;
        }
        if (!this.historyMessage) {
            const now = (0, timehelper_1.EnsureSeconds)(Date.now() / 1000);
            const messageAge = now - (0, timehelper_1.EnsureSeconds)(payload.timestamp);
            const recent = messageAge <= env_1.CHATWOOT_MESSAGE_CALENDAR_THRESHOLD_SECONDS;
            if (recent) {
                return content;
            }
        }
        const date = this.l.ParseTimestamp(payload.timestamp);
        if (!date) {
            return content;
        }
        const timestamp = this.l.FormatHumanDate(date);
        return this.l.r('whatsapp.history.message.wrapper', {
            content: content,
            payload: payload,
            history: this.historyMessage,
            timestamp: timestamp,
        });
    }
    get delayFromMeAPI() {
        return 3000;
    }
    get shouldAddFromTag() {
        return true;
    }
    async ShouldProcessMessage(payload) {
        const key = (0, ids_1.parseMessageIdSerialized)(payload.id);
        const chatwoot = await this.mappingService.getChatWootMessage({
            chat_id: (0, jids_1.toCusFormat)(key.remoteJid),
            message_id: key.id,
        });
        if (chatwoot) {
            return false;
        }
        return true;
    }
    async handle(payload) {
        const type = payload.fromMe ? types_1.MessageType.OUTGOING : types_1.MessageType.INCOMING;
        this.info.onMessageType(type);
        if (payload.fromMe && payload.source === responses_dto_1.MessageSource.API) {
            await (0, promiseTimeout_1.sleep)(this.delayFromMeAPI);
        }
        if (!(await this.ShouldProcessMessage(payload))) {
            const log = `Skipping existing message '${payload.id}' from WhatsApp`;
            this.logger.debug(log);
            return null;
        }
        const contactInfo = (0, WhatsAppContactInfo_1.WhatsAppContactInfo)(this.session, waha_1.EngineHelper.ChatID(payload), this.l);
        const conversation = await this.repo.ConversationByContact(contactInfo);
        this.info.onConversationId(conversation.conversationId);
        const message = await this.buildChatWootMessage(payload);
        const response = await conversation.send(message);
        this.logger.debug(`Created message as '${message.message_type}' from WhatsApp: ${response.id}`);
        await this.saveMapping(response, payload);
        return message;
    }
    async saveMapping(chatwootMessage, whatsappMessage) {
        const chatwoot = {
            timestamp: new Date(chatwootMessage.created_at * 1000),
            conversation_id: chatwootMessage.conversation_id,
            message_id: chatwootMessage.id,
        };
        const key = (0, ids_1.parseMessageIdSerialized)(whatsappMessage.id);
        const whatsapp = {
            timestamp: new Date(whatsappMessage.timestamp * 1000),
            chat_id: (0, jids_1.toCusFormat)(key.remoteJid),
            message_id: key.id,
            from_me: key.fromMe,
            participant: null,
        };
        await this.mappingService.map(chatwoot, whatsapp, 1);
        return;
    }
    async buildChatWootMessage(payload) {
        var _a;
        const message = await this.getMessage(payload);
        let content = message.content;
        if (payload.fromMe && this.shouldAddFromTag) {
            if (payload.source === responses_dto_1.MessageSource.APP) {
                const key = templates_1.TKey.MESSAGE_FROM_WHATSAPP;
                content = this.l.key(key).render({ text: content });
            }
            else if (payload.source === responses_dto_1.MessageSource.API) {
                const key = templates_1.TKey.MESSAGE_FROM_API;
                content = this.l.key(key).render({ text: content });
            }
        }
        const chatId = waha_1.EngineHelper.ChatID(payload);
        const manyParticipants = (0, jids_1.isJidGroup)(chatId) || (0, jids_1.isJidBroadcast)(chatId);
        if (!payload.fromMe && manyParticipants) {
            const key = (0, ids_1.parseMessageIdSerialized)(payload.id, true);
            let participant = (0, jids_1.toCusFormat)(key.participant || payload._data.participant);
            const contact = await this.session.getContact(participant);
            const name = (contact === null || contact === void 0 ? void 0 : contact.name) || (contact === null || contact === void 0 ? void 0 : contact.pushName) || (contact === null || contact === void 0 ? void 0 : contact.pushname);
            if (name) {
                participant = `${name} (${participant})`;
            }
            content = this.l.key(templates_1.TKey.WHATSAPP_GROUP_MESSAGE).render({
                text: content,
                participant: participant,
            });
        }
        const replyTo = await this.getReplyToChatWootMessageID(payload).catch((err) => {
            this.logger.error(`WhatsApp => ChatWoot - error getting reply to message ID: ${err}`);
            return undefined;
        });
        const private_ = (_a = message.private) !== null && _a !== void 0 ? _a : payload.fromMe;
        const type = private_ ? types_1.MessageType.OUTGOING : types_1.MessageType.INCOMING;
        content = this.finalizeContent(content, payload);
        return {
            content: content,
            message_type: type,
            private: private_,
            attachments: message.attachments,
            content_attributes: {
                in_reply_to: replyTo,
            },
        };
    }
    async getReplyToChatWootMessageID(payload) {
        const replyToWhatsAppID = this.getReplyToWhatsAppID(payload);
        if (!replyToWhatsAppID) {
            return;
        }
        const chatwoot = await this.mappingService.getChatWootMessage({
            chat_id: waha_1.EngineHelper.ChatID(payload),
            message_id: replyToWhatsAppID,
        });
        return chatwoot === null || chatwoot === void 0 ? void 0 : chatwoot.message_id;
    }
}
exports.MessageBaseHandler = MessageBaseHandler;
//# sourceMappingURL=base.js.map