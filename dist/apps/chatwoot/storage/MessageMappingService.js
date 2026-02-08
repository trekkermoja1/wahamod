"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMappingService = void 0;
class MessageMappingService {
    constructor(knex, whatsAppMessageRepository, chatwootMessageRepository, messageMappingRepository) {
        this.knex = knex;
        this.whatsAppMessageRepository = whatsAppMessageRepository;
        this.chatwootMessageRepository = chatwootMessageRepository;
        this.messageMappingRepository = messageMappingRepository;
    }
    async cleanup(removeAfter) {
        const trx = await this.knex.transaction();
        try {
            const whatsapp = await this.whatsAppMessageRepository.deleteMessagesOlderThan(trx, removeAfter);
            const chatwoot = await this.chatwootMessageRepository.deleteMessagesOlderThan(trx, removeAfter);
            await trx.commit();
            return whatsapp + chatwoot;
        }
        finally {
            await trx.commit();
        }
    }
    async map(chatwoot, whatsapp, part) {
        const trx = await this.knex.transaction();
        try {
            const chatwootMessage = await this.chatwootMessageRepository.upsertWithTrx(trx, chatwoot);
            chatwoot.id = chatwootMessage.id;
            const whatsappMessage = await this.whatsAppMessageRepository.upsertWithTrx(trx, whatsapp);
            whatsapp.id = whatsappMessage.id;
            const mapping = await this.messageMappingRepository.upsertMappingWithTrx(trx, chatwootMessage, whatsappMessage, part !== null && part !== void 0 ? part : 1);
            return mapping;
        }
        catch (e) {
            await trx.rollback();
            throw e;
        }
        finally {
            await trx.commit();
        }
    }
    async getChatWootMessage(whatsapp) {
        const message = await this.whatsAppMessageRepository.getByMessageId(whatsapp.message_id);
        if (!message) {
            return null;
        }
        const mapping = await this.messageMappingRepository.getByWhatsAppMessageId(message.id);
        if (!mapping) {
            return null;
        }
        const chatwoot = await this.chatwootMessageRepository.getById(mapping.chatwoot_message_id);
        if (!chatwoot) {
            return null;
        }
        return chatwoot;
    }
    async getWhatsAppMessage(chatwoot) {
        const messages = await this.chatwootMessageRepository.getByCombinedKey(chatwoot);
        if (!messages) {
            return [];
        }
        const mappings = [];
        for (const message of messages) {
            const mapping = await this.messageMappingRepository.getByChatwootMessageId(message.id);
            if (mapping) {
                mappings.push(mapping);
            }
        }
        const whatsapp = [];
        for (const mapping of mappings) {
            const message = await this.whatsAppMessageRepository.getById(mapping.whatsapp_message_id);
            if (message) {
                whatsapp.push(message);
            }
        }
        return whatsapp;
    }
    async getMappingByChatwootCombinedKeyAndPart(chatwoot, part) {
        const chatwootMessages = await this.chatwootMessageRepository.getByCombinedKey(chatwoot);
        if (!chatwootMessages || chatwootMessages.length === 0) {
            return null;
        }
        for (const cw of chatwootMessages) {
            const mapping = await this.messageMappingRepository.getByChatwootMessageIdAndPart(cw.id, part);
            if (mapping) {
                return mapping;
            }
        }
        return null;
    }
}
exports.MessageMappingService = MessageMappingService;
//# sourceMappingURL=MessageMappingService.js.map