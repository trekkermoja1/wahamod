import { WebJSPresence } from '@waha/core/engines/webjs/types';
import { GetChatMessagesFilter } from '@waha/structures/chats.dto';
import { Label } from '@waha/structures/labels.dto';
import { LidToPhoneNumber } from '@waha/structures/lids.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';
import { TextStatus } from '@waha/structures/status.dto';
import { EventEmitter } from 'events';
import { Client } from 'whatsapp-web.js';
export declare class WebjsClientCore extends Client {
    protected tags: boolean;
    events: EventEmitter<[never]>;
    private wpage;
    constructor(options: any, tags: boolean);
    initialize(): Promise<void>;
    injectWaha(): Promise<void>;
    hideUXFreshLook(): Promise<boolean>;
    attachCustomEventListeners(): Promise<void>;
    attachTagsEvents(): Promise<void>;
    destroy(): Promise<void>;
    setPushName(name: string): Promise<void>;
    unpair(): Promise<void>;
    createLabel(name: string, color: number): Promise<number>;
    deleteLabel(label: Label): Promise<any>;
    updateLabel(label: Label): Promise<any>;
    getChats(pagination?: PaginationParams, filter?: {
        ids?: string[];
    }): Promise<any>;
    sendTextStatus(status: TextStatus): Promise<any>;
    getMessages(chatId: string, filter: GetChatMessagesFilter, pagination: PaginationParams): Promise<any>;
    getAllLids(pagination: PaginationParams): Promise<Array<LidToPhoneNumber>>;
    getLidsCount(): Promise<number>;
    findPNByLid(lid: string): Promise<string>;
    findLIDByPhoneNumber(phoneNumber: string): Promise<string>;
    subscribePresence(chatId: string): Promise<void>;
    private getCurrentPresence;
    getPresence(chatId: string): Promise<WebJSPresence[]>;
}
