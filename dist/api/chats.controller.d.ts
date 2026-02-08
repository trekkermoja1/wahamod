import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { ChatPictureQuery, ChatPictureResponse, ChatsPaginationParams, ChatSummary, GetChatMessageQuery, GetChatMessagesFilter, GetChatMessagesQuery, OverviewBodyRequest, OverviewFilter, OverviewPaginationParams, PinMessageRequest, ReadChatMessagesQuery, ReadChatMessagesResponse } from '../structures/chats.dto';
import { EditMessageRequest } from '../structures/chatting.dto';
declare class ChatsController {
    private manager;
    constructor(manager: SessionManager);
    getChats(session: WhatsappSession, pagination: ChatsPaginationParams): void;
    getChatsOverview(session: WhatsappSession, pagination: OverviewPaginationParams, filter: OverviewFilter): Promise<ChatSummary[]>;
    postChatsOverview(session: WhatsappSession, body: OverviewBodyRequest): Promise<ChatSummary[]>;
    deleteChat(session: WhatsappSession, chatId: string): void;
    getChatPicture(session: WhatsappSession, chatId: string, query: ChatPictureQuery): Promise<ChatPictureResponse>;
    getChatMessages(query: GetChatMessagesQuery, filter: GetChatMessagesFilter, session: WhatsappSession, chatId: string): Promise<import("../structures/responses.dto").WAMessage[]>;
    readChatMessages(query: ReadChatMessagesQuery, session: WhatsappSession, chatId: string): Promise<ReadChatMessagesResponse>;
    getChatMessage(query: GetChatMessageQuery, session: WhatsappSession, chatId: string, messageId: string): Promise<import("../structures/responses.dto").WAMessage>;
    pinMessage(session: WhatsappSession, chatId: string, messageId: string, body: PinMessageRequest): Promise<{
        success: boolean;
    }>;
    unpinMessage(session: WhatsappSession, chatId: string, messageId: string): Promise<{
        success: boolean;
    }>;
    clearMessages(session: WhatsappSession, chatId: string): void;
    deleteMessage(session: WhatsappSession, chatId: string, messageId: string): void;
    editMessage(session: WhatsappSession, chatId: string, messageId: string, body: EditMessageRequest): void;
    archiveChat(session: WhatsappSession, chatId: string): Promise<any>;
    unarchiveChat(session: WhatsappSession, chatId: string): Promise<any>;
    unreadChat(session: WhatsappSession, chatId: string): Promise<any>;
}
export { ChatsController };
