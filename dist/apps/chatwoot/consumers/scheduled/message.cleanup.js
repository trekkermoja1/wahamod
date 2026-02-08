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
var MessageCleanupConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCleanupConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const base_1 = require("./base");
const templates_1 = require("../../i18n/templates");
let MessageCleanupConsumer = MessageCleanupConsumer_1 = class MessageCleanupConsumer extends base_1.ChatWootScheduledConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, MessageCleanupConsumer_1.name);
        this.REMOVE_AFTER_DAYS = 365;
    }
    ErrorHeaderKey() {
        return templates_1.TKey.JOB_SCHEDULED_ERROR_HEADER;
    }
    async Process(container, job) {
        const logger = container.Logger();
        logger.info('Processing message cleanup job');
        const removeAfter = new Date(Date.now() - this.REMOVE_AFTER_DAYS * 24 * 60 * 60 * 1000);
        logger.info(`Removing mapping for messages older than ${removeAfter}`);
        const removed = await container
            .MessageMappingService()
            .cleanup(removeAfter);
        logger.info(`Removed ${removed} mappings for messages`);
    }
};
exports.MessageCleanupConsumer = MessageCleanupConsumer;
exports.MessageCleanupConsumer = MessageCleanupConsumer = MessageCleanupConsumer_1 = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP, {
        concurrency: constants_1.JOB_CONCURRENCY,
    }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager, nestjs_pino_1.PinoLogger, rmutex_service_1.RMutexService])
], MessageCleanupConsumer);
//# sourceMappingURL=message.cleanup.js.map