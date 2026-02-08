"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = exports.ChatPresenceMedia = exports.ChatPresenceState = void 0;
var ChatPresenceState;
(function (ChatPresenceState) {
    ChatPresenceState["COMPOSING"] = "composing";
    ChatPresenceState["PAUSED"] = "paused";
})(ChatPresenceState || (exports.ChatPresenceState = ChatPresenceState = {}));
var ChatPresenceMedia;
(function (ChatPresenceMedia) {
    ChatPresenceMedia["TEXT"] = "";
    ChatPresenceMedia["AUDIO"] = "audio";
})(ChatPresenceMedia || (exports.ChatPresenceMedia = ChatPresenceMedia = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["Error"] = 0] = "Error";
    MessageStatus[MessageStatus["Pending"] = 1] = "Pending";
    MessageStatus[MessageStatus["ServerAck"] = 2] = "ServerAck";
    MessageStatus[MessageStatus["DeliveryAck"] = 3] = "DeliveryAck";
    MessageStatus[MessageStatus["Read"] = 4] = "Read";
    MessageStatus[MessageStatus["Played"] = 5] = "Played";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
//# sourceMappingURL=types.js.map