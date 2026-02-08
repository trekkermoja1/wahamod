"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownJIDFormat = exports.PhoneNumberNotFoundInWhatsAppError = exports.ChatIDNotFoundForContactError = void 0;
class ChatIDNotFoundForContactError extends Error {
    constructor(sender) {
        super('Chat ID not found');
        this.sender = sender;
    }
}
exports.ChatIDNotFoundForContactError = ChatIDNotFoundForContactError;
class PhoneNumberNotFoundInWhatsAppError extends Error {
    constructor(phone) {
        super(`Phone number not found in WhatsApp: ${phone}`);
        this.phone = phone;
    }
}
exports.PhoneNumberNotFoundInWhatsAppError = PhoneNumberNotFoundInWhatsAppError;
class UnknownJIDFormat extends Error {
    constructor(jid) {
        super(`WhatsApp Chat ID is not recognized: ${jid}`);
        this.jid = jid;
    }
}
exports.UnknownJIDFormat = UnknownJIDFormat;
//# sourceMappingURL=errors.js.map