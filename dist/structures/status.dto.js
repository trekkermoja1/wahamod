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
exports.DeleteStatusRequest = exports.VideoStatus = exports.VoiceStatus = exports.ImageStatus = exports.TextStatus = exports.StatusRequest = exports.BROADCAST_ID = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const properties_dto_1 = require("./properties.dto");
const files_dto_1 = require("./files.dto");
exports.BROADCAST_ID = 'status@broadcast';
const ContactsProperty = (0, swagger_1.ApiProperty)({
    description: 'Contact list to send the status to.',
    example: null,
    required: false,
});
class StatusRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => String }, contacts: { required: false, type: () => [String] } };
    }
}
exports.StatusRequest = StatusRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pre-generated status message id',
        example: 'BBBBBBBBBBBBBBBBB',
        default: null,
        required: false,
    }),
    __metadata("design:type", String)
], StatusRequest.prototype, "id", void 0);
__decorate([
    ContactsProperty,
    __metadata("design:type", Array)
], StatusRequest.prototype, "contacts", void 0);
class TextStatus extends StatusRequest {
    constructor() {
        super(...arguments);
        this.text = 'Have a look! https://github.com/';
        this.backgroundColor = '#38b42f';
        this.font = 0;
        this.linkPreview = true;
        this.linkPreviewHighQuality = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String, default: "Have a look! https://github.com/" }, backgroundColor: { required: true, type: () => String, default: "#38b42f" }, font: { required: true, type: () => Number, default: 0 }, linkPreview: { required: false, type: () => Boolean, default: true }, linkPreviewHighQuality: { required: false, type: () => Boolean, default: false } };
    }
}
exports.TextStatus = TextStatus;
let ImageStatus = class ImageStatus extends StatusRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object }, caption: { required: false, type: () => String } };
    }
};
exports.ImageStatus = ImageStatus;
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.RemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.BinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], ImageStatus.prototype, "file", void 0);
exports.ImageStatus = ImageStatus = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.RemoteFile, files_dto_1.BinaryFile)
], ImageStatus);
let VoiceStatus = class VoiceStatus extends StatusRequest {
    constructor() {
        super(...arguments);
        this.backgroundColor = '#38b42f';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object }, backgroundColor: { required: true, type: () => String, default: "#38b42f" }, convert: { required: true, type: () => Boolean } };
    }
};
exports.VoiceStatus = VoiceStatus;
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VoiceRemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VoiceBinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], VoiceStatus.prototype, "file", void 0);
__decorate([
    (0, properties_dto_1.ConvertApiProperty)(),
    __metadata("design:type", Boolean)
], VoiceStatus.prototype, "convert", void 0);
exports.VoiceStatus = VoiceStatus = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.VoiceRemoteFile, files_dto_1.VoiceBinaryFile)
], VoiceStatus);
let VideoStatus = class VideoStatus extends StatusRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object }, caption: { required: false, type: () => String }, convert: { required: true, type: () => Boolean } };
    }
};
exports.VideoStatus = VideoStatus;
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VideoRemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VideoBinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], VideoStatus.prototype, "file", void 0);
__decorate([
    (0, properties_dto_1.ConvertApiProperty)(),
    __metadata("design:type", Boolean)
], VideoStatus.prototype, "convert", void 0);
exports.VideoStatus = VideoStatus = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.VideoRemoteFile, files_dto_1.VideoBinaryFile)
], VideoStatus);
class DeleteStatusRequest extends StatusRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, contacts: { required: false, type: () => [String] } };
    }
}
exports.DeleteStatusRequest = DeleteStatusRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status message id to delete',
        example: 'AAAAAAAAAAAAAAAAA',
    }),
    __metadata("design:type", String)
], DeleteStatusRequest.prototype, "id", void 0);
__decorate([
    ContactsProperty,
    __metadata("design:type", Array)
], DeleteStatusRequest.prototype, "contacts", void 0);
//# sourceMappingURL=status.dto.js.map