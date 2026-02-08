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
exports.ChatWootInboxMessageUpdatedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const base_1 = require("./base");
const message_created_1 = require("./message_created");
const QueueName_1 = require("../QueueName");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const templates_1 = require("../../i18n/templates");
let ChatWootInboxMessageUpdatedConsumer = class ChatWootInboxMessageUpdatedConsumer extends base_1.ChatWootInboxMessageConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'ChatWootInboxMessageUpdatedConsumer');
        this.manager = manager;
    }
    ErrorHeaderKey() {
        return templates_1.TKey.WHATSAPP_MESSAGE_SENDING_ERROR;
    }
    async Process(container, body, job) {
        const waha = container.WAHASelf();
        const session = new WAHASelf_1.WAHASessionAPI(job.data.session, waha);
        const handler = new message_created_1.MessageHandler(container.MessageMappingService(), container.Logger(), session, container.ChatWootConfig(), container.Locale());
        return await handler.handle(body);
    }
};
exports.ChatWootInboxMessageUpdatedConsumer = ChatWootInboxMessageUpdatedConsumer;
exports.ChatWootInboxMessageUpdatedConsumer = ChatWootInboxMessageUpdatedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.INBOX_MESSAGE_UPDATED, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], ChatWootInboxMessageUpdatedConsumer);
//# sourceMappingURL=message_updated.js.map