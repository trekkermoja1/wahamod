"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INBOX_CONTACT_CHAT_ID = exports.CHATWOOT_CUSTOM_ATTRIBUTES = exports.AttributeKey = void 0;
const types_1 = require("./client/types");
var AttributeKey;
(function (AttributeKey) {
    AttributeKey["WA_CHAT_ID"] = "waha_whatsapp_chat_id";
    AttributeKey["WA_JID"] = "waha_whatsapp_jid";
    AttributeKey["WA_LID"] = "waha_whatsapp_lid";
})(AttributeKey || (exports.AttributeKey = AttributeKey = {}));
exports.CHATWOOT_CUSTOM_ATTRIBUTES = [
    {
        key: AttributeKey.WA_CHAT_ID,
        name: 'WhatsApp Chat ID',
        description: 'WhatsApp Chat ID',
        type: types_1.CustomAttributeType.TEXT,
        model: types_1.CustomAttributeModel.CONTACT,
    },
    {
        key: AttributeKey.WA_JID,
        name: 'WhatsApp JID',
        description: 'WhatsApp Phone Number ID',
        type: types_1.CustomAttributeType.TEXT,
        model: types_1.CustomAttributeModel.CONTACT,
    },
    {
        key: AttributeKey.WA_LID,
        name: 'WhatsApp LID',
        description: 'WhatsApp Linked ID (Anonymous ID)',
        type: types_1.CustomAttributeType.TEXT,
        model: types_1.CustomAttributeModel.CONTACT,
    },
];
exports.INBOX_CONTACT_CHAT_ID = 'whatsapp.integration';
//# sourceMappingURL=const.js.map