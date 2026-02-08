import { ChatWootAPIConfig } from '@waha/apps/chatwoot/client/interfaces';
import { ConversationSort } from '@waha/apps/chatwoot/services/ConversationSelector';
import { ConversationStatus } from '@waha/apps/chatwoot/client/types';
export declare const DEFAULT_LOCALE = "en-US";
export declare class ChatWootCommandsConfig {
    server: boolean;
    queue?: boolean;
}
export declare enum LinkPreview {
    OFF = "OFF",
    LQ = "LG",
    HQ = "HG"
}
export declare class ChatWootConversationsConfig {
    sort: ConversationSort;
    status: Array<ConversationStatus> | null;
    markAsRead?: boolean;
}
export interface ChatWootConfig {
    templates: Record<string, string>;
    linkPreview: LinkPreview;
    commands: ChatWootCommandsConfig;
    conversations: ChatWootConversationsConfig;
}
export declare class ChatWootAppConfig implements ChatWootAPIConfig {
    url: string;
    accountId: number;
    accountToken: string;
    inboxId: number;
    inboxIdentifier: string;
    linkPreview?: LinkPreview;
    locale: string;
    templates?: Record<string, string>;
    commands?: ChatWootCommandsConfig;
    conversations?: ChatWootConversationsConfig;
}
