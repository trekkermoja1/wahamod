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
exports.LabelChatAssociation = exports.SetLabelsRequest = exports.LabelID = exports.Label = exports.LabelDTO = exports.LabelBody = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const properties_dto_1 = require("./properties.dto");
const class_validator_1 = require("class-validator");
const Colors = [
    '#ff9485',
    '#64c4ff',
    '#ffd429',
    '#dfaef0',
    '#99b6c1',
    '#55ccb3',
    '#ff9dff',
    '#d3a91d',
    '#6d7cce',
    '#d7e752',
    '#00d0e2',
    '#ffc5c7',
    '#93ceac',
    '#f74848',
    '#00a0f2',
    '#83e422',
    '#ffaf04',
    '#b5ebff',
    '#9ba6ff',
    '#9368cf',
];
class LabelBody {
    toDTO() {
        if (this.color != null && this.colorHex != null) {
            throw new common_1.UnprocessableEntityException("Use either 'color' or 'colorHex'");
        }
        if (this.color == null && this.colorHex == null) {
            throw new common_1.UnprocessableEntityException("'color' or 'colorHex' is required");
        }
        if (this.colorHex) {
            const color = Colors.indexOf(this.colorHex);
            if (color == -1) {
                throw new common_1.UnprocessableEntityException("Invalid 'colorHex'. Possible values: " + Colors.join(', '));
            }
            this.color = color;
        }
        return {
            name: this.name,
            color: this.color,
        };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, colorHex: { required: false, type: () => String }, color: { required: false, type: () => Number } };
    }
}
exports.LabelBody = LabelBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lead',
        description: 'Label name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LabelBody.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '#ff9485',
        description: 'Color in hex',
    }),
    (0, class_validator_1.IsHexColor)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LabelBody.prototype, "colorHex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
        description: 'Color number, not hex',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LabelBody.prototype, "color", void 0);
class LabelDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, color: { required: true, type: () => Number } };
    }
}
exports.LabelDTO = LabelDTO;
class Label {
    static toHex(color) {
        if (color >= Colors.length) {
            return '#000000';
        }
        return Colors[color];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, color: { required: true, type: () => Number }, colorHex: { required: true, type: () => String } };
    }
}
exports.Label = Label;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Label ID',
    }),
    __metadata("design:type", String)
], Label.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lead',
        description: 'Label name',
    }),
    __metadata("design:type", String)
], Label.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Color number, not hex',
    }),
    __metadata("design:type", Number)
], Label.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '#ff9485',
        description: 'Color in hex',
    }),
    __metadata("design:type", String)
], Label.prototype, "colorHex", void 0);
class LabelID {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.LabelID = LabelID;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Label ID',
    }),
    __metadata("design:type", String)
], LabelID.prototype, "id", void 0);
class SetLabelsRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { labels: { required: true, type: () => [require("./labels.dto").LabelID] } };
    }
}
exports.SetLabelsRequest = SetLabelsRequest;
class LabelChatAssociation {
    static _OPENAPI_METADATA_FACTORY() {
        return { labelId: { required: true, type: () => String }, label: { required: true, type: () => require("./labels.dto").Label, nullable: true }, chatId: { required: true, type: () => String } };
    }
}
exports.LabelChatAssociation = LabelChatAssociation;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Label ID',
    }),
    __metadata("design:type", String)
], LabelChatAssociation.prototype, "labelId", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)({
        description: 'Chat ID',
    }),
    __metadata("design:type", String)
], LabelChatAssociation.prototype, "chatId", void 0);
//# sourceMappingURL=labels.dto.js.map