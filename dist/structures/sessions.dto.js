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
exports.SessionUpdateRequest = exports.SessionCreateRequest = exports.SessionDetailedInfo = exports.SessionInfo = exports.MeInfo = exports.SessionDTO = exports.SessionConfig = exports.ClientSessionConfig = exports.IgnoreConfig = exports.WebjsConfig = exports.NowebConfig = exports.NowebStoreConfig = exports.ProxyConfig = exports.SessionInfoQuery = exports.ListSessionsQuery = exports.SessionExpandQuery = exports.SessionExpand = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const app_dto_1 = require("../apps/app_sdk/dto/app.dto");
const BooleanString_1 = require("../nestjs/validation/BooleanString");
const IsDynamicObject_1 = require("../nestjs/validation/IsDynamicObject");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const properties_dto_1 = require("./properties.dto");
const webhooks_config_dto_1 = require("./webhooks.config.dto");
var SessionExpand;
(function (SessionExpand) {
    SessionExpand["apps"] = "apps";
})(SessionExpand || (exports.SessionExpand = SessionExpand = {}));
class SessionExpandQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { expand: { required: false, type: () => [String], enum: require("./sessions.dto").SessionExpand } };
    }
}
exports.SessionExpandQuery = SessionExpandQuery;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        enum: SessionExpand,
        isArray: true,
        description: 'Expand additional session details.',
    }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(SessionExpand, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SessionExpandQuery.prototype, "expand", void 0);
class ListSessionsQuery extends SessionExpandQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { all: { required: false, type: () => Boolean } };
    }
}
exports.ListSessionsQuery = ListSessionsQuery;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'Return all sessions, including those that are in the STOPPED state.',
    }),
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ListSessionsQuery.prototype, "all", void 0);
class SessionInfoQuery extends SessionExpandQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SessionInfoQuery = SessionInfoQuery;
class ProxyConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { server: { required: true, type: () => String }, username: { required: false, type: () => String }, password: { required: false, type: () => String } };
    }
}
exports.ProxyConfig = ProxyConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'localhost:3128',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProxyConfig.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProxyConfig.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProxyConfig.prototype, "password", void 0);
class NowebStoreConfig {
    constructor() {
        this.enabled = false;
        this.fullSync = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { enabled: { required: true, type: () => Boolean, default: false }, fullSync: { required: true, type: () => Boolean, default: false } };
    }
}
exports.NowebStoreConfig = NowebStoreConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enable or disable the store for contacts, chats, and messages.',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NowebStoreConfig.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enable full sync on session initialization (when scanning QR code).\n' +
            'Full sync will download all contacts, chats, and messages from the phone.\n' +
            'If disabled, only messages early than 90 days will be downloaded and some contacts may be missing.',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NowebStoreConfig.prototype, "fullSync", void 0);
class NowebConfig {
    constructor() {
        this.markOnline = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { store: { required: false, type: () => require("./sessions.dto").NowebStoreConfig }, markOnline: { required: true, type: () => Boolean, default: true } };
    }
}
exports.NowebConfig = NowebConfig;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NowebStoreConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", NowebStoreConfig)
], NowebConfig.prototype, "store", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mark the session as online when it connects to the server.',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NowebConfig.prototype, "markOnline", void 0);
class WebjsConfig {
    constructor() {
        this.tagsEventsOn = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { tagsEventsOn: { required: false, type: () => Boolean, default: false } };
    }
}
exports.WebjsConfig = WebjsConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Enable emission of special 'tag:*' engine events required for presence.update and message.ack.\n" +
            'WARNING: Enabling this may have performance and stability impact. Disabled by default.',
        required: false,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], WebjsConfig.prototype, "tagsEventsOn", void 0);
class IgnoreConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => Boolean }, groups: { required: false, type: () => Boolean }, channels: { required: false, type: () => Boolean }, broadcast: { required: false, type: () => Boolean } };
    }
}
exports.IgnoreConfig = IgnoreConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ignore a status@broadcast (stories) events',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], IgnoreConfig.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ignore groups events',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], IgnoreConfig.prototype, "groups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ignore channels events',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], IgnoreConfig.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ignore broadcast events (broadcast list and status)',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], IgnoreConfig.prototype, "broadcast", void 0);
class ClientSessionConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { deviceName: { required: false, type: () => String }, browserName: { required: false, type: () => String } };
    }
}
exports.ClientSessionConfig = ClientSessionConfig;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSessionConfig.prototype, "deviceName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSessionConfig.prototype, "browserName", void 0);
class SessionConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { webhooks: { required: false, type: () => [require("./webhooks.config.dto").WebhookConfig] }, metadata: { required: false, type: () => Object }, proxy: { required: false, type: () => require("./sessions.dto").ProxyConfig }, debug: { required: false, type: () => Boolean }, ignore: { required: false, type: () => require("./sessions.dto").IgnoreConfig }, client: { required: false, type: () => require("./sessions.dto").ClientSessionConfig }, noweb: { required: false, type: () => require("./sessions.dto").NowebConfig }, webjs: { required: false, type: () => require("./sessions.dto").WebjsConfig } };
    }
}
exports.SessionConfig = SessionConfig;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => webhooks_config_dto_1.WebhookConfig),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SessionConfig.prototype, "webhooks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            'user.id': '123',
            'user.email': 'email@example.com',
        },
        description: "Metadata for the session. You'll get 'metadata' in all webhooks.",
        required: false,
    }),
    (0, IsDynamicObject_1.IsDynamicObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SessionConfig.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProxyConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ProxyConfig)
], SessionConfig.prototype, "proxy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SessionConfig.prototype, "debug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            status: null,
            groups: null,
            channels: null,
        },
        description: 'Ignore some events related to specific chats',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => IgnoreConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", IgnoreConfig)
], SessionConfig.prototype, "ignore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "How connected session renders in device - in format 'Browser (Device)' - Firefox (MacOS)",
        example: {
            browserName: 'Firefox',
            deviceName: 'MacOS',
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ClientSessionConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientSessionConfig)
], SessionConfig.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            store: {
                enabled: true,
                fullSync: false,
            },
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NowebConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", NowebConfig)
], SessionConfig.prototype, "noweb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'WebJS-specific settings.',
        required: false,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WebjsConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WebjsConfig)
], SessionConfig.prototype, "webjs", void 0);
class SessionDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, status: { required: true, enum: require("./enums.dto").WAHASessionStatus }, config: { required: false, type: () => require("./sessions.dto").SessionConfig } };
    }
}
exports.SessionDTO = SessionDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'default',
        description: 'Session name (id)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SessionDTO.prototype, "name", void 0);
class MeInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, lid: { required: false, type: () => String }, jid: { required: false, type: () => String }, pushName: { required: true, type: () => String } };
    }
}
exports.MeInfo = MeInfo;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], MeInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123123@lid',
    }),
    __metadata("design:type", String)
], MeInfo.prototype, "lid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123123:123@s.whatsapp.net',
        description: 'Your id with device number',
    }),
    __metadata("design:type", String)
], MeInfo.prototype, "jid", void 0);
class SessionInfo extends SessionDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { me: { required: false, type: () => require("./sessions.dto").MeInfo }, assignedWorker: { required: false, type: () => String }, presence: { required: true, type: () => Object }, timestamps: { required: true, type: () => ({ activity: { required: true, type: () => Number, nullable: true } }) }, apps: { required: false } };
    }
}
exports.SessionInfo = SessionInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Apps configured for the session.',
        required: false,
        isArray: true,
        type: app_dto_1.App,
        nullable: true,
    }),
    __metadata("design:type", Array)
], SessionInfo.prototype, "apps", void 0);
class SessionDetailedInfo extends SessionInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { engine: { required: false, type: () => Object } };
    }
}
exports.SessionDetailedInfo = SessionDetailedInfo;
const DB_NAME_LIMIT = 64;
const DB_NAME_MAX_PREFIX_LEN = 'waha_noweb'.length;
class SessionCreateRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: DB_NAME_LIMIT - DB_NAME_MAX_PREFIX_LEN, pattern: "/^[a-zA-Z0-9_-]*$/" }, config: { required: false, type: () => require("./sessions.dto").SessionConfig }, apps: { required: false, nullable: true }, start: { required: false, type: () => Boolean } };
    }
}
exports.SessionCreateRequest = SessionCreateRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'default',
        description: 'Session name (id)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(DB_NAME_LIMIT - DB_NAME_MAX_PREFIX_LEN),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/, {
        message: 'Session name can only contain alphanumeric characters, hyphens, and underscores (a-z, A-Z, 0-9, -, _) or be empty',
    }),
    __metadata("design:type", String)
], SessionCreateRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SessionConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SessionConfig)
], SessionCreateRequest.prototype, "config", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Apps to be synchronized for this session.',
        required: false,
        isArray: true,
        type: app_dto_1.App,
        nullable: true,
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => app_dto_1.App),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SessionCreateRequest.prototype, "apps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start session after creation',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SessionCreateRequest.prototype, "start", void 0);
class SessionUpdateRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { config: { required: false, type: () => require("./sessions.dto").SessionConfig }, apps: { required: false, nullable: true } };
    }
}
exports.SessionUpdateRequest = SessionUpdateRequest;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SessionConfig),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SessionConfig)
], SessionUpdateRequest.prototype, "config", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Apps to be synchronized for this session.',
        required: false,
        isArray: true,
        type: app_dto_1.App,
        nullable: true,
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => app_dto_1.App),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SessionUpdateRequest.prototype, "apps", void 0);
//# sourceMappingURL=sessions.dto.js.map