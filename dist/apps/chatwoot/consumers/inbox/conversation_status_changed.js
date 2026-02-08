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
exports.ChatWootConversationStatusChangedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const ids_1 = require("../../client/ids");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const nestjs_pino_1 = require("nestjs-pino");
const rmutex_1 = require("../../../../modules/rmutex");
let ChatWootConversationStatusChangedConsumer = class ChatWootConversationStatusChangedConsumer extends base_1.ChatWootInboxMessageConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'ChatWootConversationStatusChangedConsumer');
        this.manager = manager;
    }
    ErrorHeaderKey() {
        return null;
    }
    GetConversationID(body) {
        return body.id;
    }
    async Process(container, body, job) {
        const handler = new ConversationStatusChangedHandler(container.ContactConversationService(), container.ConversationSelector());
        return await handler.handle(body);
    }
};
exports.ChatWootConversationStatusChangedConsumer = ChatWootConversationStatusChangedConsumer;
exports.ChatWootConversationStatusChangedConsumer = ChatWootConversationStatusChangedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.INBOX_CONVERSATION_STATUS_CHANGED, {
        concurrency: constants_1.JOB_CONCURRENCY,
    }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_1.RMutexService])
], ChatWootConversationStatusChangedConsumer);
class ConversationStatusChangedHandler {
    constructor(service, selector) {
        this.service = service;
        this.selector = selector;
    }
    async handle(body) {
        var _a;
        if (!this.selector.hasStatusFilter()) {
            return;
        }
        const ids = (0, ids_1.GetAllChatIDs)((_a = body.meta) === null || _a === void 0 ? void 0 : _a.sender);
        this.service.ResetCache(ids);
    }
}
//# sourceMappingURL=conversation_status_changed.js.map