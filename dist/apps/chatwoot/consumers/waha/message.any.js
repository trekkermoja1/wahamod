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
exports.MessageAnyHandler = exports.WAHAMessageAnyConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const ids_1 = require("../../../../core/utils/ids");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const chatwoot_1 = require("../../messages/to/chatwoot");
const waha_1 = require("../../waha");
const HasMediaWithNoMediaMessage_1 = require("../../messages/to/chatwoot/HasMediaWithNoMediaMessage");
let WAHAMessageAnyConsumer = class WAHAMessageAnyConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHAMessageAnyConsumer');
        this.manager = manager;
    }
    GetChatId(event) {
        return waha_1.EngineHelper.ChatID(event.payload);
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const event = job.data.event;
        const session = new WAHASelf_1.WAHASessionAPI(event.session, container.WAHASelf());
        const handler = new MessageAnyHandler(job, container.MessageMappingService(), container.ContactConversationService(), container.Logger(), info, session, container.Locale(), container.WAHASelf());
        return await handler.handle(event.payload);
    }
};
exports.WAHAMessageAnyConsumer = WAHAMessageAnyConsumer;
exports.WAHAMessageAnyConsumer = WAHAMessageAnyConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_MESSAGE_ANY, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHAMessageAnyConsumer);
class MessageAnyHandler extends base_1.MessageBaseHandler {
    constructor() {
        super(...arguments);
        this.shouldLogUnsupported = false;
    }
    async getMessage(payload) {
        let converter;
        let msg;
        const protoMessage = (0, chatwoot_1.resolveProtoMessage)(payload._data);
        converter = new chatwoot_1.FacebookAdMessage(this.l, this.logger);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.TextMessage(this.l, this.logger, this.waha, this.job);
        msg = await converter.convert(payload, null);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.LocationMessage(this.l);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.ShareContactMessage(this.l, this.logger);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.PollMessage(this.l);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.ListMessage(this.l);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.EventMessage(this.l);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.PixMessage(this.l, this.logger);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.AlbumMessage(this.l);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new HasMediaWithNoMediaMessage_1.HasMediaWithNoMediaMessage(this.l, this.job);
        msg = await converter.convert(payload, protoMessage);
        if (msg) {
            return msg;
        }
        converter = new chatwoot_1.UnsupportedMessage(this.l, this.job);
        msg = await converter.convert(payload, protoMessage);
        if (this.shouldLogUnsupported) {
            this.logger.warn(`UnsupportedMessage:\n${JSON.stringify(payload, null, 2)}`);
        }
        return msg;
    }
    getReplyToWhatsAppID(payload) {
        const replyTo = payload.replyTo;
        if (!replyTo) {
            return undefined;
        }
        if (!replyTo.id) {
            return undefined;
        }
        const key = (0, ids_1.parseMessageIdSerialized)(replyTo.id, true);
        return key.id;
    }
}
exports.MessageAnyHandler = MessageAnyHandler;
//# sourceMappingURL=message.any.js.map