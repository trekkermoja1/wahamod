import type { BaileysEventEmitter, Chat, ConnectionState, Contact, GroupMetadata, PresenceData, WAMessage, WAMessageCursor, WAMessageKey } from '@adiwajshing/baileys/lib/Types';
import type { Label } from '@adiwajshing/baileys/lib/Types/Label';
import type { LabelAssociation } from '@adiwajshing/baileys/lib/Types/LabelAssociation';
import type { Comparable } from '@adiwajshing/keyed-db/lib/Types';
import type { Logger } from 'pino';
import { ObjectRepository } from './object-repository';
type WASocket = ReturnType<any>;
export declare const waChatKey: (pin: boolean) => {
    key: (c: Chat) => string;
    compare: (k1: string, k2: string) => number;
};
export declare const waMessageID: (m: WAMessage) => string;
export declare const waLabelAssociationKey: Comparable<LabelAssociation, string>;
export type BaileysInMemoryStoreConfig = {
    chatKey?: Comparable<Chat, string>;
    labelAssociationKey?: Comparable<LabelAssociation, string>;
    logger: Logger;
    socket?: WASocket;
};
declare const _default: (config: BaileysInMemoryStoreConfig) => {
    chats: any;
    contacts: {
        [_: string]: Contact;
    };
    messages: {
        [_: string]: {
            array: WAMessage[];
            get: (id: string) => WAMessage;
            upsert: (item: WAMessage, mode: "append" | "prepend") => void;
            update: (item: WAMessage) => boolean;
            remove: (item: WAMessage) => boolean;
            updateAssign: (id: string, update: Partial<WAMessage>) => boolean;
            clear: () => void;
            filter: (contain: (item: WAMessage) => boolean) => void;
            toJSON: () => WAMessage[];
            fromJSON: (newItems: WAMessage[]) => void;
        };
    };
    groupMetadata: {
        [_: string]: GroupMetadata;
    };
    state: ConnectionState;
    presences: {
        [id: string]: {
            [participant: string]: PresenceData;
        };
    };
    setPresences: (obj: any) => void;
    labels: ObjectRepository<Label>;
    labelAssociations: any;
    bind: (ev: BaileysEventEmitter) => void;
    loadMessages: (jid: string, count: number, cursor: WAMessageCursor) => Promise<WAMessage[]>;
    getLabels: () => ObjectRepository<Label>;
    getChatLabels: (chatId: string) => any;
    getMessageLabels: (messageId: string) => any;
    loadMessage: (jid: string, id: string) => Promise<WAMessage>;
    mostRecentMessage: (jid: string) => Promise<WAMessage>;
    fetchImageUrl: (jid: string, sock: WASocket | undefined) => Promise<any>;
    fetchGroupMetadata: (jid: string, sock: WASocket | undefined) => Promise<GroupMetadata>;
    fetchMessageReceipts: ({ remoteJid, id }: WAMessageKey) => Promise<import("@adiwajshing/baileys/WAProto").proto.IUserReceipt[]>;
    toJSON: () => {
        chats: any;
        contacts: {
            [_: string]: Contact;
        };
        messages: {
            [_: string]: {
                array: WAMessage[];
                get: (id: string) => WAMessage;
                upsert: (item: WAMessage, mode: "append" | "prepend") => void;
                update: (item: WAMessage) => boolean;
                remove: (item: WAMessage) => boolean;
                updateAssign: (id: string, update: Partial<WAMessage>) => boolean;
                clear: () => void;
                filter: (contain: (item: WAMessage) => boolean) => void;
                toJSON: () => WAMessage[];
                fromJSON: (newItems: WAMessage[]) => void;
            };
        };
        labels: ObjectRepository<Label>;
        labelAssociations: any;
    };
    fromJSON: (json: {
        chats: Chat[];
        contacts: {
            [id: string]: Contact;
        };
        messages: {
            [id: string]: WAMessage[];
        };
        labels: {
            [labelId: string]: Label;
        };
        labelAssociations: LabelAssociation[];
    }) => void;
    writeToFile: (path: string) => void;
    readFromFile: (path: string) => void;
};
export default _default;
