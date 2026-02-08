"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = optional;
exports.parseJson = parseJson;
exports.parseJsonList = parseJsonList;
exports.statusToAck = statusToAck;
const gows_1 = require("./grpc/gows");
const types_1 = require("./types");
const enums_dto_1 = require("../../../structures/enums.dto");
function optional(value, type) {
    if (value === null || value === undefined) {
        return null;
    }
    return new type({ value: value });
}
function parseJson(value) {
    if (value instanceof gows_1.messages.Json) {
        value = value.toObject();
    }
    if (value.data === undefined) {
        return undefined;
    }
    return JSON.parse(value.data);
}
function parseJsonList(value) {
    return value.toObject().elements.map((value) => parseJson(value));
}
function statusToAck(status) {
    switch (status) {
        case types_1.MessageStatus.Error:
            return enums_dto_1.WAMessageAck.ERROR;
        case types_1.MessageStatus.Pending:
            return enums_dto_1.WAMessageAck.PENDING;
        case types_1.MessageStatus.ServerAck:
            return enums_dto_1.WAMessageAck.SERVER;
        case types_1.MessageStatus.DeliveryAck:
            return enums_dto_1.WAMessageAck.DEVICE;
        case types_1.MessageStatus.Read:
            return enums_dto_1.WAMessageAck.READ;
        case types_1.MessageStatus.Played:
            return enums_dto_1.WAMessageAck.PLAYED;
    }
    return null;
}
//# sourceMappingURL=helpers.js.map