"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAHAMessageAckConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const WhatsAppContactInfo_1 = require("../../contacts/WhatsAppContactInfo");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const message_ack_utils_1 = require("./message.ack.utils");
const ids_1 = require("../../../../core/utils/ids");
let WAHAMessageAckConsumer = class WAHAMessageAckConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHAMessageAckConsumer');
        this.manager = manager;
    }
    ShouldProcess(event) {
        return (0, message_ack_utils_1.ShouldMarkAsReadInChatWoot)(event);
    }
    GetChatId(event) {
        return event.payload.from;
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const event = job.data.event;
        const session = new WAHASelf_1.WAHASessionAPI(event.session, container.WAHASelf());
        const handler = new MessageAckHandler(container.ContactConversationService(), container.MessageMappingService(), container.Logger(), info, session, container.Locale());
        try {
            await handler.handle(event);
        }
        catch (e) {
            this.logger.error(e);
        }
    }
};
exports.WAHAMessageAckConsumer = WAHAMessageAckConsumer;
exports.WAHAMessageAckConsumer = WAHAMessageAckConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_MESSAGE_ACK, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHAMessageAckConsumer);
class MessageAckHandler {
    constructor(contactConversationService, mappingService, logger, info, session, locale) {
        this.contactConversationService = contactConversationService;
        this.mappingService = mappingService;
        this.logger = logger;
        this.info = info;
        this.session = session;
        this.locale = locale;
    }
    async handle(event) {
        const payload = event.payload;
        const key = (0, ids_1.parseMessageIdSerialized)(payload.id);
        const chatwoot = await this.mappingService.getChatWootMessage({
            chat_id: null,
            message_id: key.id,
        });
        if (!chatwoot) {
            return;
        }
        const contactInfo = (0, WhatsAppContactInfo_1.WhatsAppContactInfo)(this.session, payload.from, this.locale);
        const conversation = await this.contactConversationService.FindConversationByContact(contactInfo);
        if (!conversation) {
            this.logger.debug(`No suitable conversation found to mark as read for chat.id: ${payload.from}`);
            return;
        }
        this.info.onConversationId(conversation.conversationId);
        const sourceId = conversation.sourceId;
        if (!sourceId) {
            this.logger.warn(`Contact not found for chat.id: ${payload.from}. Skipping read update for message ${payload.id}`);
            return;
        }
        try {
            await this.contactConversationService.markConversationAsRead(conversation.conversationId, sourceId);
            this.logger.info(`Marked conversation ${conversation.conversationId} as read for chat.id: ${payload.from} (message: ${payload.id}, sourceId: ${sourceId})`);
        }
        catch (error) {
            const reason = error instanceof Error ? error.message : String(error);
            this.logger.error(`Error marking conversation ${conversation.conversationId} as read for chat.id: ${payload.from}. Reason: ${reason}`);
            throw error;
        }
    }
}
//# sourceMappingURL=message.ack.js.map