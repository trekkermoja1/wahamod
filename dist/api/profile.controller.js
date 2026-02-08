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
exports.ProfileController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const WAHAValidationPipe_1 = require("../nestjs/pipes/WAHAValidationPipe");
const profile_dto_1 = require("../structures/profile.dto");
let ProfileController = class ProfileController {
    constructor(manager) {
        this.manager = manager;
    }
    async getMyProfile(session) {
        const me = session.getSessionMeInfo();
        if (!me) {
            throw new common_1.UnprocessableEntityException('No profile found');
        }
        const picture = await session.getContactProfilePicture(me.id, false);
        return {
            id: me.id,
            name: me.pushName,
            picture: picture || null,
        };
    }
    async setProfileName(session, request) {
        const success = await session.setProfileName(request.name);
        return { success: success !== null && success !== void 0 ? success : true };
    }
    async setProfileStatus(session, request) {
        const success = await session.setProfileStatus(request.status);
        return { success: success !== null && success !== void 0 ? success : true };
    }
    async setProfilePicture(session, request) {
        const success = await session.updateProfilePicture(request.file);
        return { success: success !== null && success !== void 0 ? success : true };
    }
    async deleteProfilePicture(session) {
        const success = await session.updateProfilePicture(null);
        return { success: success || true };
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get my profile' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/profile.dto").MyProfile }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Put)('/name'),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Set my profile name' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").Result }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        profile_dto_1.ProfileNameRequest]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfileName", null);
__decorate([
    (0, common_1.Put)('/status'),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Set profile status (About)' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").Result }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        profile_dto_1.ProfileStatusRequest]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfileStatus", null);
__decorate([
    (0, common_1.Put)('/picture'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Set profile picture' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").Result }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        profile_dto_1.ProfilePictureRequest]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfilePicture", null);
__decorate([
    (0, common_1.Delete)('/picture'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Delete profile picture' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").Result }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteProfilePicture", null);
exports.ProfileController = ProfileController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/profile'),
    (0, swagger_1.ApiTags)('🆔 Profile'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map