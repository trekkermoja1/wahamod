import { WhatsAppMessage } from '@waha/apps/chatwoot/storage';
import { WAMessage } from '@waha/structures/responses.dto';
import { CallData } from '@waha/structures/calls.dto';
interface IEngineHelper {
    ChatID(message: WAMessage | any): string;
    CallChatID(call: CallData | any): string;
    WhatsAppMessageKeys(message: any): WhatsAppMessage;
    IterateMessages<T extends {
        timestamp: number;
    }>(messages: AsyncGenerator<T>): AsyncGenerator<T>;
    ContactIsMy(contact: any): any;
    FilterChatIdsForMessages(chats: string[]): string[];
    SupportsAllChatForMessage(): boolean;
}
export declare const EngineHelper: IEngineHelper;
export {};
