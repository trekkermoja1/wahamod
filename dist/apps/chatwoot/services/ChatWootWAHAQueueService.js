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
exports.ChatWootWAHAQueueService = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../consumers/waha/base");
const manager_abc_1 = require("../../../core/abc/manager.abc");
const enums_dto_1 = require("../../../structures/enums.dto");
const QueueName_1 = require("../consumers/QueueName");
const QueueRegistry_1 = require("./QueueRegistry");
const DIContainer_1 = require("../di/DIContainer");
let ChatWootWAHAQueueService = class ChatWootWAHAQueueService {
    constructor(queueRegistry) {
        this.queueRegistry = queueRegistry;
    }
    getQueueForEvent(event) {
        switch (event) {
            case enums_dto_1.WAHAEvents.MESSAGE_ANY:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_MESSAGE_ANY);
            case enums_dto_1.WAHAEvents.MESSAGE_REACTION:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_MESSAGE_REACTION);
            case enums_dto_1.WAHAEvents.MESSAGE_EDITED:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_MESSAGE_EDITED);
            case enums_dto_1.WAHAEvents.MESSAGE_REVOKED:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_MESSAGE_REVOKED);
            case enums_dto_1.WAHAEvents.MESSAGE_ACK:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_MESSAGE_ACK);
            case enums_dto_1.WAHAEvents.SESSION_STATUS:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_SESSION_STATUS);
            case enums_dto_1.WAHAEvents.CALL_RECEIVED:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_CALL_RECEIVED);
            case enums_dto_1.WAHAEvents.CALL_ACCEPTED:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_CALL_ACCEPTED);
            case enums_dto_1.WAHAEvents.CALL_REJECTED:
                return this.queueRegistry.queue(QueueName_1.QueueName.WAHA_CALL_REJECTED);
            default:
                return null;
        }
    }
    async addJobToQueue(event, data, appId) {
        const queue = this.getQueueForEvent(event);
        if (queue) {
            await queue.add(data.event, { app: appId, event: data });
        }
    }
    listenEvents(app, session) {
        const config = (0, DIContainer_1.ChatWootConfigDefaults)(app.config);
        const events = (0, base_1.ListenEventsForChatWoot)(config);
        for (const event of events) {
            const obs$ = session.getEventObservable(event);
            obs$.subscribe(async (payload) => {
                const data = (0, manager_abc_1.populateSessionInfo)(event, session)(payload);
                await this.addJobToQueue(event, data, app.id);
            });
        }
    }
};
exports.ChatWootWAHAQueueService = ChatWootWAHAQueueService;
exports.ChatWootWAHAQueueService = ChatWootWAHAQueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [QueueRegistry_1.QueueRegistry])
], ChatWootWAHAQueueService);
//# sourceMappingURL=ChatWootWAHAQueueService.js.map