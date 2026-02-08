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
exports.QueueManager = void 0;
const QueueName_1 = require("../consumers/QueueName");
const QueueRegistry_1 = require("./QueueRegistry");
const common_1 = require("@nestjs/common");
const Managable = true;
const Locked = false;
let QueueManager = class QueueManager {
    constructor(registry) {
        this.registry = registry;
        this.queues = {
            [QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP]: Locked,
            [QueueName_1.QueueName.SCHEDULED_CHECK_VERSION]: Locked,
            [QueueName_1.QueueName.TASK_CONTACTS_PULL]: Locked,
            [QueueName_1.QueueName.TASK_MESSAGES_PULL]: Locked,
            [QueueName_1.QueueName.WAHA_SESSION_STATUS]: Locked,
            [QueueName_1.QueueName.WAHA_MESSAGE_ANY]: Managable,
            [QueueName_1.QueueName.WAHA_MESSAGE_REACTION]: Managable,
            [QueueName_1.QueueName.WAHA_MESSAGE_EDITED]: Managable,
            [QueueName_1.QueueName.WAHA_MESSAGE_REVOKED]: Managable,
            [QueueName_1.QueueName.WAHA_MESSAGE_ACK]: Managable,
            [QueueName_1.QueueName.WAHA_CALL_RECEIVED]: Managable,
            [QueueName_1.QueueName.WAHA_CALL_ACCEPTED]: Managable,
            [QueueName_1.QueueName.WAHA_CALL_REJECTED]: Managable,
            [QueueName_1.QueueName.INBOX_MESSAGE_CREATED]: Managable,
            [QueueName_1.QueueName.INBOX_MESSAGE_UPDATED]: Managable,
            [QueueName_1.QueueName.INBOX_CONVERSATION_CREATED]: Managable,
            [QueueName_1.QueueName.INBOX_CONVERSATION_STATUS_CHANGED]: Managable,
            [QueueName_1.QueueName.INBOX_MESSAGE_DELETED]: Managable,
            [QueueName_1.QueueName.INBOX_COMMANDS]: Locked,
        };
    }
    async pause(queues = null) {
        queues = queues || Object.values(QueueName_1.QueueName);
        queues = this.managable(queues);
        for (const name of queues) {
            const queue = this.registry.queue(name);
            await queue.pause();
        }
    }
    async resume(queues = null) {
        queues = queues || Object.values(QueueName_1.QueueName);
        queues = this.managable(queues);
        for (const name of queues) {
            const queue = this.registry.queue(name);
            await queue.resume();
        }
    }
    resolve(shortcut) {
        const queues = Object.values(QueueName_1.QueueName);
        switch (shortcut) {
            case 'inbox':
                return queues.filter((q) => q.startsWith('chatwoot.inbox'));
            case 'whatsapp':
            case 'waha':
                return queues.filter((q) => q.startsWith('chatwoot.waha'));
            case 'scheduled':
                return queues.filter((q) => q.startsWith('chatwoot.scheduled'));
            case 'task':
                return queues.filter((q) => q.startsWith('chatwoot.task'));
            case 'all':
            case '':
            case null:
            case undefined:
                return queues;
            default:
                return [shortcut];
        }
    }
    managable(queues) {
        return queues.filter((q) => this.queues[q] === Managable);
    }
    async status(queues = null) {
        queues = queues || Object.values(QueueName_1.QueueName);
        const result = [];
        for (const name of queues) {
            const queue = this.registry.queue(name);
            const paused = await queue.isPaused();
            result.push({
                name: name,
                paused: paused,
                locked: this.queues[name] === Locked,
            });
        }
        return result;
    }
};
exports.QueueManager = QueueManager;
exports.QueueManager = QueueManager = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [QueueRegistry_1.QueueRegistry])
], QueueManager);
//# sourceMappingURL=QueueManager.js.map