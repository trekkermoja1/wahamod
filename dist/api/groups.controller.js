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
exports.GroupsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ChatIdApiParam_1 = require("../nestjs/params/ChatIdApiParam");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const chats_dto_1 = require("../structures/chats.dto");
const profile_dto_1 = require("../structures/profile.dto");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const groups_dto_1 = require("../structures/groups.dto");
let GroupsController = class GroupsController {
    constructor(manager) {
        this.manager = manager;
    }
    createGroup(session, request) {
        return session.createGroup(request);
    }
    async joinInfoGroup(session, query) {
        const code = (0, session_abc_1.parseGroupInviteLink)(query.code);
        return session.joinInfoGroup(code);
    }
    async joinGroup(session, request) {
        const code = (0, session_abc_1.parseGroupInviteLink)(request.code);
        const id = await session.joinGroup(code);
        return { id: id };
    }
    async getGroups(session, pagination, fields) {
        let groups = await session.getGroups(pagination);
        groups = session.filterGroupsFields(groups, fields);
        return groups;
    }
    async getGroupsCount(session) {
        const data = await session.getGroups({});
        const groups = Array.isArray(data) ? data : Object.values(data);
        return {
            count: groups.length,
        };
    }
    async refreshGroups(session) {
        return { success: await session.refreshGroups() };
    }
    getGroup(session, id) {
        return session.getGroup(id);
    }
    deleteGroup(session, id) {
        return session.deleteGroup(id);
    }
    leaveGroup(session, id) {
        return session.leaveGroup(id);
    }
    async getChatPicture(session, id, query) {
        const url = await session.getContactProfilePicture(id, query.refresh);
        return { url: url };
    }
    async setPicture(id, session, request) {
        const success = await session.updateGroupPicture(id, request.file);
        return { success: success !== null && success !== void 0 ? success : true };
    }
    async deletePicture(id, session) {
        const success = await session.updateGroupPicture(id, null);
        return { success: success || true };
    }
    setDescription(session, id, request) {
        return session.setDescription(id, request.description);
    }
    setSubject(session, id, request) {
        return session.setSubject(id, request.subject);
    }
    setInfoAdminOnly(session, id, request) {
        return session.setInfoAdminsOnly(id, request.adminsOnly);
    }
    getInfoAdminOnly(session, id) {
        return session.getInfoAdminsOnly(id);
    }
    setMessagesAdminOnly(session, id, request) {
        return session.setMessagesAdminsOnly(id, request.adminsOnly);
    }
    getMessagesAdminOnly(session, id) {
        return session.getMessagesAdminsOnly(id);
    }
    getInviteCode(session, id) {
        return session.getInviteCode(id);
    }
    revokeInviteCode(session, id) {
        return session.revokeInviteCode(id);
    }
    getParticipants(session, id) {
        return session.getParticipants(id);
    }
    getGroupParticipants(session, id) {
        return session.getGroupParticipants(id);
    }
    addParticipants(session, id, request) {
        return session.addParticipants(id, request);
    }
    removeParticipants(session, id, request) {
        return session.removeParticipants(id, request);
    }
    promoteToAdmin(session, id, request) {
        return session.promoteParticipantsToAdmin(id, request);
    }
    demoteToAdmin(session, id, request) {
        return session.demoteParticipantsToUser(id, request);
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.Post)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Create a new group.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        groups_dto_1.CreateGroupRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)('join-info'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get info about the group before joining.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        groups_dto_1.JoinGroupRequest]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "joinInfoGroup", null);
__decorate([
    (0, common_1.Post)('join'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Join group via code' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../structures/groups.dto").JoinGroupResponse }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        groups_dto_1.JoinGroupRequest]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Get)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get all groups.' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        groups_dto_1.GroupsPaginationParams,
        groups_dto_1.GroupsListFields]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Get)('/count'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get the number of groups.' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").CountResponse }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroupsCount", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Refresh groups from the server.' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "refreshGroups", null);
__decorate([
    (0, common_1.Get)(':id'),
    ChatIdApiParam_1.GroupIdApiParam,
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get the group.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroup", null);
__decorate([
    (0, common_1.Delete)(':id'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Delete the group.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.Post)(':id/leave'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Leave the group.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "leaveGroup", null);
__decorate([
    (0, common_1.Get)(':id/picture'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get group picture' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/chats.dto").ChatPictureResponse }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, chats_dto_1.ChatPictureQuery]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getChatPicture", null);
__decorate([
    (0, common_1.Put)(':id/picture'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Set group picture' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").Result }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, SessionApiParam_1.WorkingSessionParam),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_abc_1.WhatsappSession,
        profile_dto_1.ProfilePictureRequest]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "setPicture", null);
__decorate([
    (0, common_1.Delete)(':id/picture'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Delete group picture' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").Result }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "deletePicture", null);
__decorate([
    (0, common_1.Put)(':id/description'),
    (0, swagger_1.ApiOperation)({
        summary: 'Updates the group description.',
        description: 'Returns "true" if the subject was properly updated. This can return "false" if the user does not have the necessary permissions.',
    }),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.DescriptionRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "setDescription", null);
__decorate([
    (0, common_1.Put)(':id/subject'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Updates the group subject',
        description: 'Returns "true" if the subject was properly updated. This can return "false" if the user does not have the necessary permissions.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.SubjectRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "setSubject", null);
__decorate([
    (0, common_1.Put)(':id/settings/security/info-admin-only'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Updates the group "info admin only" settings.',
        description: 'You can allow only admins to edit group info (title, description, photo).',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.SettingsSecurityChangeInfo]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "setInfoAdminOnly", null);
__decorate([
    (0, common_1.Get)(':id/settings/security/info-admin-only'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: "Get the group's 'info admin only' settings.",
        description: 'You can allow only admins to edit group info (title, description, photo).',
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/groups.dto").SettingsSecurityChangeInfo }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getInfoAdminOnly", null);
__decorate([
    (0, common_1.Put)(':id/settings/security/messages-admin-only'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Update settings - who can send messages',
        description: 'Updates the group settings to only allow admins to send messages.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.SettingsSecurityChangeInfo]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "setMessagesAdminOnly", null);
__decorate([
    (0, common_1.Get)(':id/settings/security/messages-admin-only'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Get settings - who can send messages',
        description: 'The group settings to only allow admins to send messages.',
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/groups.dto").SettingsSecurityChangeInfo }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getMessagesAdminOnly", null);
__decorate([
    (0, common_1.Get)(':id/invite-code'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Gets the invite code for the group.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getInviteCode", null);
__decorate([
    (0, common_1.Post)(':id/invite-code/revoke'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Invalidates the current group invite code and generates a new one.',
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: String }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "revokeInviteCode", null);
__decorate([
    (0, common_1.Get)(':id/participants/'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get participants' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getParticipants", null);
__decorate([
    (0, common_1.Get)(':id/participants/v2'),
    ChatIdApiParam_1.GroupIdApiParam,
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get group participants.' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/groups.dto").GroupParticipant] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroupParticipants", null);
__decorate([
    (0, common_1.Post)(':id/participants/add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Add participants' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "addParticipants", null);
__decorate([
    (0, common_1.Post)(':id/participants/remove'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Remove participants',
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "removeParticipants", null);
__decorate([
    (0, common_1.Post)(':id/admin/promote'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Promote participants to admin users.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "promoteToAdmin", null);
__decorate([
    (0, common_1.Post)(':id/admin/demote'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.GroupIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Demotes participants to regular users.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "demoteToAdmin", null);
exports.GroupsController = GroupsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/groups'),
    (0, swagger_1.ApiTags)('👥 Groups'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map