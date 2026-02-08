"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventToLabelDTO = eventToLabelDTO;
exports.eventToLabelChatAssociationDTO = eventToLabelChatAssociationDTO;
exports.isLabelUpsertEvent = isLabelUpsertEvent;
exports.isLabelChatAddedEvent = isLabelChatAddedEvent;
const labels_dto_1 = require("../../../structures/labels.dto");
const jids_1 = require("../../utils/jids");
function eventToLabelDTO(labelEdit) {
    return {
        id: labelEdit.LabelID,
        name: labelEdit.Action.name,
        color: labelEdit.Action.color,
        colorHex: labels_dto_1.Label.toHex(labelEdit.Action.color),
    };
}
function eventToLabelChatAssociationDTO(labelAssoc) {
    return {
        labelId: labelAssoc.LabelID,
        label: null,
        chatId: (0, jids_1.toCusFormat)(labelAssoc.JID),
    };
}
function isLabelUpsertEvent(labelEdit) {
    return !labelEdit.Action.deleted;
}
function isLabelChatAddedEvent(labelAssoc) {
    return labelAssoc.Action.labeled === true;
}
//# sourceMappingURL=labels.gows.js.map