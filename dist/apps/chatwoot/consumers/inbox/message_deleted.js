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
exports.ChatWootInboxMessageDeletedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const ids_1 = require("../../client/ids");
const base_1 = require("./base");
const QueueName_1 = require("../QueueName");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const templates_1 = require("../../i18n/templates");
let ChatWootInboxMessageDeletedConsumer = class ChatWootInboxMessageDeletedConsumer extends base_1.ChatWootInboxMessageConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'ChatWootInboxMessageDeletedConsumer');
        this.manager = manager;
    }
    ErrorHeaderKey() {
        return templates_1.TKey.WHATSAPP_MESSAGE_REMOVING_ERROR;
    }
    async Process(container, body, job) {
        const waha = container.WAHASelf();
        const session = new WAHASelf_1.WAHASessionAPI(job.data.session, waha);
        const handler = new MessageDeletedHandler(container.MessageMappingService(), container.Logger(), session);
        return await handler.handle(body);
    }
};
exports.ChatWootInboxMessageDeletedConsumer = ChatWootInboxMessageDeletedConsumer;
exports.ChatWootInboxMessageDeletedConsumer = ChatWootInboxMessageDeletedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.INBOX_MESSAGE_DELETED, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], ChatWootInboxMessageDeletedConsumer);
class MessageDeletedHandler {
    constructor(mappingService, logger, session) {
        this.mappingService = mappingService;
        this.logger = logger;
        this.session = session;
    }
    async handle(body) {
        const chatId = await (0, base_1.LookupAndCheckChatId)(this.session, body);
        const messages = await this.mappingService.getWhatsAppMessage({
            conversation_id: body.conversation.id,
            message_id: body.id,
        });
        if (!messages || messages.length == 0) {
            if (body.private) {
                this.logger.info(`No WhatsApp message to delete for private note '${body.id}'`);
                return;
            }
            throw Error(`No WhatsApp message found for Chatwoot message '${body.id}'`);
        }
        const session = this.session;
        for (const whatsapp of messages) {
            this.logger.debug(`Deleting message '${whatsapp.message_id}' from '${whatsapp.chat_id}'`);
            const messageId = (0, ids_1.SerializeWhatsAppKey)(whatsapp);
            await session.deleteMessage(chatId, messageId);
            this.logger.info(`Message '${whatsapp.message_id}' deleted from '${whatsapp.chat_id}'`);
        }
    }
}
//# sourceMappingURL=message_deleted.js.map