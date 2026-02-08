import ChatwootClient, { public_contact_create_update_payload } from '@figuro/chatwoot-sdk';
import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ContactService } from '@waha/apps/chatwoot/client/ContactService';
import { Conversation } from '@waha/apps/chatwoot/client/Conversation';
import { ConversationService } from '@waha/apps/chatwoot/client/ConversationService';
import { ChatWootAPIConfig } from '@waha/apps/chatwoot/client/interfaces';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export interface ContactInfo {
    ChatId(): string;
    AvatarUrl(): Promise<string | null>;
    Attributes(): Promise<any>;
    PublicContactCreate(): Promise<public_contact_create_update_payload>;
}
export declare class ContactConversationService {
    private config;
    private contactService;
    private conversationService;
    private accountAPI;
    private logger;
    private l;
    private cache;
    constructor(config: ChatWootAPIConfig, contactService: ContactService, conversationService: ConversationService, accountAPI: ChatwootClient, logger: ILogger, l: Locale);
    private getByContactInfo;
    private conversationByContact;
    ConversationByContact(contactInfo: ContactInfo): Promise<Conversation>;
    FindConversationByContact(contactInfo: ContactInfo): Promise<Conversation>;
    ConversationById(conversationId: number): Conversation;
    InboxNotifications(): Promise<Conversation>;
    ResetCache(chatIds: Array<string>): void;
    ResetMismatchedCache(chatIds: Array<string>, contactId: number): void;
    markConversationAsRead(conversationId: number, sourceId: string): Promise<void>;
}
