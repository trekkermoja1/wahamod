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
exports.ChatWootAppConfig = exports.ChatWootConversationsConfig = exports.LinkPreview = exports.ChatWootCommandsConfig = exports.DEFAULT_LOCALE = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const IsDynamicObject_1 = require("../../../nestjs/validation/IsDynamicObject");
const ConversationSelector_1 = require("../services/ConversationSelector");
const types_1 = require("../client/types");
exports.DEFAULT_LOCALE = 'en-US';
class ChatWootCommandsConfig {
    constructor() {
        this.server = true;
        this.queue = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { server: { required: true, type: () => Boolean, default: true }, queue: { required: false, type: () => Boolean, default: false } };
    }
}
exports.ChatWootCommandsConfig = ChatWootCommandsConfig;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChatWootCommandsConfig.prototype, "server", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChatWootCommandsConfig.prototype, "queue", void 0);
var LinkPreview;
(function (LinkPreview) {
    LinkPreview["OFF"] = "OFF";
    LinkPreview["LQ"] = "LG";
    LinkPreview["HQ"] = "HG";
})(LinkPreview || (exports.LinkPreview = LinkPreview = {}));
class ChatWootConversationsConfig {
    constructor() {
        this.markAsRead = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { sort: { required: true, enum: require("../services/ConversationSelector").ConversationSort }, status: { required: true, nullable: true, enum: require("../client/types").ConversationStatus, isArray: true }, markAsRead: { required: false, type: () => Boolean, default: true } };
    }
}
exports.ChatWootConversationsConfig = ChatWootConversationsConfig;
__decorate([
    (0, class_validator_1.IsEnum)(ConversationSelector_1.ConversationSort),
    __metadata("design:type", String)
], ChatWootConversationsConfig.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ConversationStatus, { each: true }),
    __metadata("design:type", Array)
], ChatWootConversationsConfig.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Process message.ack events to mark ChatWoot conversations as read. Enabled by default.',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChatWootConversationsConfig.prototype, "markAsRead", void 0);
class ChatWootAppConfig {
    constructor() {
        this.linkPreview = LinkPreview.OFF;
        this.locale = exports.DEFAULT_LOCALE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, accountId: { required: true, type: () => Number }, accountToken: { required: true, type: () => String }, inboxId: { required: true, type: () => Number }, inboxIdentifier: { required: true, type: () => String }, linkPreview: { required: false, default: LinkPreview.OFF, enum: require("./config.dto").LinkPreview }, locale: { required: true, type: () => String, default: exports.DEFAULT_LOCALE }, templates: { required: false, type: () => Object }, commands: { required: false, type: () => require("./config.dto").ChatWootCommandsConfig }, conversations: { required: false, type: () => require("./config.dto").ChatWootConversationsConfig } };
    }
}
exports.ChatWootAppConfig = ChatWootAppConfig;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatWootAppConfig.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatWootAppConfig.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatWootAppConfig.prototype, "accountToken", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatWootAppConfig.prototype, "inboxId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatWootAppConfig.prototype, "inboxIdentifier", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(LinkPreview),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatWootAppConfig.prototype, "linkPreview", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatWootAppConfig.prototype, "locale", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsDynamicObject_1.IsDynamicObject)(),
    __metadata("design:type", Object)
], ChatWootAppConfig.prototype, "templates", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ChatWootCommandsConfig),
    __metadata("design:type", ChatWootCommandsConfig)
], ChatWootAppConfig.prototype, "commands", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ChatWootConversationsConfig),
    __metadata("design:type", ChatWootConversationsConfig)
], ChatWootAppConfig.prototype, "conversations", void 0);
//# sourceMappingURL=config.dto.js.map