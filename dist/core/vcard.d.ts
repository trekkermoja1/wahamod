import { Contact, VCardContact } from '@waha/structures/chatting.dto';
export declare function toVcardV3(data: Contact | VCardContact): string;
export interface SimpleVCardInfo {
    fullName: string;
    phoneNumbers: string[];
}
export declare function parseVCardV3(vcardText: string): SimpleVCardInfo;
