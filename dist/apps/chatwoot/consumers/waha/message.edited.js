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
exports.WAHAMessageEditedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const chatwoot_1 = require("../../messages/to/chatwoot");
const waha_1 = require("../../waha");
let WAHAMessageEditedConsumer = class WAHAMessageEditedConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHAMessageEditedConsumer');
        this.manager = manager;
    }
    GetChatId(event) {
        return waha_1.EngineHelper.ChatID(event.payload);
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const event = job.data.event;
        const session = new WAHASelf_1.WAHASessionAPI(event.session, container.WAHASelf());
        const handler = new MessageEditedHandler(job, container.MessageMappingService(), container.ContactConversationService(), container.Logger(), info, session, container.Locale(), container.WAHASelf());
        return await handler.handle(event.payload);
    }
};
exports.WAHAMessageEditedConsumer = WAHAMessageEditedConsumer;
exports.WAHAMessageEditedConsumer = WAHAMessageEditedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_MESSAGE_EDITED, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHAMessageEditedConsumer);
class MessageEditedHandler extends base_1.MessageBaseHandler {
    async getMessage(payload) {
        const protoMessage = (0, chatwoot_1.resolveProtoMessage)(payload._data);
        const converter = new chatwoot_1.MessageEdited(this.l);
        return converter.convert(payload, protoMessage);
    }
    getReplyToWhatsAppID(payload) {
        return payload.editedMessageId;
    }
}
//# sourceMappingURL=message.edited.js.map