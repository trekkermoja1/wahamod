"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const ChatWootInboxNewAPI_1 = require("./ChatWootInboxNewAPI");
class ConversationService {
    constructor(config, accountAPI, inboxAPI, selector, logger) {
        this.config = config;
        this.accountAPI = accountAPI;
        this.inboxAPI = inboxAPI;
        this.selector = selector;
        this.logger = logger;
    }
    async find(contact) {
        const result = (await this.accountAPI.contacts.listConversations({
            accountId: this.config.accountId,
            id: contact.id,
        }));
        const conversations = result.payload;
        const conversation = this.selector.select(conversations);
        if (conversation) {
            this.logger.debug(`Found existing conversation.id: ${conversation.id} for contact.id: ${contact.id}, contact.sourceId: ${contact.sourceId}`);
        }
        return conversation;
    }
    async create(contact) {
        const conversation = await this.inboxAPI.conversations.create({
            inboxIdentifier: this.config.inboxIdentifier,
            contactIdentifier: contact.sourceId,
        });
        this.logger.debug(`Created conversation.id: ${conversation.id} for contact.id: ${contact.id}, contact.sourceId: ${contact.sourceId}`);
        return conversation;
    }
    async upsert(contact) {
        let conversation = await this.find(contact);
        if (!conversation) {
            conversation = await this.create(contact);
        }
        return conversation;
    }
    async markAsRead(conversationId, sourceId) {
        try {
            const inboxNewAPI = new ChatWootInboxNewAPI_1.ChatWootInboxNewAPI(this.config.url, this.config.inboxIdentifier);
            await inboxNewAPI.updateLastSeen(sourceId, conversationId);
            this.logger.info(`Marked conversation.id: ${conversationId} as read in inbox: ${this.config.inboxIdentifier} for contact: ${sourceId}`);
        }
        catch (error) {
            const reason = error instanceof Error ? error.message : String(error);
            this.logger.error(`Error marking conversation.id: ${conversationId} as read: ${reason}`);
            throw error;
        }
    }
    async resolve(conversationId) {
        return this.accountAPI.conversations.toggleStatus({
            accountId: this.config.accountId,
            conversationId: conversationId,
            data: {
                status: 'resolved',
            },
        });
    }
}
exports.ConversationService = ConversationService;
//# sourceMappingURL=ConversationService.js.map