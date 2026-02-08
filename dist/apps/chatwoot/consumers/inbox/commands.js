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
exports.ChatWootInboxCommandsConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const base_1 = require("./base");
const QueueName_1 = require("../QueueName");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const bullmq_2 = require("bullmq");
const nestjs_pino_1 = require("nestjs-pino");
const cli_1 = require("../../cli");
const ids_1 = require("../../client/ids");
const QueueRegistry_1 = require("../../services/QueueRegistry");
let ChatWootInboxCommandsConsumer = class ChatWootInboxCommandsConsumer extends base_1.ChatWootInboxMessageConsumer {
    constructor(manager, log, rmutex, queueRegistry, messagesPullFlow) {
        super(manager, log, rmutex, 'ChatWootInboxCommandsConsumer');
        this.manager = manager;
        this.queueRegistry = queueRegistry;
        this.messagesPullFlow = messagesPullFlow;
    }
    ErrorHeaderKey() {
        return null;
    }
    conversationForReport(container, body) {
        const conversation = super.conversationForReport(container, body);
        if (!(0, ids_1.IsCommandsChat)(body)) {
            conversation.forceNote();
        }
        return conversation;
    }
    async Process(container, body, job) {
        let cmd = body.content;
        cmd = cmd.startsWith(cli_1.CommandPrefix) ? cmd.slice(cli_1.CommandPrefix.length) : cmd;
        this.logger.info(`Executing command '${cmd}' for session ${job.data.session}...`);
        const repo = container.ContactConversationService();
        let conversation = repo.ConversationById(body.conversation.id);
        if (!(0, ids_1.IsCommandsChat)(body)) {
            conversation.forceNote();
        }
        const ctx = {
            data: job.data,
            logger: this.logger,
            l: container.Locale(),
            waha: container.WAHASelf(),
            conversation: conversation,
            queues: {
                registry: this.queueRegistry,
                contactsPull: this.queueRegistry.queue(QueueName_1.QueueName.TASK_CONTACTS_PULL),
                messagesPull: this.queueRegistry.queue(QueueName_1.QueueName.TASK_MESSAGES_PULL),
            },
            flows: {
                messagesPull: this.messagesPullFlow,
            },
        };
        const commands = container.ChatWootConfig().commands;
        const output = await (0, cli_1.runText)(commands, ctx, cmd);
        if (output.out) {
            await conversation.incoming(output.out);
        }
        if (output.err) {
            await conversation.incoming(output.err);
        }
    }
};
exports.ChatWootInboxCommandsConsumer = ChatWootInboxCommandsConsumer;
exports.ChatWootInboxCommandsConsumer = ChatWootInboxCommandsConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.INBOX_COMMANDS, { concurrency: constants_1.JOB_CONCURRENCY }),
    __param(4, (0, bullmq_1.InjectFlowProducer)(QueueName_1.FlowProducerName.MESSAGES_PULL_FLOW)),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService,
        QueueRegistry_1.QueueRegistry,
        bullmq_2.FlowProducer])
], ChatWootInboxCommandsConsumer);
//# sourceMappingURL=commands.js.map