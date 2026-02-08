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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootScheduleService = void 0;
const common_1 = require("@nestjs/common");
const QueueName_1 = require("../consumers/QueueName");
const nestjs_pino_1 = require("nestjs-pino");
const cmd_contacts_1 = require("../cli/cmd.contacts");
const cmd_messages_1 = require("../cli/cmd.messages");
const QueueRegistry_1 = require("./QueueRegistry");
let ChatWootScheduleService = class ChatWootScheduleService {
    constructor(logger, queueRegistry) {
        this.logger = logger;
        this.queueRegistry = queueRegistry;
    }
    async schedule(appId, sessionName) {
        const messageCleanupQueue = this.queueRegistry.queue(QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP);
        await messageCleanupQueue.upsertJobScheduler(this.JobId(QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP, appId), { pattern: '0 0 17 * * *' }, {
            data: {
                app: appId,
                session: sessionName,
            },
        });
        const checkVersionQueue = this.queueRegistry.queue(QueueName_1.QueueName.SCHEDULED_CHECK_VERSION);
        await checkVersionQueue.upsertJobScheduler(this.JobId(QueueName_1.QueueName.SCHEDULED_CHECK_VERSION, appId), { pattern: '0 0 18 * * 3' }, {
            data: {
                app: appId,
                session: sessionName,
            },
        });
    }
    async unschedule(appId, sessionName) {
        const messageCleanupQueue = this.queueRegistry.queue(QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP);
        await messageCleanupQueue.removeJobScheduler(this.JobId(QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP, appId));
        const checkVersionQueue = this.queueRegistry.queue(QueueName_1.QueueName.SCHEDULED_CHECK_VERSION);
        await checkVersionQueue.removeJobScheduler(this.JobId(QueueName_1.QueueName.SCHEDULED_CHECK_VERSION, appId));
        const contactsPullQueue = this.queueRegistry.queue(QueueName_1.QueueName.TASK_CONTACTS_PULL);
        (0, cmd_contacts_1.ContactsPullRemove)(contactsPullQueue, appId, this.logger).catch((reason) => {
            this.logger.warn(`Failed to remove "contacts" job for app ${appId}, session ${sessionName}: ${reason}`);
        });
        const messagesPullQueue = this.queueRegistry.queue(QueueName_1.QueueName.TASK_MESSAGES_PULL);
        (0, cmd_messages_1.MessagesPullRemove)(messagesPullQueue, appId, this.logger).catch((reason) => {
            this.logger.warn(`Failed to remove "messages" job for app ${appId}, session ${sessionName}: ${reason}`);
        });
    }
    JobId(queue, appId) {
        return `${queue} | ${appId}`;
    }
    static SingleJobId(appId) {
        return `${appId}`;
    }
};
exports.ChatWootScheduleService = ChatWootScheduleService;
exports.ChatWootScheduleService = ChatWootScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_pino_1.InjectPinoLogger)('DashboardConfigService')),
    __metadata("design:paramtypes", [nestjs_pino_1.PinoLogger,
        QueueRegistry_1.QueueRegistry])
], ChatWootScheduleService);
//# sourceMappingURL=ChatWootScheduleService.js.map