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
exports.StatusController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const status_dto_1 = require("../structures/status.dto");
let StatusController = class StatusController {
    constructor(manager) {
        this.manager = manager;
    }
    sendTextStatus(session, status) {
        return session.sendTextStatus(status);
    }
    sendImageStatus(session, status) {
        return session.sendImageStatus(status);
    }
    sendVoiceStatus(session, status) {
        return session.sendVoiceStatus(status);
    }
    sendVideoStatus(session, status) {
        return session.sendVideoStatus(status);
    }
    deleteStatus(session, status) {
        return session.deleteStatus(status);
    }
    async getNewMessageId(session) {
        const id = await session.generateNewMessageId();
        return { id: id };
    }
};
exports.StatusController = StatusController;
__decorate([
    (0, common_1.Post)('text'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Send text status' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        status_dto_1.TextStatus]),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "sendTextStatus", null);
__decorate([
    (0, common_1.Post)('image'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Send image status' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        status_dto_1.ImageStatus]),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "sendImageStatus", null);
__decorate([
    (0, common_1.Post)('voice'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Send voice status' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        status_dto_1.VoiceStatus]),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "sendVoiceStatus", null);
__decorate([
    (0, common_1.Post)('video'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Send video status' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        status_dto_1.VideoStatus]),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "sendVideoStatus", null);
__decorate([
    (0, common_1.Post)('delete'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'DELETE sent status' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        status_dto_1.DeleteStatusRequest]),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "deleteStatus", null);
__decorate([
    (0, common_1.Get)('new-message-id'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Generate message ID you can use to batch contacts',
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/chatting.dto").NewMessageIDResponse }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getNewMessageId", null);
exports.StatusController = StatusController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/status'),
    (0, swagger_1.ApiTags)('🟢 Status'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], StatusController);
//# sourceMappingURL=status.controller.js.map