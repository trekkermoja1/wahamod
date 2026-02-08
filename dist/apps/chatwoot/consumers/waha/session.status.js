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
exports.SessionStatusHandler = exports.WAHASessionStatusConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const messages_1 = require("../../client/messages");
const types_1 = require("../../client/types");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const emoji_1 = require("../../emoji");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const enums_dto_1 = require("../../../../structures/enums.dto");
const nestjs_pino_1 = require("nestjs-pino");
const templates_1 = require("../../i18n/templates");
const promiseTimeout_1 = require("../../../../utils/promiseTimeout");
let WAHASessionStatusConsumer = class WAHASessionStatusConsumer extends base_1.ChatWootWAHABaseConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, 'WAHASessionStatusConsumer');
        this.manager = manager;
    }
    GetChatId(event) {
        return 'session.status';
    }
    async Process(job, info) {
        const container = await this.DIContainer(job, job.data.app);
        const handler = new SessionStatusHandler(container.ContactConversationService(), container.Locale(), container.WAHASelf());
        return await handler.handle(job.data.event);
    }
};
exports.WAHASessionStatusConsumer = WAHASessionStatusConsumer;
exports.WAHASessionStatusConsumer = WAHASessionStatusConsumer = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.WAHA_SESSION_STATUS, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService])
], WAHASessionStatusConsumer);
const RECOVER_TIME_MS = 10000;
const CHECK_STATUS_INTERVAL_MS = 2000;
class SessionStatusHandler {
    constructor(repo, l, waha) {
        this.repo = repo;
        this.l = l;
        this.waha = waha;
    }
    async handle(data) {
        var _a, _b, _c, _d, _e;
        const payload = data.payload;
        let text = '';
        const current = (_a = payload.statuses) === null || _a === void 0 ? void 0 : _a.at(-1);
        const previous = (_b = payload.statuses) === null || _b === void 0 ? void 0 : _b.at(-2);
        const older = (_c = payload.statuses) === null || _c === void 0 ? void 0 : _c.at(-3);
        switch (payload.status) {
            case enums_dto_1.WAHASessionStatus.STARTING:
                if ((previous === null || previous === void 0 ? void 0 : previous.status) == enums_dto_1.WAHASessionStatus.WORKING) {
                    const recovered = await (0, promiseTimeout_1.waitUntil)(async () => {
                        const response = await this.waha.get(data.session);
                        return response.status == enums_dto_1.WAHASessionStatus.WORKING;
                    }, CHECK_STATUS_INTERVAL_MS, RECOVER_TIME_MS);
                    if (recovered) {
                        return;
                    }
                }
                break;
            case enums_dto_1.WAHASessionStatus.WORKING:
                if ((previous === null || previous === void 0 ? void 0 : previous.status) == enums_dto_1.WAHASessionStatus.STARTING &&
                    (older === null || older === void 0 ? void 0 : older.status) == enums_dto_1.WAHASessionStatus.WORKING) {
                    if ((current === null || current === void 0 ? void 0 : current.timestamp) - (previous === null || previous === void 0 ? void 0 : previous.timestamp) < RECOVER_TIME_MS) {
                        return;
                    }
                }
                text = this.l.key(templates_1.TKey.APP_SESSION_STATUS_WORKING).r({
                    name: ((_d = data.me) === null || _d === void 0 ? void 0 : _d.pushName) || 'Unknown',
                    id: ((_e = data.me) === null || _e === void 0 ? void 0 : _e.id) || 'No phone number',
                });
                break;
            case enums_dto_1.WAHASessionStatus.STOPPED:
                try {
                    const response = await this.waha.get(data.session);
                    if (response.status != enums_dto_1.WAHASessionStatus.STOPPED) {
                        return;
                    }
                }
                catch (_) { }
                text = this.l.key(templates_1.TKey.APP_SESSION_STATUS_ERROR).r();
                text += '\n\n';
                text += this.l.key(templates_1.TKey.APP_HELP_REMINDER).r();
                text += '\n\n';
                break;
            case enums_dto_1.WAHASessionStatus.FAILED:
                text = this.l.key(templates_1.TKey.APP_SESSION_STATUS_ERROR).r();
                text += '\n\n';
                text += this.l.key(templates_1.TKey.APP_HELP_REMINDER).r();
                text += '\n\n';
                break;
            case enums_dto_1.WAHASessionStatus.SCAN_QR_CODE:
                text = this.l.key(templates_1.TKey.APP_SESSION_SCAN_QR_CODE).r();
        }
        const conversation = await this.repo.InboxNotifications();
        const emoji = (0, emoji_1.SessionStatusEmoji)(data.payload.status);
        const activity = this.l.key(templates_1.TKey.APP_SESSION_STATUS_CHANGE).r({
            emoji: emoji,
            session: data.session,
            status: data.payload.status,
        });
        await conversation.activity(activity);
        if (text) {
            const message = {
                content: text,
                message_type: types_1.MessageType.INCOMING,
            };
            await conversation.send(message);
        }
        if (payload.status === enums_dto_1.WAHASessionStatus.SCAN_QR_CODE) {
            const buffer = await this.waha.qr(data.session);
            const message = (0, messages_1.AttachmentFromBuffer)(buffer, 'qr.jpg');
            message.message_type = types_1.MessageType.INCOMING;
            return await conversation.send(message);
        }
    }
}
exports.SessionStatusHandler = SessionStatusHandler;
//# sourceMappingURL=session.status.js.map