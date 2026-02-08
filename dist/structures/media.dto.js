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
exports.VideoFileDTO = exports.VoiceFileDTO = exports.FileDTO = exports.WAMedia = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const media_s3_dto_1 = require("./media.s3.dto");
class WAMedia {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: false, type: () => String }, mimetype: { required: false, type: () => String }, filename: { required: false, type: () => String }, s3: { required: false, type: () => require("./media.s3.dto").S3MediaData }, error: { required: false, type: () => Object } };
    }
}
exports.WAMedia = WAMedia;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The URL for the media in the message if any',
        example: 'http://localhost:3000/api/files/false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA.oga',
    }),
    __metadata("design:type", String)
], WAMedia.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'mimetype for the media in the message if any',
        example: 'audio/jpeg',
    }),
    __metadata("design:type", String)
], WAMedia.prototype, "mimetype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The original filename in mediaUrl in the message if any',
        example: 'example.pdf',
    }),
    __metadata("design:type", String)
], WAMedia.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'S3 attributes for the media in the message ' +
            'if you are using S3 media storage',
    }),
    __metadata("design:type", media_s3_dto_1.S3MediaData)
], WAMedia.prototype, "s3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Error message if there's an error downloading the media",
        example: null,
    }),
    __metadata("design:type", Object)
], WAMedia.prototype, "error", void 0);
class FileDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: false, type: () => String }, data: { required: false, type: () => String } };
    }
}
exports.FileDTO = FileDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The URL for the file',
    }),
    __metadata("design:type", String)
], FileDTO.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Base64 content of the file',
        example: null,
    }),
    __metadata("design:type", String)
], FileDTO.prototype, "data", void 0);
class VoiceFileDTO extends FileDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: false, type: () => String } };
    }
}
exports.VoiceFileDTO = VoiceFileDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The URL for the voice file',
        example: process.env.WHATSAPP_SWAGGER_VIDEO_EXAMPLE_URL ||
            'https://github.com/devlikeapro/waha/raw/core/examples/voice.mp3',
    }),
    __metadata("design:type", String)
], VoiceFileDTO.prototype, "url", void 0);
class VideoFileDTO extends FileDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: false, type: () => String } };
    }
}
exports.VideoFileDTO = VideoFileDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The URL for the video file',
        example: 'https://github.com/devlikeapro/waha/raw/core/examples/video.mp4',
    }),
    __metadata("design:type", String)
], VideoFileDTO.prototype, "url", void 0);
//# sourceMappingURL=media.dto.js.map