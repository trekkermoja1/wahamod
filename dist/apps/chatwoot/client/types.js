"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationStatus = exports.CustomAttributeModel = exports.CustomAttributeType = exports.MessageType = exports.EventName = void 0;
var EventName;
(function (EventName) {
    EventName["CONVERSATION_CREATED"] = "conversation_created";
    EventName["CONVERSATION_STATUS_CHANGED"] = "conversation_status_changed";
    EventName["CONVERSATION_UPDATED"] = "conversation_updated";
    EventName["CONTACT_CREATED"] = "contact_created";
    EventName["CONTACT_UPDATED"] = "contact_updated";
    EventName["MESSAGE_CREATED"] = "message_created";
    EventName["MESSAGE_UPDATED"] = "message_updated";
    EventName["WEBWIDGET_TRIGGERED"] = "webwidget_triggered";
    EventName["CONVERSATION_TYPING_ON"] = "conversation_typing_on";
    EventName["CONVERSATION_TYPING_OFF"] = "conversation_typing_off";
})(EventName || (exports.EventName = EventName = {}));
var MessageType;
(function (MessageType) {
    MessageType["OUTGOING"] = "outgoing";
    MessageType["INCOMING"] = "incoming";
    MessageType["ACTIVITY"] = "activity";
})(MessageType || (exports.MessageType = MessageType = {}));
var CustomAttributeType;
(function (CustomAttributeType) {
    CustomAttributeType[CustomAttributeType["TEXT"] = 0] = "TEXT";
    CustomAttributeType[CustomAttributeType["NUMBER"] = 1] = "NUMBER";
    CustomAttributeType[CustomAttributeType["CURRENCY"] = 2] = "CURRENCY";
    CustomAttributeType[CustomAttributeType["PERCENT"] = 3] = "PERCENT";
    CustomAttributeType[CustomAttributeType["LINK"] = 4] = "LINK";
    CustomAttributeType[CustomAttributeType["DATE"] = 5] = "DATE";
    CustomAttributeType[CustomAttributeType["LIST"] = 6] = "LIST";
    CustomAttributeType[CustomAttributeType["CHECKBOX"] = 7] = "CHECKBOX";
})(CustomAttributeType || (exports.CustomAttributeType = CustomAttributeType = {}));
var CustomAttributeModel;
(function (CustomAttributeModel) {
    CustomAttributeModel[CustomAttributeModel["CONVERSATION"] = 0] = "CONVERSATION";
    CustomAttributeModel[CustomAttributeModel["CONTACT"] = 1] = "CONTACT";
})(CustomAttributeModel || (exports.CustomAttributeModel = CustomAttributeModel = {}));
var ConversationStatus;
(function (ConversationStatus) {
    ConversationStatus["OPEN"] = "open";
    ConversationStatus["PENDING"] = "pending";
    ConversationStatus["SNOOZED"] = "snoozed";
    ConversationStatus["RESOLVED"] = "resolved";
})(ConversationStatus || (exports.ConversationStatus = ConversationStatus = {}));
//# sourceMappingURL=types.js.map