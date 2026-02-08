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
exports.MessageHandler = exports.ChatWootInboxMessageCreatedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const base_1 = require("./base");
const QueueName_1 = require("../QueueName");
const waha_1 = require("../../waha");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const markdown_1 = require("../../messages/to/whatsapp/markdown");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const promiseTimeout_1 = require("../../../../utils/promiseTimeout");
const nestjs_pino_1 = require("nestjs-pino");
const ids_1 = require("../../client/ids");
const templates_1 = require("../../i18n/templates");
const config_dto_1 = require("../../dto/config.dto");
const mime = require('mime-types');
let ChatWootInboxMessageCreatedConsumer = class ChatWootInboxMessageCreatedConsumer extends base_1.ChatWootInboxMessageConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'ChatWootInboxMessageCreatedConsumer');
        this.manager = manager;
    }
    ErrorHeaderKey() {
        return templates_1.TKey.WHATSAPP_MESSAGE_SENDING_ERROR;
    }
    async Process(container, body, job) {
        const waha = container.WAHASelf();
        const session = new WAHASelf_1.WAHASessionAPI(job.data.session, waha);
        const handler = new MessageHandler(container.MessageMappingService(), container.Logger(), session, container.ChatWootConfig(), container.Locale());
        return await handler.handle(body);
    }
};
exports.ChatWootInboxMessageCreatedConsumer = ChatWootInboxMessageCreatedConsumer;
exports.ChatWootInboxMessageCreatedConsumer = ChatWootInboxMessageCreatedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.INBOX_MESSAGE_CREATED, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], ChatWootInboxMessageCreatedConsumer);
class MessageHandler {
    constructor(mappingService, logger, session, config, l) {
        this.mappingService = mappingService;
        this.logger = logger;
        this.session = session;
        this.config = config;
        this.l = l;
    }
    async handle(body) {
        const chatId = await (0, base_1.LookupAndCheckChatId)(this.session, body);
        const message = body;
        if (message.content_type != 'text' &&
            message.content_type != 'input_csat') {
            this.logger.info(`Message content type not supported. Content type: ${message.content_type}`);
            return;
        }
        const content = (0, markdown_1.MarkdownToWhatsApp)(message.content);
        const results = [];
        let part = 0;
        const replyTo = await this.getReplyTo(message).catch((err) => {
            this.logger.error(`ChatWoot => WhatsApp: error getting reply to message ID: ${err}`);
            return undefined;
        });
        const attachments = message.attachments || [];
        const sendText = content && attachments.length !== 1;
        if (sendText) {
            part += 1;
            const exists = await this.getMapping(message, part);
            if (exists) {
                this.logger.warn(`Skip part ${part}: mapping exists for Chatwoot message ${message.id}`);
            }
            else {
                const textTemplate = this.l.key(templates_1.TKey.CW_TO_WA_MESSAGE_TEXT);
                const text = textTemplate.render({
                    content: content,
                    chatwoot: body,
                });
                const msg = await this.sendTextMessage(chatId, text, replyTo);
                results.push(msg);
                await this.saveMapping(message, msg, part);
                this.logger.info(`Text message sent: ${msg.id}`);
            }
        }
        const captionTemplate = this.l.key(templates_1.TKey.CW_TO_WA_MESSAGE_MEDIA_CAPTION);
        for (const file of attachments) {
            part += 1;
            const exists = await this.getMapping(message, part);
            if (exists) {
                this.logger.warn(`Skip part ${part}: mapping exists for Chatwoot message ${message.id}`);
                continue;
            }
            const caption = captionTemplate.render({
                content: content,
                chatwoot: body,
                singleAttachment: attachments.length == 1,
            });
            const msg = await this.sendFile(chatId, caption, file, replyTo);
            this.logger.info(`File message sent: ${msg.id} - ${file.data_url} - ${file.file_type}`);
            results.push(msg);
            await this.saveMapping(message, msg, part);
        }
        return results;
    }
    async saveMapping(chatwootMessage, whatsappMessage, part) {
        const chatwoot = {
            timestamp: new Date(chatwootMessage.created_at),
            conversation_id: chatwootMessage.conversation.id,
            message_id: chatwootMessage.id,
        };
        const whatsapp = waha_1.EngineHelper.WhatsAppMessageKeys(whatsappMessage);
        await this.mappingService.map(chatwoot, whatsapp, part);
    }
    async getMapping(message, part) {
        return this.mappingService.getMappingByChatwootCombinedKeyAndPart({
            conversation_id: message.conversation.id,
            message_id: message.id,
        }, part);
    }
    async getReplyTo(message) {
        const message_id = message.content_attributes.in_reply_to;
        if (!message_id) {
            return;
        }
        const messages = await this.mappingService.getWhatsAppMessage({
            conversation_id: message.conversation.id,
            message_id: message_id,
        });
        if (!messages || messages.length == 0) {
            return;
        }
        const whatsapp = messages[0];
        return (0, ids_1.SerializeWhatsAppKey)(whatsapp);
    }
    async sendTextMessage(chatId, content, replyTo) {
        const request = {
            session: '',
            chatId: chatId,
            text: content,
            reply_to: replyTo,
            linkPreview: [config_dto_1.LinkPreview.LQ, config_dto_1.LinkPreview.HQ].includes(this.config.linkPreview),
            linkPreviewHighQuality: this.config.linkPreview == config_dto_1.LinkPreview.HQ,
        };
        const session = this.session;
        await session.readMessages(chatId);
        await session.startTyping({ chatId: chatId, session: '' });
        await (0, promiseTimeout_1.sleep)(2000);
        await session.stopTyping({ chatId: chatId, session: '' });
        const msg = await session.sendText(request);
        return msg;
    }
    async sendFile(chatId, content, file, replyTo) {
        const url = file.data_url;
        let filename = url.split('/').pop();
        if (filename) {
            filename = decodeURIComponent(filename);
        }
        const mimetype = mime.lookup(filename);
        const session = this.session;
        switch (file.file_type) {
            case 'image':
                if (mimetype != 'image/jpeg' && mimetype != 'image/png') {
                    break;
                }
                const imageRequest = {
                    session: '',
                    caption: content,
                    chatId: chatId,
                    reply_to: replyTo,
                    file: {
                        url: url,
                        mimetype: mimetype,
                    },
                };
                return session.sendImage(imageRequest);
            case 'video':
                if (mimetype != 'video/mp4') {
                    break;
                }
                const videoRequest = {
                    session: '',
                    caption: content,
                    chatId: chatId,
                    reply_to: replyTo,
                    file: {
                        url: url,
                        mimetype: mimetype,
                        filename: filename,
                    },
                    convert: true,
                };
                return session.sendVideo(videoRequest);
            case 'audio':
                const voiceRequest = {
                    session: '',
                    chatId: chatId,
                    file: {
                        url: url,
                        mimetype: mimetype,
                        filename: filename,
                    },
                    convert: true,
                };
                return session.sendVoice(voiceRequest);
        }
        const fileRequest = {
            session: '',
            caption: content,
            chatId: chatId,
            reply_to: replyTo,
            file: {
                filename: filename,
                url: url,
                mimetype: mimetype,
            },
        };
        return session.sendFile(fileRequest);
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=message_created.js.map