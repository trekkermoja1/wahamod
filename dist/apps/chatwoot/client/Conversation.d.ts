import ChatwootClient from '@figuro/chatwoot-sdk';
import type { conversation_message_create } from '@figuro/chatwoot-sdk/dist/models/conversation_message_create';
export declare class Conversation {
    private accountAPI;
    private accountId;
    conversationId: number;
    sourceId: string | null;
    onError: (e: any) => void;
    overrideIncoming: any;
    constructor(accountAPI: ChatwootClient, accountId: number, conversationId: number, sourceId?: string | null);
    send(data: conversation_message_create): Promise<import("@figuro/chatwoot-sdk").generic_id & import("@figuro/chatwoot-sdk").message>;
    incoming(text: string): Promise<import("@figuro/chatwoot-sdk").generic_id & import("@figuro/chatwoot-sdk").message>;
    activity(text: string): Promise<import("@figuro/chatwoot-sdk").generic_id & import("@figuro/chatwoot-sdk").message>;
    note(text: string): Promise<import("@figuro/chatwoot-sdk").generic_id & import("@figuro/chatwoot-sdk").message>;
    forceNote(): void;
}
