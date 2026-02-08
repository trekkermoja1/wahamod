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
exports.ChatWootQueueService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../client/types");
const QueueName_1 = require("../consumers/QueueName");
const QueueRegistry_1 = require("./QueueRegistry");
let ChatWootQueueService = class ChatWootQueueService {
    constructor(queueRegistry) {
        this.queueRegistry = queueRegistry;
    }
    async add(queue, name, data) {
        return await queue.add(name, data);
    }
    getQueueForEvent(event) {
        switch (event) {
            case types_1.EventName.CONVERSATION_CREATED:
                return this.queueRegistry.queue(QueueName_1.QueueName.INBOX_CONVERSATION_CREATED);
            case types_1.EventName.MESSAGE_CREATED:
                return this.queueRegistry.queue(QueueName_1.QueueName.INBOX_MESSAGE_CREATED);
            case types_1.EventName.MESSAGE_UPDATED:
                return this.queueRegistry.queue(QueueName_1.QueueName.INBOX_MESSAGE_UPDATED);
            case types_1.EventName.CONVERSATION_STATUS_CHANGED:
                return this.queueRegistry.queue(QueueName_1.QueueName.INBOX_CONVERSATION_STATUS_CHANGED);
            case 'message_deleted':
                return this.queueRegistry.queue(QueueName_1.QueueName.INBOX_MESSAGE_DELETED);
            case 'commands':
                return this.queueRegistry.queue(QueueName_1.QueueName.INBOX_COMMANDS);
            default:
                return null;
        }
    }
    async addMessageCreatedJob(data) {
        return await this.add(this.queueRegistry.queue(QueueName_1.QueueName.INBOX_MESSAGE_CREATED), types_1.EventName.MESSAGE_CREATED, data);
    }
    async addMessageUpdatedJob(data) {
        return await this.add(this.queueRegistry.queue(QueueName_1.QueueName.INBOX_MESSAGE_UPDATED), types_1.EventName.MESSAGE_UPDATED, data);
    }
    async addMessageDeletedJob(data) {
        return await this.add(this.queueRegistry.queue(QueueName_1.QueueName.INBOX_MESSAGE_DELETED), 'message_deleted', data);
    }
    async addCommandsJob(event, data) {
        return await this.add(this.queueRegistry.queue(QueueName_1.QueueName.INBOX_COMMANDS), event, data);
    }
    async addJobToQueue(event, data) {
        const queue = this.getQueueForEvent(event);
        if (!queue) {
            return;
        }
        await this.add(queue, event, data);
    }
};
exports.ChatWootQueueService = ChatWootQueueService;
exports.ChatWootQueueService = ChatWootQueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [QueueRegistry_1.QueueRegistry])
], ChatWootQueueService);
//# sourceMappingURL=ChatWootQueueService.js.map