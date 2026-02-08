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
exports.MessageReactionHandler = exports.WAHAMessageReactionConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const base_2 = require("./base");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const ids_1 = require("../../../../core/utils/ids");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const enums_dto_1 = require("../../../../structures/enums.dto");
const nestjs_pino_1 = require("nestjs-pino");
const templates_1 = require("../../i18n/templates");
const waha_1 = require("../../waha");
let WAHAMessageReactionConsumer = class WAHAMessageReactionConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHAMessageReactionConsumer');
        this.manager = manager;
    }
    GetChatId(event) {
        var _a;
        if (((_a = event.environment) === null || _a === void 0 ? void 0 : _a.engine) == enums_dto_1.WAHAEngine.WEBJS) {
            return event.payload.to;
        }
        return waha_1.EngineHelper.ChatID(event.payload);
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const event = job.data.event;
        const session = new WAHASelf_1.WAHASessionAPI(event.session, container.WAHASelf());
        const handler = new MessageReactionHandler(job, container.MessageMappingService(), container.ContactConversationService(), container.Logger(), info, session, container.Locale(), container.WAHASelf());
        return await handler.handle(event.payload);
    }
};
exports.WAHAMessageReactionConsumer = WAHAMessageReactionConsumer;
exports.WAHAMessageReactionConsumer = WAHAMessageReactionConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_MESSAGE_REACTION, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHAMessageReactionConsumer);
class MessageReactionHandler extends base_2.MessageBaseHandler {
    async getMessage(payload) {
        const reaction = payload.reaction;
        const emoji = reaction.text;
        let content;
        if (emoji) {
            content = this.l.key(templates_1.TKey.WHATSAPP_REACTION_ADDED).render({
                emoji: emoji,
            });
        }
        else {
            content = this.l.key(templates_1.TKey.WHATSAPP_REACTION_REMOVED).render();
        }
        return {
            content: content,
            attachments: [],
            private: undefined,
        };
    }
    getReplyToWhatsAppID(payload) {
        const reaction = payload.reaction;
        const messageId = reaction.messageId;
        const key = (0, ids_1.parseMessageIdSerialized)(messageId, false);
        return key.id;
    }
}
exports.MessageReactionHandler = MessageReactionHandler;
//# sourceMappingURL=message.reaction.js.map