"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxContactInfo = void 0;
const const_1 = require("../const");
const templates_1 = require("../i18n/templates");
class InboxContactInfo {
    constructor(l) {
        this.l = l;
    }
    ChatId() {
        return const_1.INBOX_CONTACT_CHAT_ID;
    }
    async AvatarUrl() {
        return this.l.key(templates_1.TKey.APP_INBOX_CONTACT_AVATAR_URL).render();
    }
    async Attributes() {
        return {
            [const_1.AttributeKey.WA_CHAT_ID]: const_1.INBOX_CONTACT_CHAT_ID,
        };
    }
    async PublicContactCreate() {
        return {
            identifier: const_1.INBOX_CONTACT_CHAT_ID,
            name: this.l.key(templates_1.TKey.APP_INBOX_CONTACT_NAME).render(),
            avatar_url: await this.AvatarUrl(),
            custom_attributes: await this.Attributes(),
        };
    }
}
exports.InboxContactInfo = InboxContactInfo;
//# sourceMappingURL=InboxContactInfo.js.map