import type { Chat, Contact, GroupMetadata, proto } from '@adiwajshing/baileys';
import type { Label } from '@adiwajshing/baileys/lib/Types/Label';
import { GetChatMessagesFilter } from '@waha/structures/chats.dto';
import { LidToPhoneNumber } from '@waha/structures/lids.dto';
import { LimitOffsetParams, PaginationParams } from '@waha/structures/pagination.dto';
import { INowebStore } from './INowebStore';
export declare class NowebInMemoryStore implements INowebStore {
    private socket;
    private store;
    errorMessage: string;
    constructor();
    init(): Promise<void>;
    close(): Promise<void>;
    get presences(): {
        [id: string]: {
            [participant: string]: import("@adiwajshing/baileys").PresenceData;
        };
    };
    bind(ev: any, socket: any): void;
    loadMessage(jid: string, id: string): Promise<proto.IWebMessageInfo>;
    getMessagesByJid(chatId: string, filter: GetChatMessagesFilter, pagination: PaginationParams): Promise<any>;
    getMessageById(chatId: string, messageId: string): Promise<any>;
    getChats(pagination: PaginationParams, broadcast: boolean): Promise<Chat[]>;
    getChat(jid: string): Promise<Chat | null>;
    getContacts(pagination: PaginationParams): Promise<Contact[]>;
    getContactById(jid: string): Promise<Contact>;
    getLabels(): Promise<Label[]>;
    getLabelById(labelId: string): Promise<Label | null>;
    getChatsByLabelId(labelId: string): Promise<Chat[]>;
    getChatLabels(chatId: string): Promise<Label[]>;
    getGroups(pagination: PaginationParams): Promise<GroupMetadata[]>;
    resetGroupsCache(): void;
    getAllLids(pagination?: LimitOffsetParams): Promise<LidToPhoneNumber[]>;
    findLidByPN(pn: string): Promise<string | null>;
    findPNByLid(lid: string): Promise<string | null>;
    getLidsCount(): Promise<number>;
}
