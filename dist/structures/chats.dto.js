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
exports.ChatArchiveEvent = exports.ChatSummary = exports.OverviewBodyRequest = exports.OverviewFilter = exports.OverviewPaginationParams = exports.PinMessageRequest = exports.PinDuration = exports.ChatsPaginationParams = exports.ChatSortField = exports.GetChatMessageQuery = exports.ReadChatMessagesResponse = exports.ReadChatMessagesQuery = exports.GetChatMessagesQuery = exports.MessageSortField = exports.ChatPictureResponse = exports.ChatPictureQuery = exports.GetChatMessagesFilter = void 0;
exports.transformAck = transformAck;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const BooleanString_1 = require("../nestjs/validation/BooleanString");
const enums_dto_1 = require("./enums.dto");
const pagination_dto_1 = require("./pagination.dto");
const properties_dto_1 = require("./properties.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetChatMessagesFilter {
    static _OPENAPI_METADATA_FACTORY() {
        return { 'filter.timestamp.lte': { required: false, type: () => Number }, 'filter.timestamp.gte': { required: false, type: () => Number }, 'filter.fromMe': { required: false, type: () => Boolean }, 'filter.ack': { required: false, enum: require("./enums.dto").WAMessageAck } };
    }
}
exports.GetChatMessagesFilter = GetChatMessagesFilter;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter messages before this timestamp (inclusive)',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetChatMessagesFilter.prototype, "filter.timestamp.lte", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter messages after this timestamp (inclusive)',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetChatMessagesFilter.prototype, "filter.timestamp.gte", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'From me filter (by default shows all messages)',
    }),
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetChatMessagesFilter.prototype, "filter.fromMe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter messages by acknowledgment status',
        enum: enums_dto_1.WAMessageAckName,
    }),
    (0, class_validator_1.IsEnum)(enums_dto_1.WAMessageAckName),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetChatMessagesFilter.prototype, "filter.ack", void 0);
function transformAck(filter) {
    if (!filter)
        return filter;
    if (!filter['filter.ack'])
        return filter;
    const ackName = filter['filter.ack'];
    const ack = enums_dto_1.WAMessageAck[ackName];
    if (ack == null) {
        throw new common_1.BadRequestException(`Invalid ack: '${ackName}'`);
    }
    filter['filter.ack'] = ack;
    return filter;
}
class ChatPictureQuery {
    constructor() {
        this.refresh = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { refresh: { required: false, type: () => Boolean, default: false } };
    }
}
exports.ChatPictureQuery = ChatPictureQuery;
__decorate([
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'Refresh the picture from the server (24h cache by default). Do not refresh if not needed, you can get rate limit error',
    }),
    __metadata("design:type", Boolean)
], ChatPictureQuery.prototype, "refresh", void 0);
class ChatPictureResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String } };
    }
}
exports.ChatPictureResponse = ChatPictureResponse;
var MessageSortField;
(function (MessageSortField) {
    MessageSortField["TIMESTAMP"] = "timestamp";
    MessageSortField["MESSAGE_TIMESTAMP"] = "messageTimestamp";
})(MessageSortField || (exports.MessageSortField = MessageSortField = {}));
class GetChatMessagesQuery extends pagination_dto_1.PaginationParams {
    constructor() {
        super(...arguments);
        this.limit = 10;
        this.sortBy = MessageSortField.TIMESTAMP;
        this.downloadMedia = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: true, type: () => Number, default: 10 }, sortBy: { required: false, type: () => String, default: MessageSortField.TIMESTAMP }, downloadMedia: { required: true, type: () => Boolean, default: true } };
    }
}
exports.GetChatMessagesQuery = GetChatMessagesQuery;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetChatMessagesQuery.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort by field',
        enum: MessageSortField,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(MessageSortField),
    __metadata("design:type", String)
], GetChatMessagesQuery.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'Download media for messages',
    }),
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetChatMessagesQuery.prototype, "downloadMedia", void 0);
class ReadChatMessagesQuery {
    constructor() {
        this.days = 7;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { messages: { required: true, type: () => Number }, days: { required: true, type: () => Number, default: 7 } };
    }
}
exports.ReadChatMessagesQuery = ReadChatMessagesQuery;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        required: false,
        description: 'How much messages to read (latest first)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReadChatMessagesQuery.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'How much days to read (latest first)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReadChatMessagesQuery.prototype, "days", void 0);
class ReadChatMessagesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: false, type: () => [String] } };
    }
}
exports.ReadChatMessagesResponse = ReadChatMessagesResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Messages IDs that have been read',
    }),
    __metadata("design:type", Array)
], ReadChatMessagesResponse.prototype, "ids", void 0);
class GetChatMessageQuery {
    constructor() {
        this.downloadMedia = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { downloadMedia: { required: true, type: () => Boolean, default: true } };
    }
}
exports.GetChatMessageQuery = GetChatMessageQuery;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        required: false,
        description: 'Download media for messages',
    }),
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetChatMessageQuery.prototype, "downloadMedia", void 0);
var ChatSortField;
(function (ChatSortField) {
    ChatSortField["CONVERSATION_TIMESTAMP"] = "conversationTimestamp";
    ChatSortField["ID"] = "id";
    ChatSortField["NAME"] = "name";
})(ChatSortField || (exports.ChatSortField = ChatSortField = {}));
class ChatsPaginationParams extends pagination_dto_1.PaginationParams {
    static _OPENAPI_METADATA_FACTORY() {
        return { sortBy: { required: false, type: () => String } };
    }
}
exports.ChatsPaginationParams = ChatsPaginationParams;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort by field',
        enum: ChatSortField,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ChatSortField),
    __metadata("design:type", String)
], ChatsPaginationParams.prototype, "sortBy", void 0);
var PinDuration;
(function (PinDuration) {
    PinDuration[PinDuration["DAY"] = 86400] = "DAY";
    PinDuration[PinDuration["WEEK"] = 604800] = "WEEK";
    PinDuration[PinDuration["MONTH"] = 2592000] = "MONTH";
})(PinDuration || (exports.PinDuration = PinDuration = {}));
class PinMessageRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { duration: { required: true, type: () => Number } };
    }
}
exports.PinMessageRequest = PinMessageRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(PinDuration),
    (0, swagger_1.ApiProperty)({
        description: 'Duration in seconds. 24 hours (86400), 7 days (604800), 30 days (2592000)',
        example: 86400,
    }),
    __metadata("design:type", Number)
], PinMessageRequest.prototype, "duration", void 0);
class OverviewPaginationParams extends pagination_dto_1.LimitOffsetParams {
    constructor() {
        super(...arguments);
        this.limit = 20;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, default: 20 } };
    }
}
exports.OverviewPaginationParams = OverviewPaginationParams;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], OverviewPaginationParams.prototype, "limit", void 0);
class OverviewFilter {
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: false, type: () => [String] } };
    }
}
exports.OverviewFilter = OverviewFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    (0, swagger_1.ApiProperty)({
        description: 'Filter by chat ids',
        required: false,
        example: ['111111111@c.us'],
    }),
    __metadata("design:type", Array)
], OverviewFilter.prototype, "ids", void 0);
class OverviewBodyRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { pagination: { required: true, type: () => require("./chats.dto").OverviewPaginationParams }, filter: { required: true, type: () => require("./chats.dto").OverviewFilter } };
    }
}
exports.OverviewBodyRequest = OverviewBodyRequest;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OverviewPaginationParams),
    __metadata("design:type", OverviewPaginationParams)
], OverviewBodyRequest.prototype, "pagination", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OverviewFilter),
    __metadata("design:type", OverviewFilter)
], OverviewBodyRequest.prototype, "filter", void 0);
class ChatSummary {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, nullable: true }, picture: { required: true, type: () => String, nullable: true }, lastMessage: { required: true, type: () => Object }, _chat: { required: true, type: () => Object } };
    }
}
exports.ChatSummary = ChatSummary;
class ChatArchiveEvent {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, archived: { required: true, type: () => Boolean }, timestamp: { required: true, type: () => Number } };
    }
}
exports.ChatArchiveEvent = ChatArchiveEvent;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], ChatArchiveEvent.prototype, "id", void 0);
//# sourceMappingURL=chats.dto.js.map