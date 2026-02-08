"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEditedMessage = IsEditedMessage;
exports.IsHistorySyncNotification = IsHistorySyncNotification;
const baileys_1 = require("@adiwajshing/baileys");
function IsEditedMessage(message) {
    var _a, _b;
    message = (0, baileys_1.normalizeMessageContent)(message);
    if (!message) {
        return false;
    }
    if (((_a = message === null || message === void 0 ? void 0 : message.protocolMessage) === null || _a === void 0 ? void 0 : _a.type) !==
        baileys_1.proto.Message.ProtocolMessage.Type.MESSAGE_EDIT) {
        return false;
    }
    if (((_b = message === null || message === void 0 ? void 0 : message.protocolMessage) === null || _b === void 0 ? void 0 : _b.editedMessage) == null) {
        return false;
    }
    return true;
}
function IsHistorySyncNotification(message) {
    var _a, _b;
    message = (0, baileys_1.normalizeMessageContent)(message);
    if (!message) {
        return false;
    }
    if (((_a = message === null || message === void 0 ? void 0 : message.protocolMessage) === null || _a === void 0 ? void 0 : _a.type) !==
        baileys_1.proto.Message.ProtocolMessage.Type.HISTORY_SYNC_NOTIFICATION) {
        return false;
    }
    if (((_b = message === null || message === void 0 ? void 0 : message.protocolMessage) === null || _b === void 0 ? void 0 : _b.historySyncNotification) == null) {
        return false;
    }
    return true;
}
//# sourceMappingURL=pwa.js.map