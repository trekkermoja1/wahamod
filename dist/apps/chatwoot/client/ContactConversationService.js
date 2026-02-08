"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactConversationService = void 0;
const chatwoot_sdk_1 = require("@figuro/chatwoot-sdk");
const ContactService_1 = require("./ContactService");
const Conversation_1 = require("./Conversation");
const InboxContactInfo_1 = require("../contacts/InboxContactInfo");
const ConversationCache_1 = require("../cache/ConversationCache");
class ContactConversationService {
    constructor(config, contactService, conversationService, accountAPI, logger, l) {
        this.config = config;
        this.contactService = contactService;
        this.conversationService = conversationService;
        this.accountAPI = accountAPI;
        this.logger = logger;
        this.l = l;
        this.cache = (0, ConversationCache_1.CacheForConfig)(config);
    }
    async getByContactInfo(contactInfo, upsert) {
        const chatId = contactInfo.ChatId();
        if (this.cache.has(chatId)) {
            return this.cache.get(chatId);
        }
        let [cwContact, created] = await this.contactService.findOrCreateContact(contactInfo);
        this.logger.debug(`Updating if required contact custom attributes for chat.id: ${chatId}, contact.id: ${cwContact.data.id}`);
        const attributes = await contactInfo.Attributes();
        await this.contactService.upsertCustomAttributes(cwContact.data, attributes);
        await this.contactService.updateAvatar(cwContact, contactInfo, ContactService_1.AvatarUpdateMode.IF_MISSING);
        this.logger.debug(`Using contact for chat.id: ${chatId}, contact.id: ${cwContact.data.id}, contact.sourceId: ${cwContact.sourceId}`);
        const contactIds = {
            id: cwContact.data.id,
            sourceId: cwContact.sourceId,
        };
        let conversation;
        if (upsert) {
            conversation = await this.conversationService.upsert(contactIds);
        }
        else {
            conversation = await this.conversationService.find(contactIds);
            if (!conversation) {
                return null;
            }
        }
        this.logger.debug(`Using conversation for chat.id: ${chatId}, conversation.id: ${conversation.id}, contact.id: ${cwContact.sourceId}`);
        const ids = {
            id: conversation.id,
            sourceId: cwContact.sourceId,
        };
        this.cache.set(chatId, ids);
        return ids;
    }
    async conversationByContact(contactInfo, upsert) {
        const chatId = contactInfo.ChatId();
        const ids = await this.getByContactInfo(contactInfo, upsert);
        if (!ids) {
            return null;
        }
        const conversation = new Conversation_1.Conversation(this.accountAPI, this.config.accountId, ids.id, ids.sourceId);
        conversation.onError = (err) => {
            if (err instanceof chatwoot_sdk_1.ApiError) {
                this.cache.delete(chatId);
                this.logger.error(`ApiError: ${err.message}`);
                this.logger.error(`ApiError occurred, invalidating cache for chat.id: ${chatId}, conversation.id: ${ids.id}, source.id: ${ids.sourceId}`);
            }
        };
        return conversation;
    }
    async ConversationByContact(contactInfo) {
        const conversation = await this.conversationByContact(contactInfo, true);
        if (!conversation) {
            throw new Error('Conversation could not be created or found');
        }
        return conversation;
    }
    async FindConversationByContact(contactInfo) {
        return this.conversationByContact(contactInfo, false);
    }
    ConversationById(conversationId) {
        return new Conversation_1.Conversation(this.accountAPI, this.config.accountId, conversationId);
    }
    async InboxNotifications() {
        return this.ConversationByContact(new InboxContactInfo_1.InboxContactInfo(this.l));
    }
    ResetCache(chatIds) {
        this.logger.debug(`Resetting cache chat ids: ${chatIds.join(', ')}`);
        for (const chatId of chatIds) {
            this.cache.delete(chatId);
        }
    }
    ResetMismatchedCache(chatIds, contactId) {
        for (const chatId of chatIds) {
            if (!this.cache.has(chatId)) {
                continue;
            }
            const current = this.cache.get(chatId);
            if (current.id !== contactId) {
                this.logger.debug(`Resetting cache for chat id: ${chatId}, value changed from ${current} to ${contactId}`);
                this.cache.delete(chatId);
            }
        }
    }
    async markConversationAsRead(conversationId, sourceId) {
        await this.conversationService.markAsRead(conversationId, sourceId);
    }
}
exports.ContactConversationService = ContactConversationService;
//# sourceMappingURL=ContactConversationService.js.map