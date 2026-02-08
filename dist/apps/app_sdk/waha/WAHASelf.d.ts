import { Channel } from '@waha/structures/channels.dto';
import { GetChatMessagesFilter, GetChatMessagesQuery } from '@waha/structures/chats.dto';
import { ChatRequest, MessageFileRequest, MessageImageRequest, MessageTextRequest, MessageVideoRequest, MessageVoiceRequest, WANumberExistResult } from '@waha/structures/chatting.dto';
import { SessionInfo } from '@waha/structures/sessions.dto';
import { AxiosInstance } from 'axios';
import { PaginationParams } from '@waha/structures/pagination.dto';
export interface RequestOptions {
    signal?: AbortSignal;
}
export declare class WAHASelf {
    client: AxiosInstance;
    constructor();
    fetch(url: string, opts?: RequestOptions): Promise<Buffer>;
    qr(session: string, opts?: RequestOptions): Promise<Buffer>;
    screenshot(session: string, opts?: RequestOptions): Promise<Buffer>;
    restart(session: string, opts?: RequestOptions): Promise<any>;
    logout(session: string, opts?: RequestOptions): Promise<any>;
    stop(session: string, opts?: RequestOptions): Promise<any>;
    get(session: string, opts?: RequestOptions): Promise<SessionInfo>;
    getChats(session: string, page: PaginationParams, opts?: RequestOptions): Promise<any>;
    getContacts(session: string, page: PaginationParams, opts?: RequestOptions): Promise<any>;
    getContact(session: string, contactId: string, opts?: RequestOptions): Promise<any>;
    contactCheckExists(session: string, phone: string, opts?: RequestOptions): Promise<WANumberExistResult>;
    getGroup(session: string, groupId: string, opts?: RequestOptions): Promise<any>;
    getChannel(session: string, channelId: string, opts?: RequestOptions): Promise<Channel>;
    getChatPicture(session: string, chatId: string, opts?: RequestOptions): Promise<string | null>;
    sendText(body: MessageTextRequest, opts?: RequestOptions): Promise<any>;
    sendImage(body: MessageImageRequest, opts?: RequestOptions): Promise<any>;
    sendVideo(body: MessageVideoRequest, opts?: RequestOptions): Promise<any>;
    sendVoice(body: MessageVoiceRequest, opts?: RequestOptions): Promise<any>;
    sendFile(body: MessageFileRequest, opts?: RequestOptions): Promise<any>;
    deleteMessage(session: string, chatId: string, messageId: string, opts?: RequestOptions): Promise<any>;
    startTyping(body: ChatRequest, opts?: RequestOptions): Promise<any>;
    stopTyping(body: ChatRequest, opts?: RequestOptions): Promise<import("axios").AxiosResponse<any, any>>;
    readMessages(session: string, chatId: string, opts?: RequestOptions): Promise<any>;
    getMessages(session: string, chatId: string, query: GetChatMessagesQuery, filter: GetChatMessagesFilter, opts?: RequestOptions): Promise<any>;
    getMessageById(session: string, chatId: string, messageId: string, media: boolean, opts?: RequestOptions): Promise<any>;
    findPNByLid(session: string, lid: string, opts?: RequestOptions): Promise<string | null>;
    findLIDByPN(session: string, pn: string, opts?: RequestOptions): Promise<string | null>;
    serverVersion(opts?: RequestOptions): Promise<any>;
    serverStatus(opts?: RequestOptions): Promise<any>;
    serverReboot(force?: boolean, opts?: RequestOptions): Promise<any>;
}
export declare class WAHASessionAPI {
    private session;
    private api;
    constructor(session: string, api: WAHASelf);
    getChats(page: PaginationParams, opts?: RequestOptions): Promise<any>;
    getContacts(page: PaginationParams, opts?: RequestOptions): Promise<any>;
    getContact(contactId: string, opts?: RequestOptions): Promise<any>;
    contactCheckExists(phone: string, opts?: RequestOptions): Promise<WANumberExistResult>;
    getGroup(groupId: string, opts?: RequestOptions): Promise<any>;
    getChannel(channelId: string, opts?: RequestOptions): Promise<Channel>;
    getChatPicture(chatId: string, opts?: RequestOptions): Promise<string | null>;
    sendText(body: MessageTextRequest, opts?: RequestOptions): Promise<any>;
    sendImage(body: MessageImageRequest, opts?: RequestOptions): Promise<any>;
    sendVideo(body: MessageVideoRequest, opts?: RequestOptions): Promise<any>;
    sendVoice(body: MessageVoiceRequest, opts?: RequestOptions): Promise<any>;
    sendFile(body: MessageFileRequest, opts?: RequestOptions): Promise<any>;
    deleteMessage(chatId: string, messageId: string, opts?: RequestOptions): Promise<any>;
    startTyping(body: ChatRequest, opts?: RequestOptions): Promise<any>;
    stopTyping(body: ChatRequest, opts?: RequestOptions): Promise<import("axios").AxiosResponse<any, any>>;
    readMessages(chatId: string, opts?: RequestOptions): Promise<any>;
    getMessages(chatId: string, query: GetChatMessagesQuery, filter: GetChatMessagesFilter, opts?: RequestOptions): Promise<any>;
    getMessageById(chatId: string, messageId: string, media: boolean, opts?: RequestOptions): Promise<any>;
    findPNByLid(lid: string, opts?: RequestOptions): Promise<string>;
    findLIDByPN(pn: string, opts?: RequestOptions): Promise<string>;
}
