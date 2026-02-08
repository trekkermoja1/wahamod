"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = exports.AvatarUpdateMode = void 0;
exports.sanitizeName = sanitizeName;
const wa_1 = require("../../../utils/wa");
const lodash = require("lodash");
const const_1 = require("../const");
const PhoneJidNormalizer_1 = require("../../../core/utils/PhoneJidNormalizer");
var AvatarUpdateMode;
(function (AvatarUpdateMode) {
    AvatarUpdateMode[AvatarUpdateMode["IF_MISSING"] = 0] = "IF_MISSING";
    AvatarUpdateMode[AvatarUpdateMode["ALWAYS"] = 1] = "ALWAYS";
})(AvatarUpdateMode || (exports.AvatarUpdateMode = AvatarUpdateMode = {}));
function sanitizeName(name) {
    const limit = 255;
    if (!name) {
        return name;
    }
    if (name.length < limit) {
        return name;
    }
    const clean = name.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '');
    return clean.slice(0, 255).trim();
}
class ContactService {
    constructor(config, accountAPI, inboxAPI, logger) {
        this.config = config;
        this.accountAPI = accountAPI;
        this.inboxAPI = inboxAPI;
        this.logger = logger;
    }
    async findOrCreateContact(contactInfo) {
        const chatId = contactInfo.ChatId();
        let contact = await this.searchByAnyID(chatId);
        if (contact) {
            return [contact, false];
        }
        const request = await contactInfo.PublicContactCreate();
        contact = await this.create(chatId, request);
        return [contact, true];
    }
    async searchByAnyID(chatId) {
        const payload = [
            {
                attribute_key: const_1.AttributeKey.WA_CHAT_ID,
                filter_operator: 'equal_to',
                values: [chatId],
                attribute_model: 'standard',
                custom_attribute_type: '',
                query_operator: 'OR',
            },
            {
                attribute_key: const_1.AttributeKey.WA_JID,
                filter_operator: 'equal_to',
                values: [chatId],
                attribute_model: 'standard',
                custom_attribute_type: '',
                query_operator: 'OR',
            },
            {
                attribute_key: const_1.AttributeKey.WA_LID,
                filter_operator: 'equal_to',
                values: [chatId],
                attribute_model: 'standard',
                custom_attribute_type: '',
                query_operator: 'OR',
            },
            {
                attribute_key: 'identifier',
                filter_operator: 'equal_to',
                values: [chatId],
                attribute_model: 'standard',
                custom_attribute_type: '',
            },
        ];
        if ((0, wa_1.isJidCusFormat)(chatId)) {
            const phoneNumberE164 = PhoneJidNormalizer_1.E164Parser.fromJid(chatId);
            const phone_number = phoneNumberE164.replace('+', '');
            payload[payload.length - 1].query_operator = 'OR';
            payload.push({
                attribute_key: 'phone_number',
                filter_operator: 'equal_to',
                values: [phone_number],
            });
        }
        const response = await this.accountAPI.contacts.filter({
            accountId: this.config.accountId,
            payload: payload,
        });
        const contacts = response.payload;
        if (contacts.length == 0) {
            return null;
        }
        const contact = contacts[0];
        const inboxes = lodash.filter(contact.contact_inboxes, {
            inbox: { id: this.config.inboxId },
        });
        if (inboxes.length == 0) {
            return null;
        }
        return {
            data: contact,
            sourceId: inboxes[0].source_id,
        };
    }
    async upsertCustomAttributes(contact, attributes) {
        if (lodash.isEqual(attributes, contact.custom_attributes)) {
            return false;
        }
        const update = {
            custom_attributes: Object.assign(Object.assign({}, contact.custom_attributes), attributes),
        };
        await this.accountAPI.contacts.update({
            id: contact.id,
            accountId: this.config.accountId,
            data: update,
        });
        return true;
    }
    async create(chatId, payload) {
        payload.name = sanitizeName(payload.name);
        const contact = await this.inboxAPI.contacts.create({
            inboxIdentifier: this.config.inboxIdentifier,
            data: payload,
        });
        this.logger.info(`Created contact for chat.id: ${chatId}, contact.id: ${contact.source_id}`);
        const response = await this.accountAPI.contacts.get({
            accountId: this.config.accountId,
            id: contact.id,
        });
        return {
            data: response.payload,
            sourceId: contact.source_id,
        };
    }
    async updateAvatar(contact, contactInfo, mode) {
        if (contact.data.thumbnail && mode == AvatarUpdateMode.IF_MISSING) {
            return false;
        }
        const chatId = contactInfo.ChatId();
        const avatarUrl = await contactInfo.AvatarUrl().catch((err) => {
            this.logger.warn(`Error getting avatar for chat.id from WhatsApp: ${chatId}`);
            this.logger.warn(err);
            return null;
        });
        if (!avatarUrl) {
            return false;
        }
        const success = await this.updateAvatarUrlSafe(contact.data.id, avatarUrl);
        return success;
    }
    updateAvatarUrlSafe(contactId, avatarUrl) {
        return this.accountAPI.contacts
            .update({
            accountId: this.config.accountId,
            id: contactId,
            data: {
                avatar_url: avatarUrl,
            },
        })
            .then(() => {
            return true;
        })
            .catch((e) => {
            this.logger.warn(`Error updating avatar_url for contact.id: ${contactId}`);
            this.logger.warn(e);
            return true;
        });
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=ContactService.js.map