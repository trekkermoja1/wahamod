"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractVCards = extractVCards;
const lodash = require("lodash");
function extractVCards(waproto) {
    if (!waproto) {
        return null;
    }
    if (!lodash.isEmpty(waproto.contactMessage)) {
        return [waproto.contactMessage.vcard];
    }
    if (!lodash.isEmpty(waproto.contactsArrayMessage)) {
        return waproto.contactsArrayMessage.contacts.map((contact) => contact.vcard);
    }
    return null;
}
//# sourceMappingURL=vcards.js.map