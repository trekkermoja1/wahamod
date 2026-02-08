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
exports.PresenceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ChatIdApiParam_1 = require("../nestjs/params/ChatIdApiParam");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const enums_dto_1 = require("../structures/enums.dto");
const presence_dto_1 = require("../structures/presence.dto");
let PresenceController = class PresenceController {
    constructor(manager) {
        this.manager = manager;
    }
    setPresence(session, request) {
        const presencesWithoutChatId = [
            enums_dto_1.WAHAPresenceStatus.ONLINE,
            enums_dto_1.WAHAPresenceStatus.OFFLINE,
        ];
        const requiresNoChatId = presencesWithoutChatId.includes(request.presence);
        const requiresChatId = !requiresNoChatId;
        if (requiresNoChatId && request.chatId) {
            const msg = {
                detail: `'${request.presence}' presence works on the global scope and doesn't require 'chatId' field.`,
            };
            throw new common_1.BadRequestException(msg);
        }
        else if (requiresChatId && !request.chatId) {
            const msg = {
                detail: `'${request.presence}' presence requires 'chatId' field.`,
            };
            throw new common_1.BadRequestException(msg);
        }
        return session.setPresence(request.presence, request.chatId);
    }
    getPresenceAll(session) {
        return session.getPresences();
    }
    getPresence(session, chatId) {
        return session.getPresence(chatId);
    }
    subscribe(session, chatId) {
        return session.subscribePresence(chatId);
    }
};
exports.PresenceController = PresenceController;
__decorate([
    (0, common_1.Post)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Set session presence' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        presence_dto_1.WAHASessionPresence]),
    __metadata("design:returntype", void 0)
], PresenceController.prototype, "setPresence", null);
__decorate([
    (0, common_1.Get)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get all subscribed presence information.' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/presence.dto").WAHAChatPresences] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "getPresenceAll", null);
__decorate([
    (0, common_1.Get)(':chatId'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: "Get the presence for the chat id. If it hasn't been subscribed - it also subscribes to it.",
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/presence.dto").WAHAChatPresences }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "getPresence", null);
__decorate([
    (0, common_1.Post)(':chatId/subscribe'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Subscribe to presence events for the chat.',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "subscribe", null);
exports.PresenceController = PresenceController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/presence'),
    (0, swagger_1.ApiTags)('✅ Presence'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], PresenceController);
//# sourceMappingURL=presence.controller.js.map