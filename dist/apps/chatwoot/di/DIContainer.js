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
exports.DIContainer = void 0;
exports.ChatWootConfigDefaults = ChatWootConfigDefaults;
const chatwoot_sdk_1 = require("@figuro/chatwoot-sdk");
const lodash = require("lodash");
const AxiosLogging_1 = require("../../app_sdk/AxiosLogging");
const ContactService_1 = require("../client/ContactService");
const ContactConversationService_1 = require("../client/ContactConversationService");
const ConversationService_1 = require("../client/ConversationService");
const CustomAttributesService_1 = require("../client/CustomAttributesService");
const config_dto_1 = require("../dto/config.dto");
const ChatWootErrorReporter_1 = require("../error/ChatWootErrorReporter");
const locale_1 = require("../i18n/locale");
const WAHASelf_1 = require("../../app_sdk/waha/WAHASelf");
const storage_1 = require("../storage");
const i18n_1 = require("../i18n");
const Cache_1 = require("../../../utils/Cache");
const ConversationSelector_1 = require("../services/ConversationSelector");
class DIContainer {
    constructor(appPk, config, logger, knex) {
        this.appPk = appPk;
        this.config = config;
        this.logger = logger;
        this.knex = knex;
    }
    Logger() {
        return this.logger;
    }
    AppPk() {
        if (!this.appPk) {
            throw new Error('AppPk not set or 0');
        }
        return this.appPk;
    }
    Knex() {
        if (!this.knex) {
            throw new Error('Knex not set');
        }
        return this.knex;
    }
    Locale() {
        let locale = i18n_1.i18n.locale(this.config.locale || config_dto_1.DEFAULT_LOCALE);
        locale = locale.override(this.ChatWootConfig().templates);
        return locale;
    }
    AccountAPI() {
        return new chatwoot_sdk_1.default({
            config: {
                basePath: this.config.url,
                with_credentials: true,
                credentials: 'include',
                token: this.config.accountToken,
            },
        });
    }
    InboxAPI() {
        const chatwootClientAPI = new chatwoot_sdk_1.default({
            config: {
                basePath: this.config.url,
                with_credentials: true,
                credentials: 'include',
                token: this.config.inboxIdentifier,
            },
        });
        return chatwootClientAPI.client;
    }
    ContactService() {
        return new ContactService_1.ContactService(this.config, this.AccountAPI(), this.InboxAPI(), this.logger);
    }
    ConversationSelector() {
        const config = this.ChatWootConfig();
        return new ConversationSelector_1.ConversationSelector({
            sort: config.conversations.sort,
            status: config.conversations.status,
            inboxId: this.config.inboxId,
        });
    }
    ConversationService() {
        return new ConversationService_1.ConversationService(this.config, this.AccountAPI(), this.InboxAPI(), this.ConversationSelector(), this.logger);
    }
    ContactConversationService() {
        return new ContactConversationService_1.ContactConversationService(this.config, this.ContactService(), this.ConversationService(), this.AccountAPI(), this.logger, this.Locale());
    }
    ChatwootMessageRepository() {
        return new storage_1.ChatwootMessageRepository(this.Knex(), this.AppPk());
    }
    WhatsAppMessageRepository() {
        return new storage_1.WhatsAppMessageRepository(this.Knex(), this.AppPk());
    }
    MessageMappingRepository() {
        return new storage_1.MessageMappingRepository(this.Knex(), this.AppPk());
    }
    MessageMappingService() {
        return new storage_1.MessageMappingService(this.Knex(), this.WhatsAppMessageRepository(), this.ChatwootMessageRepository(), this.MessageMappingRepository());
    }
    ChatWootErrorReporter(job) {
        return new ChatWootErrorReporter_1.ChatWootErrorReporter(this.Logger(), job, this.Locale());
    }
    WAHASelf() {
        const self = new WAHASelf_1.WAHASelf();
        const logging = new AxiosLogging_1.AxiosLogging(this.Logger());
        logging.applyTo(self.client);
        return self;
    }
    CustomAttributesService() {
        return new CustomAttributesService_1.CustomAttributesService(this.config, this.AccountAPI());
    }
    ChatWootConfig() {
        return ChatWootConfigDefaults(this.config);
    }
}
exports.DIContainer = DIContainer;
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", locale_1.Locale)
], DIContainer.prototype, "Locale", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", chatwoot_sdk_1.default)
], DIContainer.prototype, "AccountAPI", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], DIContainer.prototype, "InboxAPI", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ContactService_1.ContactService)
], DIContainer.prototype, "ContactService", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DIContainer.prototype, "ConversationSelector", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ConversationService_1.ConversationService)
], DIContainer.prototype, "ConversationService", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ContactConversationService_1.ContactConversationService)
], DIContainer.prototype, "ContactConversationService", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", storage_1.ChatwootMessageRepository)
], DIContainer.prototype, "ChatwootMessageRepository", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", storage_1.WhatsAppMessageRepository)
], DIContainer.prototype, "WhatsAppMessageRepository", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", storage_1.MessageMappingRepository)
], DIContainer.prototype, "MessageMappingRepository", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", storage_1.MessageMappingService)
], DIContainer.prototype, "MessageMappingService", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", WAHASelf_1.WAHASelf)
], DIContainer.prototype, "WAHASelf", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DIContainer.prototype, "CustomAttributesService", null);
__decorate([
    (0, Cache_1.CacheSync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], DIContainer.prototype, "ChatWootConfig", null);
function ChatWootConfigDefaults(config) {
    const defaults = {
        templates: {},
        linkPreview: config_dto_1.LinkPreview.OFF,
        commands: {
            server: true,
            queue: false,
        },
        conversations: {
            sort: ConversationSelector_1.ConversationSort.created_newest,
            status: null,
            markAsRead: true,
        },
    };
    return lodash.defaultsDeep({}, config, defaults);
}
//# sourceMappingURL=DIContainer.js.map