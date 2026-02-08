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
exports.QueueRegistry = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const QueueName_1 = require("../consumers/QueueName");
let QueueRegistry = class QueueRegistry {
    constructor(scheduledMessageCleanupQueue, scheduledCheckVersionQueue, taskContactsPullQueue, taskMessagesPullQueue, wahaSessionStatusQueue, wahaMessageAnyQueue, wahaMessageReactionQueue, wahaMessageEditedQueue, wahaMessageRevokedQueue, wahaMessageAckQueue, wahaCallReceivedQueue, wahaCallAcceptedQueue, wahaCallRejectedQueue, inboxMessageCreatedQueue, inboxMessageUpdatedQueue, inboxConversationCreatedQueue, inboxConversationStatusChangedQueue, inboxMessageDeletedQueue, inboxCommandsQueue) {
        this.scheduledMessageCleanupQueue = scheduledMessageCleanupQueue;
        this.scheduledCheckVersionQueue = scheduledCheckVersionQueue;
        this.taskContactsPullQueue = taskContactsPullQueue;
        this.taskMessagesPullQueue = taskMessagesPullQueue;
        this.wahaSessionStatusQueue = wahaSessionStatusQueue;
        this.wahaMessageAnyQueue = wahaMessageAnyQueue;
        this.wahaMessageReactionQueue = wahaMessageReactionQueue;
        this.wahaMessageEditedQueue = wahaMessageEditedQueue;
        this.wahaMessageRevokedQueue = wahaMessageRevokedQueue;
        this.wahaMessageAckQueue = wahaMessageAckQueue;
        this.wahaCallReceivedQueue = wahaCallReceivedQueue;
        this.wahaCallAcceptedQueue = wahaCallAcceptedQueue;
        this.wahaCallRejectedQueue = wahaCallRejectedQueue;
        this.inboxMessageCreatedQueue = inboxMessageCreatedQueue;
        this.inboxMessageUpdatedQueue = inboxMessageUpdatedQueue;
        this.inboxConversationCreatedQueue = inboxConversationCreatedQueue;
        this.inboxConversationStatusChangedQueue = inboxConversationStatusChangedQueue;
        this.inboxMessageDeletedQueue = inboxMessageDeletedQueue;
        this.inboxCommandsQueue = inboxCommandsQueue;
        this.queues = {
            [QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP]: this.scheduledMessageCleanupQueue,
            [QueueName_1.QueueName.SCHEDULED_CHECK_VERSION]: this.scheduledCheckVersionQueue,
            [QueueName_1.QueueName.TASK_CONTACTS_PULL]: this.taskContactsPullQueue,
            [QueueName_1.QueueName.TASK_MESSAGES_PULL]: this.taskMessagesPullQueue,
            [QueueName_1.QueueName.WAHA_SESSION_STATUS]: this.wahaSessionStatusQueue,
            [QueueName_1.QueueName.WAHA_MESSAGE_ANY]: this.wahaMessageAnyQueue,
            [QueueName_1.QueueName.WAHA_MESSAGE_REACTION]: this.wahaMessageReactionQueue,
            [QueueName_1.QueueName.WAHA_MESSAGE_EDITED]: this.wahaMessageEditedQueue,
            [QueueName_1.QueueName.WAHA_MESSAGE_REVOKED]: this.wahaMessageRevokedQueue,
            [QueueName_1.QueueName.WAHA_MESSAGE_ACK]: this.wahaMessageAckQueue,
            [QueueName_1.QueueName.WAHA_CALL_RECEIVED]: this.wahaCallReceivedQueue,
            [QueueName_1.QueueName.WAHA_CALL_ACCEPTED]: this.wahaCallAcceptedQueue,
            [QueueName_1.QueueName.WAHA_CALL_REJECTED]: this.wahaCallRejectedQueue,
            [QueueName_1.QueueName.INBOX_MESSAGE_CREATED]: this.inboxMessageCreatedQueue,
            [QueueName_1.QueueName.INBOX_MESSAGE_UPDATED]: this.inboxMessageUpdatedQueue,
            [QueueName_1.QueueName.INBOX_CONVERSATION_CREATED]: this.inboxConversationCreatedQueue,
            [QueueName_1.QueueName.INBOX_CONVERSATION_STATUS_CHANGED]: this.inboxConversationStatusChangedQueue,
            [QueueName_1.QueueName.INBOX_MESSAGE_DELETED]: this.inboxMessageDeletedQueue,
            [QueueName_1.QueueName.INBOX_COMMANDS]: this.inboxCommandsQueue,
        };
    }
    queue(name) {
        const queue = this.queues[name];
        if (!queue) {
            throw new Error(`Queue ${name} is not registered`);
        }
        return queue;
    }
};
exports.QueueRegistry = QueueRegistry;
exports.QueueRegistry = QueueRegistry = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP)),
    __param(1, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.SCHEDULED_CHECK_VERSION)),
    __param(2, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.TASK_CONTACTS_PULL)),
    __param(3, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.TASK_MESSAGES_PULL)),
    __param(4, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_SESSION_STATUS)),
    __param(5, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_MESSAGE_ANY)),
    __param(6, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_MESSAGE_REACTION)),
    __param(7, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_MESSAGE_EDITED)),
    __param(8, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_MESSAGE_REVOKED)),
    __param(9, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_MESSAGE_ACK)),
    __param(10, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_CALL_RECEIVED)),
    __param(11, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_CALL_ACCEPTED)),
    __param(12, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.WAHA_CALL_REJECTED)),
    __param(13, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.INBOX_MESSAGE_CREATED)),
    __param(14, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.INBOX_MESSAGE_UPDATED)),
    __param(15, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.INBOX_CONVERSATION_CREATED)),
    __param(16, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.INBOX_CONVERSATION_STATUS_CHANGED)),
    __param(17, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.INBOX_MESSAGE_DELETED)),
    __param(18, (0, bullmq_1.InjectQueue)(QueueName_1.QueueName.INBOX_COMMANDS)),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue])
], QueueRegistry);
//# sourceMappingURL=QueueRegistry.js.map