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
exports.PreviewChannelMessages = exports.ChannelMessage = exports.ChannelListResult = exports.ChannelPagination = exports.ChannelSearchByText = exports.ChannelSearchByView = exports.ChannelSearch = exports.ChannelView = exports.ChannelCategory = exports.ChannelCountry = exports.NewsletterIdOrInviteCodeApiParam = exports.NewsletterIdApiParam = exports.ChannelPublicInfo = exports.Channel = exports.ListChannelsQuery = exports.ChannelRoleFilter = exports.ChannelRole = exports.CreateChannelRequest = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const BooleanString_1 = require("../nestjs/validation/BooleanString");
const files_dto_1 = require("./files.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateChannelRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, picture: { required: false, type: () => Object } };
    }
}
exports.CreateChannelRequest = CreateChannelRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Channel Name',
    }),
    __metadata("design:type", String)
], CreateChannelRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Channel Description',
    }),
    __metadata("design:type", String)
], CreateChannelRequest.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.RemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.BinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], CreateChannelRequest.prototype, "picture", void 0);
var ChannelRole;
(function (ChannelRole) {
    ChannelRole["OWNER"] = "OWNER";
    ChannelRole["ADMIN"] = "ADMIN";
    ChannelRole["SUBSCRIBER"] = "SUBSCRIBER";
    ChannelRole["GUEST"] = "GUEST";
})(ChannelRole || (exports.ChannelRole = ChannelRole = {}));
var ChannelRoleFilter;
(function (ChannelRoleFilter) {
    ChannelRoleFilter["OWNER"] = "OWNER";
    ChannelRoleFilter["ADMIN"] = "ADMIN";
    ChannelRoleFilter["SUBSCRIBER"] = "SUBSCRIBER";
})(ChannelRoleFilter || (exports.ChannelRoleFilter = ChannelRoleFilter = {}));
class ListChannelsQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { role: { required: false, enum: require("./channels.dto").ChannelRoleFilter } };
    }
}
exports.ListChannelsQuery = ListChannelsQuery;
class ChannelBase {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, invite: { required: true, type: () => String }, preview: { required: false, type: () => String }, picture: { required: false, type: () => String }, verified: { required: true, type: () => Boolean }, subscribersCount: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Newsletter id',
        example: '123123123123@newsletter',
    }),
    __metadata("design:type", String)
], ChannelBase.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Channel name',
        example: 'Channel Name',
    }),
    __metadata("design:type", String)
], ChannelBase.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Invite link',
        example: 'https://www.whatsapp.com/channel/111111111111111111111111',
    }),
    __metadata("design:type", String)
], ChannelBase.prototype, "invite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Preview for channel's picture",
        example: 'https://mmg.whatsapp.net/m1/v/t24/An&_nc_cat=10',
    }),
    __metadata("design:type", String)
], ChannelBase.prototype, "preview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Channel's picture",
        example: 'https://mmg.whatsapp.net/m1/v/t24/An&_nc_cat=10',
    }),
    __metadata("design:type", String)
], ChannelBase.prototype, "picture", void 0);
class Channel extends ChannelBase {
    static _OPENAPI_METADATA_FACTORY() {
        return { role: { required: true, enum: require("./channels.dto").ChannelRole } };
    }
}
exports.Channel = Channel;
class ChannelPublicInfo extends ChannelBase {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ChannelPublicInfo = ChannelPublicInfo;
exports.NewsletterIdApiParam = (0, swagger_1.ApiParam)({
    name: 'id',
    required: true,
    type: 'string',
    schema: {
        default: '123123123@newsletter',
    },
    description: 'WhatsApp Channel ID',
});
exports.NewsletterIdOrInviteCodeApiParam = (0, swagger_1.ApiParam)({
    name: 'id',
    required: true,
    type: 'string',
    schema: {
        default: '123123123@newsletter',
    },
    description: 'WhatsApp Channel ID or invite code from invite link https://www.whatsapp.com/channel/11111',
});
class ChannelCountry {
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.ChannelCountry = ChannelCountry;
class ChannelCategory {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.ChannelCategory = ChannelCategory;
class ChannelView {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.ChannelView = ChannelView;
class ChannelSearch {
    constructor() {
        this.limit = 50;
        this.startCursor = '';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: true, type: () => Number, default: 50 }, startCursor: { required: true, type: () => String, default: "" } };
    }
}
exports.ChannelSearch = ChannelSearch;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ChannelSearch.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChannelSearch.prototype, "startCursor", void 0);
class ChannelSearchByView extends ChannelSearch {
    constructor() {
        super(...arguments);
        this.view = 'RECOMMENDED';
        this.countries = ['US'];
        this.categories = [];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { view: { required: true, type: () => String, default: "RECOMMENDED" }, countries: { required: true, type: () => [String], default: ['US'] }, categories: { required: true, type: () => [String], default: [] } };
    }
}
exports.ChannelSearchByView = ChannelSearchByView;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChannelSearchByView.prototype, "view", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], ChannelSearchByView.prototype, "countries", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ChannelSearchByView.prototype, "categories", void 0);
class ChannelSearchByText extends ChannelSearch {
    constructor() {
        super(...arguments);
        this.text = 'Donald Trump';
        this.categories = [];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String, default: "Donald Trump" }, categories: { required: true, type: () => [String], default: [] } };
    }
}
exports.ChannelSearchByText = ChannelSearchByText;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChannelSearchByText.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ChannelSearchByText.prototype, "categories", void 0);
class ChannelPagination {
    static _OPENAPI_METADATA_FACTORY() {
        return { startCursor: { required: true, type: () => String, nullable: true }, endCursor: { required: true, type: () => String, nullable: true }, hasNextPage: { required: true, type: () => Boolean }, hasPreviousPage: { required: true, type: () => Boolean } };
    }
}
exports.ChannelPagination = ChannelPagination;
class ChannelListResult {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => require("./channels.dto").ChannelPagination }, channels: { required: true, type: () => [require("./channels.dto").ChannelPublicInfo] } };
    }
}
exports.ChannelListResult = ChannelListResult;
class ChannelMessage {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => require("./responses.dto").WAMessage }, viewCount: { required: true, type: () => Number } };
    }
}
exports.ChannelMessage = ChannelMessage;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { '👍': 10, '❤️': 5 },
        type: Object,
        additionalProperties: { type: 'number' },
    }),
    __metadata("design:type", Object)
], ChannelMessage.prototype, "reactions", void 0);
class PreviewChannelMessages {
    constructor() {
        this.downloadMedia = false;
        this.limit = 10;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { downloadMedia: { required: true, type: () => Boolean, default: false }, limit: { required: true, type: () => Number, default: 10 } };
    }
}
exports.PreviewChannelMessages = PreviewChannelMessages;
__decorate([
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PreviewChannelMessages.prototype, "downloadMedia", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PreviewChannelMessages.prototype, "limit", void 0);
//# sourceMappingURL=channels.dto.js.map