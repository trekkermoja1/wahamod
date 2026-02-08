import type { WAMessageKey } from '@adiwajshing/baileys';
import { GetChatMessagesFilter, GetChatMessagesQuery, ReadChatMessagesQuery } from '@waha/structures/chats.dto';
import { SendSeenRequest } from '@waha/structures/chatting.dto';
export declare function ExtractMessageKeysForRead(request: SendSeenRequest): WAMessageKey[];
export declare function MessagesForRead(chatId: string, request: ReadChatMessagesQuery): {
    query: GetChatMessagesQuery;
    filter: GetChatMessagesFilter;
};
