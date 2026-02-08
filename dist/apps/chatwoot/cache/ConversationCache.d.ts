import { ChatWootAPIConfig } from '@waha/apps/chatwoot/client/interfaces';
import { IConversationCache } from './IConversationCache';
import { ContactIds } from '@waha/apps/chatwoot/client/ConversationService';
export declare function CacheForConfig(config: ChatWootAPIConfig): ConversationCache;
declare class ConversationCache implements IConversationCache {
    private prefix;
    constructor(prefix: string);
    private fullKey;
    delete(key: string): void;
    get(key: string): ContactIds | null;
    has(key: string): boolean;
    set(key: string, value: ContactIds): void;
    clean(): void;
}
export {};
