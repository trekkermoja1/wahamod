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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const manager_abc_1 = require("../core/abc/manager.abc");
const WAMimeType_1 = require("../core/media/WAMimeType");
const ApiFileAcceptHeader_1 = require("../nestjs/ApiFileAcceptHeader");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const media_dto_1 = require("../structures/media.dto");
const session_abc_1 = require("../core/abc/session.abc");
const BufferResponseInterceptor_1 = require("../nestjs/BufferResponseInterceptor");
let MediaController = class MediaController {
    constructor(manager) {
        this.manager = manager;
    }
    async convertVoice(session, file) {
        const data = await this.buffer(session, file);
        const content = await session.mediaConverter.voice(data);
        return content;
    }
    async convertVideo(session, file) {
        const data = await this.buffer(session, file);
        const content = await session.mediaConverter.video(data);
        return content;
    }
    async buffer(session, file) {
        if ('url' in file) {
            return session.fetch(file.url);
        }
        else if ('data' in file) {
            return Buffer.from(file.data, 'base64');
        }
        else {
            throw new common_1.UnprocessableEntityException('Either "url" or "data" must be specified.');
        }
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('convert/voice'),
    (0, swagger_1.ApiOperation)({
        summary: 'Convert voice to WhatsApp format (opus)',
    }),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UseInterceptors)(new BufferResponseInterceptor_1.BufferResponseInterceptor(WAMimeType_1.WAMimeType.VOICE, 'output.opus')),
    (0, ApiFileAcceptHeader_1.ApiFileAcceptHeader)(WAMimeType_1.WAMimeType.VOICE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        media_dto_1.VoiceFileDTO]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "convertVoice", null);
__decorate([
    (0, common_1.Post)('convert/video'),
    (0, swagger_1.ApiOperation)({
        summary: 'Convert video to WhatsApp format (mp4)',
    }),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UseInterceptors)(new BufferResponseInterceptor_1.BufferResponseInterceptor(WAMimeType_1.WAMimeType.VIDEO, 'output.mp4')),
    (0, ApiFileAcceptHeader_1.ApiFileAcceptHeader)(WAMimeType_1.WAMimeType.VIDEO),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        media_dto_1.VideoFileDTO]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "convertVideo", null);
exports.MediaController = MediaController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/media'),
    (0, swagger_1.ApiTags)('🖼️ Media'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], MediaController);
//# sourceMappingURL=media.controller.js.map