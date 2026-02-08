import { ConversationStatus } from '@waha/apps/chatwoot/client/types';
import { contact_conversations } from '@figuro/chatwoot-sdk/dist/models/contact_conversations';
import type { conversation } from '@figuro/chatwoot-sdk/dist/models/conversation';
export declare enum ConversationSort {
    activity_newest = "activity_newest",
    created_newest = "created_newest",
    created_oldest = "created_oldest",
    activity_oldest = "activity_oldest"
}
export type ConversationSelectorConfig = {
    sort: ConversationSort;
    status?: Array<ConversationStatus>;
    inboxId: number;
};
export type ConversationResult = Pick<conversation, 'id' | 'account_id'>;
export declare class ConversationSelector {
    private config;
    constructor(config: ConversationSelectorConfig);
    hasStatusFilter(): ConversationStatus[];
    select(conversations: contact_conversations): ConversationResult | null;
    private filter;
    private sort;
}
