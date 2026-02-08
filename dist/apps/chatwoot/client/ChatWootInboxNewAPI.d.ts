export declare class ChatWootInboxNewAPI {
    private base;
    private inboxIdentifier;
    constructor(base: string, inboxIdentifier: string);
    updateLastSeen(sourceId: string, conversationId: number): Promise<void>;
}
