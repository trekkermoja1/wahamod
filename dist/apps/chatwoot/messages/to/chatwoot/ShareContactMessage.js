"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareContactMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const vcard_1 = require("../../../../../core/vcard");
const lodash = require("lodash");
class ShareContactMessage {
    constructor(locale, logger) {
        this.locale = locale;
        this.logger = logger;
    }
    convert(payload, protoMessage) {
        void payload;
        const vcards = collectVcards(protoMessage);
        if (vcards.length === 0) {
            return null;
        }
        const attachments = vcards.map((vcard, index) => ({
            content: Buffer.from(vcard, 'utf8').toString('base64'),
            encoding: 'base64',
            filename: `vcard-${index + 1}.vcf`,
        }));
        let contacts = [];
        try {
            contacts = vcards.map(vcard_1.parseVCardV3);
        }
        catch (err) {
            this.logger.error(`Error parsing some vcards: vcards=${vcards}, err=${err}`);
        }
        if (contacts.length === 0 && attachments.length === 0) {
            return null;
        }
        const content = this.locale
            .key(templates_1.TKey.WA_TO_CW_MESSAGE_CONTACTS)
            .r({ contacts });
        return {
            content,
            attachments,
            private: undefined,
        };
    }
}
exports.ShareContactMessage = ShareContactMessage;
function collectVcards(message) {
    var _a, _b;
    if (lodash.isEmpty((_a = message === null || message === void 0 ? void 0 : message.contactsArrayMessage) === null || _a === void 0 ? void 0 : _a.contacts)) {
        if (!lodash.isEmpty((_b = message === null || message === void 0 ? void 0 : message.contactMessage) === null || _b === void 0 ? void 0 : _b.vcard)) {
            return [message.contactMessage.vcard];
        }
        return [];
    }
    return message.contactsArrayMessage.contacts.map((contact) => contact.vcard);
}
//# sourceMappingURL=ShareContactMessage.js.map