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
exports.ChatWootAppService = void 0;
const common_1 = require("@nestjs/common");
const ConversationCache_1 = require("../cache/ConversationCache");
const const_1 = require("../const");
const ChatWootScheduleService_1 = require("./ChatWootScheduleService");
const ChatWootWAHAQueueService_1 = require("./ChatWootWAHAQueueService");
const nestjs_pino_1 = require("nestjs-pino");
const DIContainer_1 = require("../di/DIContainer");
const templates_1 = require("../i18n/templates");
const i18n_1 = require("../i18n");
let ChatWootAppService = class ChatWootAppService {
    constructor(chatWootWAHAQueueService, chatWootScheduleService, logger) {
        this.chatWootWAHAQueueService = chatWootWAHAQueueService;
        this.chatWootScheduleService = chatWootScheduleService;
        this.logger = logger;
    }
    validate(app) {
        if (!i18n_1.i18n.has(app.config.locale)) {
            throw new common_1.UnprocessableEntityException(`Unknown '${app.config.locale}' locale in 'config.local'`);
        }
    }
    async beforeCreated(app) {
        await this.setupCustomAttributes(app);
        await this.sendConnectedMessage(app);
    }
    async beforeEnabled(savedApp, newApp) {
        await this.beforeCreated(newApp);
        return;
    }
    async beforeDisabled(savedApp, newApp) {
        await this.beforeDeleted(savedApp);
        return;
    }
    async beforeUpdated(savedApp, newApp) {
        const isTheSameUrl = savedApp.config.url === newApp.config.url;
        const isTheSameInboxId = savedApp.config.inboxId === newApp.config.inboxId;
        const isTheSameInbox = isTheSameUrl && isTheSameInboxId;
        if (isTheSameInbox) {
            await this.setupCustomAttributes(newApp);
            await this.sendUpdatedMessage(newApp);
        }
        else {
            this.sendDisconnectedMessage(savedApp).catch((err) => {
                this.logger.error('Error sending disconnected message to ChatWoot - ' + err);
            });
            await this.setupCustomAttributes(newApp);
            await this.sendConnectedMessage(newApp);
        }
    }
    async beforeDeleted(app) {
        await this.chatWootScheduleService.unschedule(app.id, app.session);
        this.cleanCache(app);
        this.sendDisconnectedMessage(app).catch((err) => {
            this.logger.error('Error sending disconnected message to ChatWoot - ' + err);
        });
    }
    async sendConnectedMessage(app) {
        const di = new DIContainer_1.DIContainer(0, app.config, this.logger, null);
        const repo = di.ContactConversationService();
        const conversation = await repo.InboxNotifications();
        const welcome = di
            .Locale()
            .key(templates_1.TKey.APP_CONNECTED_MESSAGE)
            .r({ name: app.session });
        await conversation.incoming(welcome);
    }
    async sendDisconnectedMessage(app) {
        const di = new DIContainer_1.DIContainer(0, app.config, this.logger, null);
        const repo = di.ContactConversationService();
        const conversation = await repo.InboxNotifications();
        const disconnected = di
            .Locale()
            .key(templates_1.TKey.APP_DISCONNECTED_MESSAGE)
            .r({ name: app.session });
        await conversation.incoming(disconnected);
    }
    async sendUpdatedMessage(app) {
        const di = new DIContainer_1.DIContainer(0, app.config, this.logger, null);
        const repo = di.ContactConversationService();
        const conversation = await repo.InboxNotifications();
        const updated = di
            .Locale()
            .key(templates_1.TKey.APP_UPDATED_MESSAGE)
            .r({ name: app.session });
        await conversation.incoming(updated);
    }
    beforeSessionStart(app, session) {
        this.chatWootWAHAQueueService.listenEvents(app, session);
    }
    afterSessionStart(app, session) {
        this.chatWootScheduleService.schedule(app.id, session.name).catch((err) => {
            this.logger.error('Error scheduling session for ChatWoot');
            this.logger.error({ err }, err.stack);
        });
    }
    async setupCustomAttributes(app) {
        const di = new DIContainer_1.DIContainer(0, app.config, this.logger, null);
        const service = di.CustomAttributesService();
        await service.upsert(const_1.CHATWOOT_CUSTOM_ATTRIBUTES);
    }
    cleanCache(app) {
        const cache = (0, ConversationCache_1.CacheForConfig)(app.config);
        cache.clean();
    }
};
exports.ChatWootAppService = ChatWootAppService;
exports.ChatWootAppService = ChatWootAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_pino_1.InjectPinoLogger)('ChatWootAppService')),
    __metadata("design:paramtypes", [ChatWootWAHAQueueService_1.ChatWootWAHAQueueService,
        ChatWootScheduleService_1.ChatWootScheduleService,
        nestjs_pino_1.PinoLogger])
], ChatWootAppService);
//# sourceMappingURL=ChatWootAppService.js.map