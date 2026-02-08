import ChatwootClient, { public_contact_create_update_payload } from '@figuro/chatwoot-sdk';
import type { contact } from '@figuro/chatwoot-sdk/dist/models/contact';
import type { generic_id } from '@figuro/chatwoot-sdk/dist/models/generic_id';
import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ChatWootAPIConfig, ChatWootInboxAPI } from '@waha/apps/chatwoot/client/interfaces';
import { ContactInfo } from '@waha/apps/chatwoot/client/ContactConversationService';
export interface ContactResponse {
    data: generic_id & contact;
    sourceId: string;
}
export declare enum AvatarUpdateMode {
    IF_MISSING = 0,
    ALWAYS = 1
}
export declare function sanitizeName(name: string): string;
export declare class ContactService {
    private config;
    private accountAPI;
    protected inboxAPI: ChatWootInboxAPI;
    private logger;
    constructor(config: ChatWootAPIConfig, accountAPI: ChatwootClient, inboxAPI: ChatWootInboxAPI, logger: ILogger);
    findOrCreateContact(contactInfo: ContactInfo): Promise<[ContactResponse, boolean]>;
    searchByAnyID(chatId: string): Promise<ContactResponse | null>;
    upsertCustomAttributes(contact: generic_id & contact, attributes: any): Promise<boolean>;
    create(chatId: string, payload: public_contact_create_update_payload): Promise<ContactResponse>;
    updateAvatar(contact: ContactResponse, contactInfo: ContactInfo, mode: AvatarUpdateMode): Promise<boolean>;
    updateAvatarUrlSafe(contactId: any, avatarUrl: string): Promise<boolean>;
}
