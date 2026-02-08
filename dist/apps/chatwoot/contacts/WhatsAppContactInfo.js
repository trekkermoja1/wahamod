"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppContactInfo = WhatsAppContactInfo;
const const_1 = require("../const");
const Cache_1 = require("../../../utils/Cache");
const templates_1 = require("../i18n/templates");
const jids_1 = require("../../../core/utils/jids");
const errors_1 = require("../errors");
const PhoneJidNormalizer_1 = require("../../../core/utils/PhoneJidNormalizer");
class ChatContactInfo {
    constructor(session, chatId, locale) {
        this.session = session;
        this.chatId = chatId;
        this.locale = locale;
    }
    ChatId() {
        return this.chatId;
    }
}
class JidContactInfo extends ChatContactInfo {
    async AvatarUrl() {
        return await this.session.getChatPicture(this.chatId);
    }
    async fetchLid() {
        return await this.session.findLIDByPN(this.chatId);
    }
    async Attributes() {
        const attributes = {
            [const_1.AttributeKey.WA_CHAT_ID]: this.chatId,
            [const_1.AttributeKey.WA_JID]: this.chatId,
        };
        const lid = await this.fetchLid();
        if (lid) {
            attributes[const_1.AttributeKey.WA_LID] = lid;
        }
        return attributes;
    }
    async PublicContactCreate() {
        const contact = await this.session.getContact(this.chatId);
        const name = (contact === null || contact === void 0 ? void 0 : contact.name) || (contact === null || contact === void 0 ? void 0 : contact.pushName) || (contact === null || contact === void 0 ? void 0 : contact.pushname) || this.chatId;
        const phoneNumberE164 = PhoneJidNormalizer_1.E164Parser.fromJid(this.chatId);
        const result = {
            name: name,
            custom_attributes: {
                [const_1.AttributeKey.WA_CHAT_ID]: this.chatId,
                [const_1.AttributeKey.WA_JID]: this.chatId,
            },
            phone_number: phoneNumberE164,
        };
        result.custom_attributes = await this.Attributes();
        return result;
    }
}
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JidContactInfo.prototype, "AvatarUrl", null);
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JidContactInfo.prototype, "fetchLid", null);
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JidContactInfo.prototype, "Attributes", null);
class LidContactInfo extends ChatContactInfo {
    async jid() {
        const pn = await this.session.findPNByLid(this.chatId);
        if (!pn) {
            return null;
        }
        return new JidContactInfo(this.session, pn, this.locale);
    }
    async AvatarUrl() {
        const jid = await this.jid();
        if (jid) {
            return await jid.AvatarUrl();
        }
        return await this.session.getChatPicture(this.chatId);
    }
    async Attributes() {
        const jid = await this.jid();
        let attributes = {};
        if (jid) {
            attributes = await jid.Attributes();
        }
        attributes[const_1.AttributeKey.WA_LID] = this.chatId;
        return attributes;
    }
    async PublicContactCreate() {
        const jid = await this.jid();
        let result;
        if (jid) {
            result = await jid.PublicContactCreate();
        }
        else {
            result = {
                inbox_id: 0,
                identifier: this.chatId,
                name: this.chatId,
            };
        }
        result.custom_attributes = await this.Attributes();
        return result;
    }
}
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LidContactInfo.prototype, "jid", null);
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LidContactInfo.prototype, "Attributes", null);
class GroupContactInfo extends ChatContactInfo {
    async AvatarUrl() {
        return await this.session.getChatPicture(this.chatId);
    }
    async Attributes() {
        return {
            [const_1.AttributeKey.WA_CHAT_ID]: this.chatId,
        };
    }
    async PublicContactCreate() {
        var _a;
        let name = this.chatId;
        const group = await ((_a = this.session) === null || _a === void 0 ? void 0 : _a.getGroup(this.chatId));
        if (group) {
            name = group.subject || group.name || group.topic || name;
            name = group.Name || name;
            const suffix = this.locale
                .key(templates_1.TKey.WHATSAPP_CONTACT_GROUP_SUFFIX)
                .render();
            name = `${name} (${suffix})`;
        }
        return {
            identifier: this.chatId,
            name: name,
            custom_attributes: await this.Attributes(),
        };
    }
}
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupContactInfo.prototype, "AvatarUrl", null);
class ChannelContactInfo extends ChatContactInfo {
    async AvatarUrl() {
        return await this.session.getChatPicture(this.chatId);
    }
    async Attributes() {
        return {
            [const_1.AttributeKey.WA_CHAT_ID]: this.chatId,
        };
    }
    async PublicContactCreate() {
        let name = this.chatId;
        const channel = await this.session.getChannel(this.chatId);
        if (channel) {
            name = channel.name || name;
            const suffix = this.locale
                .key(templates_1.TKey.WHATSAPP_CONTACT_CHANNEL_SUFFIX)
                .render();
            name = `${name} (${suffix})`;
        }
        return {
            identifier: this.chatId,
            name: name,
            custom_attributes: await this.Attributes(),
        };
    }
}
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelContactInfo.prototype, "AvatarUrl", null);
class StatusContactInfo extends ChatContactInfo {
    async AvatarUrl() {
        return null;
    }
    async Attributes() {
        return {
            [const_1.AttributeKey.WA_CHAT_ID]: this.chatId,
        };
    }
    async PublicContactCreate() {
        const name = this.locale.key(templates_1.TKey.WHATSAPP_CONTACT_STATUS_NAME).render();
        return {
            identifier: this.chatId,
            name: `🟢 ${name}`,
            custom_attributes: await this.Attributes(),
        };
    }
}
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusContactInfo.prototype, "AvatarUrl", null);
class BroadcastContactInfo extends ChatContactInfo {
    async Attributes() {
        return {
            [const_1.AttributeKey.WA_CHAT_ID]: this.chatId,
        };
    }
    async AvatarUrl() {
        return null;
    }
    async PublicContactCreate() {
        const name = this.locale
            .key(templates_1.TKey.WHATSAPP_CONTACT_BROADCAST_SUFFIX)
            .render();
        return {
            identifier: this.chatId,
            name: `${name} (${this.chatId})`,
            custom_attributes: await this.Attributes(),
        };
    }
}
__decorate([
    (0, Cache_1.CacheAsync)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BroadcastContactInfo.prototype, "AvatarUrl", null);
function WhatsAppContactInfo(session, chatId, locale) {
    if ((0, jids_1.isJidGroup)(chatId)) {
        return new GroupContactInfo(session, chatId, locale);
    }
    else if ((0, jids_1.isJidNewsletter)(chatId)) {
        return new ChannelContactInfo(session, chatId, locale);
    }
    else if ((0, jids_1.isJidStatusBroadcast)(chatId)) {
        return new StatusContactInfo(session, chatId, locale);
    }
    else if ((0, jids_1.isJidBroadcast)(chatId)) {
        return new BroadcastContactInfo(session, chatId, locale);
    }
    else if ((0, jids_1.isLidUser)(chatId)) {
        return new LidContactInfo(session, chatId, locale);
    }
    else if ((0, jids_1.isPnUser)(chatId)) {
        return new JidContactInfo(session, chatId, locale);
    }
    else {
        throw new errors_1.UnknownJIDFormat(chatId);
    }
}
//# sourceMappingURL=WhatsAppContactInfo.js.map