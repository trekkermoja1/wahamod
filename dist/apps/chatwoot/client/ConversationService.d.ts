import ChatwootClient from '@figuro/chatwoot-sdk';
import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ChatWootAPIConfig, ChatWootInboxAPI } from '@waha/apps/chatwoot/client/interfaces';
import type { conversation } from '@figuro/chatwoot-sdk/dist/models/conversation';
import { ConversationSelector } from '@waha/apps/chatwoot/services/ConversationSelector';
export type ConversationResult = Pick<conversation, 'id' | 'account_id'>;
export interface ContactIds {
    id: number;
    sourceId: string;
}
export declare class ConversationService {
    private config;
    private accountAPI;
    private inboxAPI;
    private selector;
    private logger;
    constructor(config: ChatWootAPIConfig, accountAPI: ChatwootClient, inboxAPI: ChatWootInboxAPI, selector: ConversationSelector, logger: ILogger);
    find(contact: ContactIds): Promise<ConversationResult | null>;
    private create;
    upsert(contact: ContactIds): Promise<ConversationResult>;
    markAsRead(conversationId: number, sourceId: string): Promise<void>;
    resolve(conversationId: number): Promise<any>;
}
