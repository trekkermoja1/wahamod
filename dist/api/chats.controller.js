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
exports.ChatsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ChatIdApiParam_1 = require("../nestjs/params/ChatIdApiParam");
const MessageIdApiParam_1 = require("../nestjs/params/MessageIdApiParam");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const chats_dto_1 = require("../structures/chats.dto");
const chatting_dto_1 = require("../structures/chatting.dto");
const pagination_dto_1 = require("../structures/pagination.dto");
let ChatsController = class ChatsController {
    constructor(manager) {
        this.manager = manager;
    }
    getChats(session, pagination) {
        return session.getChats(pagination);
    }
    getChatsOverview(session, pagination, filter) {
        return session.getChatsOverview(pagination, filter);
    }
    postChatsOverview(session, body) {
        return session.getChatsOverview(body.pagination, body.filter);
    }
    deleteChat(session, chatId) {
        return session.deleteChat(chatId);
    }
    async getChatPicture(session, chatId, query) {
        const url = await session.getContactProfilePicture(chatId, query.refresh);
        return { url: url };
    }
    getChatMessages(query, filter, session, chatId) {
        if (query.sortBy == chats_dto_1.MessageSortField.MESSAGE_TIMESTAMP) {
            query.sortBy = chats_dto_1.MessageSortField.TIMESTAMP;
        }
        query.sortBy = query.sortBy || chats_dto_1.MessageSortField.TIMESTAMP;
        query.sortOrder = query.sortOrder || pagination_dto_1.SortOrder.DESC;
        filter = (0, chats_dto_1.transformAck)(filter);
        return session.getChatMessages(chatId, query, filter);
    }
    readChatMessages(query, session, chatId) {
        return session.readChatMessages(chatId, query);
    }
    async getChatMessage(query, session, chatId, messageId) {
        const message = await session.getChatMessage(chatId, messageId, query);
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        return message;
    }
    async pinMessage(session, chatId, messageId, body) {
        const result = await session.pinMessage(chatId, messageId, body.duration);
        return { success: result };
    }
    async unpinMessage(session, chatId, messageId) {
        const result = await session.unpinMessage(chatId, messageId);
        return { success: result };
    }
    clearMessages(session, chatId) {
        return session.clearMessages(chatId);
    }
    deleteMessage(session, chatId, messageId) {
        return session.deleteMessage(chatId, messageId);
    }
    editMessage(session, chatId, messageId, body) {
        return session.editMessage(chatId, messageId, body);
    }
    archiveChat(session, chatId) {
        return session.chatsArchiveChat(chatId);
    }
    unarchiveChat(session, chatId) {
        return session.chatsUnarchiveChat(chatId);
    }
    unreadChat(session, chatId) {
        return session.chatsUnreadChat(chatId);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Get)(''),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get chats' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        chats_dto_1.ChatsPaginationParams]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "getChats", null);
__decorate([
    (0, common_1.Get)('overview'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Get chats overview. Includes all necessary things to build UI "your chats overview" page - chat id, name, picture, last message. Sorting by last message timestamp',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: [require("../structures/chats.dto").ChatSummary] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        chats_dto_1.OverviewPaginationParams,
        chats_dto_1.OverviewFilter]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatsOverview", null);
__decorate([
    (0, common_1.Post)('overview'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Get chats overview. Use POST if you have too many "ids" params - GET can limit it',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 201, type: [require("../structures/chats.dto").ChatSummary] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        chats_dto_1.OverviewBodyRequest]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "postChatsOverview", null);
__decorate([
    (0, common_1.Delete)(':chatId'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Deletes the chat' }),
    ChatIdApiParam_1.ChatIdApiParam,
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "deleteChat", null);
__decorate([
    (0, common_1.Get)(':chatId/picture'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Gets chat picture' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/chats.dto").ChatPictureResponse }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, chats_dto_1.ChatPictureQuery]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatPicture", null);
__decorate([
    (0, common_1.Get)(':chatId/messages'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Gets messages in the chat' }),
    ChatIdApiParam_1.ChatIdApiParam,
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: [require("../structures/responses.dto").WAMessage] }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, SessionApiParam_1.WorkingSessionParam),
    __param(3, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chats_dto_1.GetChatMessagesQuery,
        chats_dto_1.GetChatMessagesFilter,
        session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "getChatMessages", null);
__decorate([
    (0, common_1.Post)(':chatId/messages/read'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Read unread messages in the chat' }),
    ChatIdApiParam_1.ChatIdApiParam,
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 201, type: require("../structures/chats.dto").ReadChatMessagesResponse }),
    __param(0, (0, common_1.Query)()),
    __param(1, SessionApiParam_1.WorkingSessionParam),
    __param(2, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chats_dto_1.ReadChatMessagesQuery,
        session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "readChatMessages", null);
__decorate([
    (0, common_1.Get)(':chatId/messages/:messageId'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Gets message by id' }),
    ChatIdApiParam_1.ChatIdApiParam,
    openapi.ApiResponse({ status: 200, type: require("../structures/responses.dto").WAMessage }),
    __param(0, (0, common_1.Query)()),
    __param(1, SessionApiParam_1.WorkingSessionParam),
    __param(2, (0, common_1.Param)('chatId')),
    __param(3, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chats_dto_1.GetChatMessageQuery,
        session_abc_1.WhatsappSession, String, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatMessage", null);
__decorate([
    (0, common_1.Post)(':chatId/messages/:messageId/pin'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Pins a message in the chat' }),
    ChatIdApiParam_1.ChatIdApiParam,
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Param)('messageId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, String, chats_dto_1.PinMessageRequest]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "pinMessage", null);
__decorate([
    (0, common_1.Post)(':chatId/messages/:messageId/unpin'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Unpins a message in the chat' }),
    ChatIdApiParam_1.ChatIdApiParam,
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "unpinMessage", null);
__decorate([
    (0, common_1.Delete)(':chatId/messages'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Clears all messages from the chat' }),
    ChatIdApiParam_1.ChatIdApiParam,
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "clearMessages", null);
__decorate([
    (0, common_1.Delete)(':chatId/messages/:messageId'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    MessageIdApiParam_1.MessageIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Deletes a message from the chat' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "deleteMessage", null);
__decorate([
    (0, common_1.Put)(':chatId/messages/:messageId'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    MessageIdApiParam_1.MessageIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Edits a message in the chat' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Param)('messageId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, String, chatting_dto_1.EditMessageRequest]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "editMessage", null);
__decorate([
    (0, common_1.Post)(':chatId/archive'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Archive the chat' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "archiveChat", null);
__decorate([
    (0, common_1.Post)(':chatId/unarchive'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Unarchive the chat' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "unarchiveChat", null);
__decorate([
    (0, common_1.Post)(':chatId/unread'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Unread the chat' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "unreadChat", null);
exports.ChatsController = ChatsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/chats'),
    (0, swagger_1.ApiTags)('💬 Chats'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map