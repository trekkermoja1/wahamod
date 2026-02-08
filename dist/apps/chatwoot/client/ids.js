"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetJID = GetJID;
exports.GetLID = GetLID;
exports.GetChatID = GetChatID;
exports.GetAllChatIDs = GetAllChatIDs;
exports.FindChatID = FindChatID;
exports.SerializeWhatsAppKey = SerializeWhatsAppKey;
exports.ContactAttr = ContactAttr;
exports.IsCommandsChat = IsCommandsChat;
const const_1 = require("../const");
const lodash = require("lodash");
const session_noweb_core_1 = require("../../../core/engines/noweb/session.noweb.core");
const jids_1 = require("../../../core/utils/jids");
function GetJID(contact) {
    var _a;
    return (_a = contact === null || contact === void 0 ? void 0 : contact.custom_attributes) === null || _a === void 0 ? void 0 : _a[const_1.AttributeKey.WA_JID];
}
function GetLID(contact) {
    var _a;
    return (_a = contact === null || contact === void 0 ? void 0 : contact.custom_attributes) === null || _a === void 0 ? void 0 : _a[const_1.AttributeKey.WA_LID];
}
function GetChatID(contact) {
    var _a;
    return (_a = contact === null || contact === void 0 ? void 0 : contact.custom_attributes) === null || _a === void 0 ? void 0 : _a[const_1.AttributeKey.WA_CHAT_ID];
}
function GetAllChatIDs(contact) {
    const attrs = (contact === null || contact === void 0 ? void 0 : contact.custom_attributes) || {};
    const ids = [
        attrs[const_1.AttributeKey.WA_CHAT_ID],
        attrs[const_1.AttributeKey.WA_JID],
        attrs[const_1.AttributeKey.WA_LID],
    ];
    return lodash.uniq(ids.filter(Boolean));
}
function FindChatID(contact) {
    if (GetJID(contact)) {
        return GetJID(contact);
    }
    if (GetLID(contact)) {
        return GetLID(contact);
    }
    if (GetChatID(contact)) {
        return GetChatID(contact);
    }
    return null;
}
function SerializeWhatsAppKey(message) {
    const key = {
        id: message.message_id,
        remoteJid: message.chat_id,
        fromMe: Boolean(message.from_me),
        participant: message.participant,
    };
    return (0, session_noweb_core_1.buildMessageId)(key);
}
function ContactAttr(chatId) {
    if ((0, jids_1.isLidUser)(chatId)) {
        return const_1.AttributeKey.WA_LID;
    }
    else {
        return const_1.AttributeKey.WA_JID;
    }
}
function IsCommandsChat(body) {
    var _a, _b;
    const sender = (_b = (_a = body === null || body === void 0 ? void 0 : body.conversation) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.sender;
    const chatId = FindChatID(sender);
    return chatId === const_1.INBOX_CONTACT_CHAT_ID;
}
//# sourceMappingURL=ids.js.map