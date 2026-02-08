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
exports.ChattingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const WAHAValidationPipe_1 = require("../nestjs/pipes/WAHAValidationPipe");
const chats_dto_1 = require("../structures/chats.dto");
const chatting_buttons_dto_1 = require("../structures/chatting.buttons.dto");
const chatting_list_dto_1 = require("../structures/chatting.list.dto");
const manager_abc_1 = require("../core/abc/manager.abc");
const chatting_dto_1 = require("../structures/chatting.dto");
const mentions_all_1 = require("../core/utils/mentions.all");
let ChattingController = class ChattingController {
    constructor(manager) {
        this.manager = manager;
    }
    async sendText(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        if ((0, mentions_all_1.mentionsAll)(request)) {
            (0, mentions_all_1.validateRequestMentions)(request);
            request.mentions = await whatsapp.resolveMentionsAll(request.chatId);
        }
        return whatsapp.sendText(request);
    }
    async sendImage(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        if ((0, mentions_all_1.mentionsAll)(request)) {
            (0, mentions_all_1.validateRequestMentions)(request);
            request.mentions = await whatsapp.resolveMentionsAll(request.chatId);
        }
        return whatsapp.sendImage(request);
    }
    async sendFile(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        if ((0, mentions_all_1.mentionsAll)(request)) {
            (0, mentions_all_1.validateRequestMentions)(request);
            request.mentions = await whatsapp.resolveMentionsAll(request.chatId);
        }
        return whatsapp.sendFile(request);
    }
    async sendVoice(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendVoice(request);
    }
    async sendVideo(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        if ((0, mentions_all_1.mentionsAll)(request)) {
            (0, mentions_all_1.validateRequestMentions)(request);
            request.mentions = await whatsapp.resolveMentionsAll(request.chatId);
        }
        return whatsapp.sendVideo(request);
    }
    async sendLinkCustomPreview(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        if (!request.text.includes(request.preview.url)) {
            throw new Error('"text" must include the URL provided in the "preview.url"');
        }
        return whatsapp.sendLinkCustomPreview(request);
    }
    async sendButtons(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendButtons(request);
    }
    async sendList(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendList(request);
    }
    async forwardMessage(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return await whatsapp.forwardMessage(request);
    }
    async sendSeen(chat) {
        var _a;
        const hasMessageId = ((_a = chat.messageIds) === null || _a === void 0 ? void 0 : _a.length) > 0 || Boolean(chat.messageId);
        if (!hasMessageId) {
            const whatsapp = await this.manager.getWorkingSession(chat.session);
            const query = {
                messages: null,
                days: 7,
            };
            return whatsapp.readChatMessages(chat.chatId, query);
        }
        const whatsapp = await this.manager.getWorkingSession(chat.session);
        return whatsapp.sendSeen(chat);
    }
    async startTyping(chat) {
        const whatsapp = await this.manager.getWorkingSession(chat.session);
        await whatsapp.startTyping(chat);
        return { result: true };
    }
    async stopTyping(chat) {
        const whatsapp = await this.manager.getWorkingSession(chat.session);
        await whatsapp.stopTyping(chat);
        return { result: true };
    }
    async setReaction(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.setReaction(request);
    }
    async setStar(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        await whatsapp.setStar(request);
        return;
    }
    async sendPoll(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendPoll(request);
    }
    async sendPollVote(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendPollVote(request);
    }
    async sendLocation(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendLocation(request);
    }
    async sendContactVcard(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendContactVCard(request);
    }
    async sendButtonsReply(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendButtonsReply(request);
    }
    async sendTextGet(query) {
        const whatsapp = await this.manager.getWorkingSession(query.session);
        const msg = new chatting_dto_1.MessageTextRequest();
        msg.chatId = query.phone;
        msg.text = query.text;
        return whatsapp.sendText(msg);
    }
    async getMessages(query, filter) {
        filter = (0, chats_dto_1.transformAck)(filter);
        const whatsapp = await this.manager.getWorkingSession(query.session);
        return whatsapp.getChatMessages(query.chatId, query, filter);
    }
    async DEPRECATED_checkNumberStatus(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.checkNumberStatus(request);
    }
    async reply(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.reply(request);
    }
    async sendLinkPreview_DEPRECATED(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.sendLinkPreview(request);
    }
};
exports.ChattingController = ChattingController;
__decorate([
    (0, common_1.Post)('/sendText'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a text message' }),
    openapi.ApiResponse({ status: 201, type: require("../structures/responses.dto").WAMessage }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageTextRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendText", null);
__decorate([
    (0, common_1.Post)('/sendImage'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send an image',
        description: 'Either from an URL or base64 data - look at the request schemas for details.',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageImageRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendImage", null);
__decorate([
    (0, common_1.Post)('/sendFile'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a file',
        description: 'Either from an URL or base64 data - look at the request schemas for details.',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageFileRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendFile", null);
__decorate([
    (0, common_1.Post)('/sendVoice'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send an voice message',
        description: 'Either from an URL or base64 data - look at the request schemas for details.',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageVoiceRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendVoice", null);
__decorate([
    (0, common_1.Post)('/sendVideo'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a video',
        description: 'Either from an URL or base64 data - look at the request schemas for details.',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageVideoRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendVideo", null);
__decorate([
    (0, common_1.Post)('/send/link-custom-preview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a text message with a CUSTOM link preview.',
        description: 'You can use regular /api/sendText if you wanna send auto-generated link preview.',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageLinkCustomPreviewRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendLinkCustomPreview", null);
__decorate([
    (0, common_1.Post)('/sendButtons'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send buttons message (interactive)',
        description: 'Send Buttons',
        deprecated: true,
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_buttons_dto_1.SendButtonsRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendButtons", null);
__decorate([
    (0, common_1.Post)('/sendList'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a list message (interactive)',
        description: 'Send a List message with sections and rows',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_list_dto_1.SendListRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendList", null);
__decorate([
    (0, common_1.Post)('/forwardMessage'),
    openapi.ApiResponse({ status: 201, type: require("../structures/responses.dto").WAMessage }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageForwardRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "forwardMessage", null);
__decorate([
    (0, common_1.Post)('/sendSeen'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.SendSeenRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendSeen", null);
__decorate([
    (0, common_1.Post)('/startTyping'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.ChatRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "startTyping", null);
__decorate([
    (0, common_1.Post)('/stopTyping'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.ChatRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "stopTyping", null);
__decorate([
    (0, common_1.Put)('/reaction'),
    (0, swagger_1.ApiOperation)({ summary: 'React to a message with an emoji' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageReactionRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "setReaction", null);
__decorate([
    (0, common_1.Put)('/star'),
    (0, swagger_1.ApiOperation)({ summary: 'Star or unstar a message' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageStarRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "setStar", null);
__decorate([
    (0, common_1.Post)('/sendPoll'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a poll with options',
        description: 'You can use it as buttons or list replacement',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessagePollRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendPoll", null);
__decorate([
    (0, common_1.Post)('/sendPollVote'),
    (0, swagger_1.ApiOperation)({
        summary: 'Vote on a poll',
        description: 'Cast vote(s) on an existing poll message',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessagePollVoteRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendPollVote", null);
__decorate([
    (0, common_1.Post)('/sendLocation'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageLocationRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendLocation", null);
__decorate([
    (0, common_1.Post)('/sendContactVcard'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageContactVcardRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendContactVcard", null);
__decorate([
    (0, common_1.Post)('/send/buttons/reply'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reply on a button message',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageButtonReply]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendButtonsReply", null);
__decorate([
    (0, common_1.Get)('/sendText'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a text message', deprecated: true }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageTextQuery]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendTextGet", null);
__decorate([
    (0, common_1.Get)('/messages'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get messages in a chat',
        description: 'DEPRECATED. Use "GET /api/chats/{id}/messages" instead',
        deprecated: true,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: [require("../structures/responses.dto").WAMessage] }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.GetMessageQuery,
        chats_dto_1.GetChatMessagesFilter]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('/checkNumberStatus'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check number status',
        description: 'DEPRECATED. Use "POST /contacts/check-exists" instead',
        deprecated: true,
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/chatting.dto").WANumberExistResult }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.CheckNumberStatusQuery]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "DEPRECATED_checkNumberStatus", null);
__decorate([
    (0, common_1.Post)('/reply'),
    (0, swagger_1.ApiOperation)({
        summary: 'DEPRECATED - you can set "reply_to" field when sending text, image, etc',
        deprecated: true,
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageReplyRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "reply", null);
__decorate([
    (0, common_1.Post)('/sendLinkPreview'),
    (0, swagger_1.ApiOperation)({ deprecated: true }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageLinkPreviewRequest]),
    __metadata("design:returntype", Promise)
], ChattingController.prototype, "sendLinkPreview_DEPRECATED", null);
exports.ChattingController = ChattingController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api'),
    (0, swagger_1.ApiTags)('📤 Chatting'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], ChattingController);
//# sourceMappingURL=chatting.controller.js.map