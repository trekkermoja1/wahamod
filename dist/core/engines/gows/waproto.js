"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCaseKeysDeep = camelCaseKeysDeep;
exports.GoToJSWAProto = GoToJSWAProto;
exports.resolveProtoMessage = resolveProtoMessage;
const lodash = require("lodash");
function camelCaseKeysDeep(input) {
    if (Array.isArray(input))
        return input.map(camelCaseKeysDeep);
    if (input && typeof input === 'object') {
        const mapped = lodash.mapKeys(input, (_v, k) => lodash.camelCase(k));
        return lodash.mapValues(mapped, camelCaseKeysDeep);
    }
    return input;
}
function GoToJSWAProto(data) {
    if (!data) {
        return data;
    }
    return camelCaseKeysDeep(data);
}
function resolveProtoMessage(data) {
    if (data.Message) {
        const protoMessage = data.Message;
        return camelCaseKeysDeep(protoMessage);
    }
    if (data.message) {
        return data.message;
    }
    return null;
}
//# sourceMappingURL=waproto.js.map