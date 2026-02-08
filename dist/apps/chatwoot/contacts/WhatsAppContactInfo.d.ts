import { ContactInfo } from '@waha/apps/chatwoot/client/ContactConversationService';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { WAHASessionAPI } from '@waha/apps/app_sdk/waha/WAHASelf';
export declare function WhatsAppContactInfo(session: WAHASessionAPI, chatId: string, locale: Locale): ContactInfo;
