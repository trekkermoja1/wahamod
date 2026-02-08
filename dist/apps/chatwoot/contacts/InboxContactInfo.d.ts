import { public_contact_create_update_payload } from '@figuro/chatwoot-sdk';
import { ContactInfo } from '@waha/apps/chatwoot/client/ContactConversationService';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export declare class InboxContactInfo implements ContactInfo {
    private l;
    constructor(l: Locale);
    ChatId(): string;
    AvatarUrl(): Promise<string>;
    Attributes(): Promise<any>;
    PublicContactCreate(): Promise<public_contact_create_update_payload>;
}
