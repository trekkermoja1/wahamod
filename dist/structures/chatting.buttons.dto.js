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
exports.SendButtonsRequest = exports.Button = exports.ButtonType = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("./base.dto");
const files_dto_1 = require("./files.dto");
const properties_dto_1 = require("./properties.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var ButtonType;
(function (ButtonType) {
    ButtonType["REPLY"] = "reply";
    ButtonType["URL"] = "url";
    ButtonType["CALL"] = "call";
    ButtonType["COPY"] = "copy";
})(ButtonType || (exports.ButtonType = ButtonType = {}));
class Button {
    constructor() {
        this.type = ButtonType.REPLY;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, default: ButtonType.REPLY, enum: require("./chatting.buttons.dto").ButtonType }, text: { required: true, type: () => String }, id: { required: false, type: () => String }, url: { required: false, type: () => String }, phoneNumber: { required: false, type: () => String }, copyCode: { required: false, type: () => String } };
    }
}
exports.Button = Button;
__decorate([
    (0, class_validator_1.IsEnum)(ButtonType),
    __metadata("design:type", String)
], Button.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Button Text',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Button.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '321321',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Button.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.type === ButtonType.URL),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Button.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+1234567890',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.type === ButtonType.CALL),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Button.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4321',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.type === ButtonType.COPY),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Button.prototype, "copyCode", void 0);
let SendButtonsRequest = class SendButtonsRequest {
    constructor() {
        this.session = base_dto_1.WHATSAPP_DEFAULT_SESSION_NAME;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { session: { required: true, type: () => String, default: base_dto_1.WHATSAPP_DEFAULT_SESSION_NAME }, chatId: { required: true, type: () => String }, header: { required: true, type: () => String }, headerImage: { required: false, type: () => Object }, body: { required: true, type: () => String }, footer: { required: true, type: () => String }, buttons: { required: true, type: () => [require("./chatting.buttons.dto").Button] } };
    }
};
exports.SendButtonsRequest = SendButtonsRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendButtonsRequest.prototype, "session", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendButtonsRequest.prototype, "chatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'How are you?',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendButtonsRequest.prototype, "header", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.RemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.BinaryFile) },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SendButtonsRequest.prototype, "headerImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Tell us how are you please 🙏',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendButtonsRequest.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'If you have any questions, please send it in the chat',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendButtonsRequest.prototype, "footer", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Button),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(4),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                type: 'reply',
                text: 'I am good!',
            },
            {
                type: 'call',
                text: 'Call us',
                phoneNumber: '+1234567890',
            },
            {
                type: 'copy',
                text: 'Copy code',
                copyCode: '4321',
            },
            {
                type: 'url',
                text: 'How did you do that?',
                url: 'https://waha.devlike.pro',
            },
        ],
    }),
    __metadata("design:type", Array)
], SendButtonsRequest.prototype, "buttons", void 0);
exports.SendButtonsRequest = SendButtonsRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.RemoteFile, files_dto_1.BinaryFile)
], SendButtonsRequest);
//# sourceMappingURL=chatting.buttons.dto.js.map