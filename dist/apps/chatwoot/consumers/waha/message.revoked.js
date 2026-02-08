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
exports.MessageRevokedHandler = exports.WAHAMessageRevokedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const types_1 = require("../../client/types");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const templates_1 = require("../../i18n/templates");
const jids_1 = require("../../../../core/utils/jids");
let WAHAMessageRevokedConsumer = class WAHAMessageRevokedConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHAMessageRevokedConsumer');
        this.manager = manager;
    }
    GetChatId(event) {
        return event.payload.after.from;
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const event = job.data.event;
        const handler = new MessageRevokedHandler(container.MessageMappingService(), container.ContactConversationService(), container.Logger(), container.Locale(), info);
        return await handler.handle(event);
    }
};
exports.WAHAMessageRevokedConsumer = WAHAMessageRevokedConsumer;
exports.WAHAMessageRevokedConsumer = WAHAMessageRevokedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_MESSAGE_REVOKED, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHAMessageRevokedConsumer);
class MessageRevokedHandler {
    constructor(mappingService, repo, logger, l, info) {
        this.mappingService = mappingService;
        this.repo = repo;
        this.logger = logger;
        this.l = l;
        this.info = info;
    }
    async handle(event) {
        const payload = event.payload;
        const messageId = event.payload.revokedMessageId;
        const chatId = payload.after.from;
        const chatwoot = await this.mappingService.getChatWootMessage({
            chat_id: (0, jids_1.toCusFormat)(chatId),
            message_id: messageId,
        });
        if (!chatwoot) {
            this.logger.warn('Message not found in mapping service');
            return;
        }
        const conversation = this.repo.ConversationById(chatwoot.conversation_id);
        const message = this.buildChatWootMessage(chatwoot, payload.after.fromMe);
        this.info.onConversationId(chatwoot.conversation_id);
        this.info.onMessageType(message.message_type);
        await conversation.send(message);
    }
    buildChatWootMessage(chatwoot, fromMe) {
        const content = this.l.key(templates_1.TKey.MESSAGE_REMOVED_IN_WHATSAPP).render();
        const type = fromMe ? types_1.MessageType.OUTGOING : types_1.MessageType.INCOMING;
        return {
            content: content,
            message_type: type,
            private: true,
            content_attributes: {
                in_reply_to: chatwoot.message_id,
            },
        };
    }
}
exports.MessageRevokedHandler = MessageRevokedHandler;
//# sourceMappingURL=message.revoked.js.map