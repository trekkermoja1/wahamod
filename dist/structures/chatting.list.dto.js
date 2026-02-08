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
exports.Section = exports.Row = exports.SendListRequest = exports.SendListMessage = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const chatting_dto_1 = require("./chatting.dto");
const properties_dto_1 = require("./properties.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class Row {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, rowId: { required: true, type: () => String } };
    }
}
exports.Row = Row;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Option 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Row.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description of option 1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Row.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'option1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Row.prototype, "rowId", void 0);
class Section {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, rows: { required: true, type: () => [require("./chatting.list.dto").Row] } };
    }
}
exports.Section = Section;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Menu' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Section.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Row),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, swagger_1.ApiProperty)({
        example: [
            { title: 'Option 1', rowId: 'option1', description: 'First option' },
            { title: 'Option 2', rowId: 'option2', description: 'Second option' },
        ],
    }),
    __metadata("design:type", Array)
], Section.prototype, "rows", void 0);
class SendListMessage {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, footer: { required: false, type: () => String }, button: { required: true, type: () => String }, sections: { required: true, type: () => [require("./chatting.list.dto").Section] } };
    }
}
exports.SendListMessage = SendListMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Example List' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendListMessage.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Choose one of the options', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendListMessage.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Footer note', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendListMessage.prototype, "footer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Select' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendListMessage.prototype, "button", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Section),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                title: 'Section 1',
                rows: [
                    { title: 'Option 1', rowId: 'option1', description: 'Description 1' },
                    { title: 'Option 2', rowId: 'option2', description: 'Description 2' },
                ],
            },
        ],
    }),
    __metadata("design:type", Array)
], SendListMessage.prototype, "sections", void 0);
let SendListRequest = class SendListRequest extends chatting_dto_1.ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String }, message: { required: true, type: () => require("./chatting.list.dto").SendListMessage }, reply_to: { required: false, type: () => String } };
    }
};
exports.SendListRequest = SendListRequest;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendListRequest.prototype, "chatId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SendListMessage),
    (0, swagger_1.ApiProperty)({
        type: SendListMessage,
        example: {
            title: 'Simple Menu',
            description: 'Please choose an option',
            footer: 'Thank you!',
            button: 'Choose',
            sections: [
                {
                    title: 'Main',
                    rows: [
                        {
                            title: 'Option 1',
                            rowId: 'option1',
                            description: null,
                        },
                        {
                            title: 'Option 2',
                            rowId: 'option2',
                            description: null,
                        },
                        {
                            title: 'Option 3',
                            rowId: 'option3',
                            description: null,
                        },
                    ],
                },
            ],
        },
    }),
    __metadata("design:type", SendListMessage)
], SendListRequest.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
        example: null,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendListRequest.prototype, "reply_to", void 0);
exports.SendListRequest = SendListRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(SendListMessage)
], SendListRequest);
//# sourceMappingURL=chatting.list.dto.js.map