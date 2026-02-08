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
exports.ChannelsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ChannelsInfoServiceCore_1 = require("../core/services/ChannelsInfoServiceCore");
const jids_1 = require("../core/utils/jids");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const WAHAValidationPipe_1 = require("../nestjs/pipes/WAHAValidationPipe");
const channels_dto_1 = require("../structures/channels.dto");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
let ChannelsController = class ChannelsController {
    constructor(manager, channelsInfoService) {
        this.manager = manager;
        this.channelsInfoService = channelsInfoService;
    }
    async list(session, query) {
        return session.channelsList(query);
    }
    create(session, request) {
        return session.channelsCreateChannel(request);
    }
    delete(session, id) {
        return session.channelsDeleteChannel(id);
    }
    get(session, id) {
        if ((0, jids_1.isJidNewsletter)(id)) {
            return session.channelsGetChannel(id);
        }
        else {
            const inviteCode = (0, session_abc_1.parseChannelInviteLink)(id);
            return session.channelsGetChannelByInviteCode(inviteCode);
        }
    }
    async previewChannelMessages(session, code, query) {
        if ((0, jids_1.isJidNewsletter)(code)) {
            const channel = await session.channelsGetChannel(code);
            code = (0, session_abc_1.parseChannelInviteLink)(channel.invite);
        }
        const inviteCode = (0, session_abc_1.parseChannelInviteLink)(code);
        return session.previewChannelMessages(inviteCode, query);
    }
    follow(session, id) {
        return session.channelsFollowChannel(id);
    }
    unfollow(session, id) {
        return session.channelsUnfollowChannel(id);
    }
    mute(session, id) {
        return session.channelsMuteChannel(id);
    }
    unmute(session, id) {
        return session.channelsUnmuteChannel(id);
    }
    async searchByView(session, request) {
        return session.searchChannelsByView(request);
    }
    async searchByText(session, request) {
        return session.searchChannelsByText(request);
    }
    getSearchViews() {
        return this.channelsInfoService.getViews();
    }
    getSearchCountries() {
        return this.channelsInfoService.getCountries();
    }
    getSearchCategories() {
        return this.channelsInfoService.getCategories();
    }
};
exports.ChannelsController = ChannelsController;
__decorate([
    (0, common_1.Get)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get list of know channels' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/channels.dto").Channel] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        channels_dto_1.ListChannelsQuery]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Create a new channel.' }),
    openapi.ApiResponse({ status: 201, type: require("../structures/channels.dto").Channel }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        channels_dto_1.CreateChannelRequest]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    SessionApiParam_1.SessionApiParam,
    channels_dto_1.NewsletterIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Delete the channel.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id'),
    SessionApiParam_1.SessionApiParam,
    channels_dto_1.NewsletterIdOrInviteCodeApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Get the channel info',
        description: 'You can use either id (123@newsletter) ' +
            'OR invite code (https://www.whatsapp.com/channel/123)',
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/channels.dto").Channel }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id/messages/preview'),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Channel id or invite code',
        required: true,
        type: 'string',
        schema: {
            default: '0029Va4K0PZ5a245NkngBA2M',
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Preview channel messages',
        description: 'You can use either ' +
            'invite code (https://www.whatsapp.com/channel/123) or (123)' +
            'OR' +
            'Channel ID (123@newsletter).',
    }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/channels.dto").ChannelMessage] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, channels_dto_1.PreviewChannelMessages]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "previewChannelMessages", null);
__decorate([
    (0, common_1.Post)(':id/follow'),
    SessionApiParam_1.SessionApiParam,
    channels_dto_1.NewsletterIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Follow the channel.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "follow", null);
__decorate([
    (0, common_1.Post)(':id/unfollow'),
    SessionApiParam_1.SessionApiParam,
    channels_dto_1.NewsletterIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Unfollow the channel.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "unfollow", null);
__decorate([
    (0, common_1.Post)(':id/mute'),
    SessionApiParam_1.SessionApiParam,
    channels_dto_1.NewsletterIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Mute the channel.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "mute", null);
__decorate([
    (0, common_1.Post)(':id/unmute'),
    SessionApiParam_1.SessionApiParam,
    channels_dto_1.NewsletterIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Unmute the channel.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "unmute", null);
__decorate([
    (0, common_1.Post)('/search/by-view'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Search for channels (by view)' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../structures/channels.dto").ChannelListResult }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        channels_dto_1.ChannelSearchByView]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "searchByView", null);
__decorate([
    (0, common_1.Post)('/search/by-text'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Search for channels (by text)' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../structures/channels.dto").ChannelListResult }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        channels_dto_1.ChannelSearchByText]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "searchByText", null);
__decorate([
    (0, common_1.Get)('/search/views'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get list of views for channel search' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/channels.dto").ChannelView] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "getSearchViews", null);
__decorate([
    (0, common_1.Get)('/search/countries'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get list of countries for channel search' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/channels.dto").ChannelCountry] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "getSearchCountries", null);
__decorate([
    (0, common_1.Get)('/search/categories'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get list of categories for channel search' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/channels.dto").ChannelCategory] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "getSearchCategories", null);
exports.ChannelsController = ChannelsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/channels'),
    (0, swagger_1.ApiTags)('📢 Channels'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        ChannelsInfoServiceCore_1.ChannelsInfoServiceCore])
], ChannelsController);
//# sourceMappingURL=channels.controller.js.map