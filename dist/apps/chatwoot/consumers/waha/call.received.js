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
exports.CallReceivedMessageHandler = exports.WAHACallReceivedConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const call_0_base_1 = require("./call.0.base");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const waha_1 = require("../../waha");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const templates_1 = require("../../i18n/templates");
const markdown_1 = require("../../messages/to/chatwoot/utils/markdown");
let WAHACallReceivedConsumer = class WAHACallReceivedConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHACallReceivedConsumer');
        this.manager = manager;
    }
    ShouldProcess(event) {
        return (0, call_0_base_1.ShouldProcessCall)(event);
    }
    GetChatId(event) {
        return waha_1.EngineHelper.CallChatID(event.payload);
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const event = job.data.event;
        const locale = container.Locale();
        const handler = new CallReceivedMessageHandler(job, container.MessageMappingService(), container.ContactConversationService(), container.Logger(), info, new WAHASelf_1.WAHASessionAPI(event.session, container.WAHASelf()), locale, container.WAHASelf());
        const msg = (0, call_0_base_1.BuildCallMessagePayload)(event.payload, event.event);
        return await handler.handle(msg);
    }
};
exports.WAHACallReceivedConsumer = WAHACallReceivedConsumer;
exports.WAHACallReceivedConsumer = WAHACallReceivedConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_CALL_RECEIVED, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHACallReceivedConsumer);
class CallReceivedMessageHandler extends base_1.MessageBaseHandler {
    async getMessage(payload) {
        const content = this.l
            .key(templates_1.TKey.WA_TO_CW_CALL_RECEIVED)
            .render({ call: payload });
        return {
            content: (0, markdown_1.WhatsappToMarkdown)(content),
            attachments: [],
            private: false,
        };
    }
    getReplyToWhatsAppID(payload) {
        return undefined;
    }
}
exports.CallReceivedMessageHandler = CallReceivedMessageHandler;
//# sourceMappingURL=call.received.js.map