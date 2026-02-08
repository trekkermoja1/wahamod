"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceLongsWithNumber = void 0;
exports.extractMediaContent = extractMediaContent;
exports.convertProtobufToPlainObject = convertProtobufToPlainObject;
exports.ensureNumber = ensureNumber;
const esm_1 = require("../../../vendor/esm");
function extractMediaContent(content) {
    var _a;
    content = esm_1.default.b.extractMessageContent(content);
    const mediaContent = (content === null || content === void 0 ? void 0 : content.documentMessage) ||
        (content === null || content === void 0 ? void 0 : content.imageMessage) ||
        (content === null || content === void 0 ? void 0 : content.videoMessage) ||
        (content === null || content === void 0 ? void 0 : content.audioMessage) ||
        (content === null || content === void 0 ? void 0 : content.stickerMessage);
    if (mediaContent) {
        return mediaContent;
    }
    if ((_a = content === null || content === void 0 ? void 0 : content.associatedChildMessage) === null || _a === void 0 ? void 0 : _a.message) {
        return extractMediaContent(content.associatedChildMessage.message);
    }
    return null;
}
const replaceLongsWithNumber = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (isObjectALong(obj[key])) {
                obj[key] = toNumber(obj[key]);
            }
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                (0, exports.replaceLongsWithNumber)(obj[key]);
            }
        }
    }
};
exports.replaceLongsWithNumber = replaceLongsWithNumber;
function convertProtobufToPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Buffer.isBuffer(obj) ||
        (obj === null || obj === void 0 ? void 0 : obj.type) == 'Buffer' ||
        obj instanceof Uint8Array) {
        return obj;
    }
    if (Array.isArray(obj) && obj.length === 0) {
        return undefined;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => convertProtobufToPlainObject(item));
    }
    const plainObject = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        plainObject[key] = convertProtobufToPlainObject(value);
    });
    return Object.assign({}, plainObject);
}
const isObjectALong = (value) => {
    return (value &&
        typeof value === 'object' &&
        'low' in value &&
        'high' in value &&
        'unsigned' in value);
};
function ensureNumber(value) {
    if (!value) {
        return value;
    }
    if (typeof value === 'string') {
        return Number.parseInt(value, 10);
    }
    if (isObjectALong(value)) {
        return toNumber(value);
    }
    return value;
}
const toNumber = (longValue) => {
    const { low, high, unsigned } = longValue;
    const result = unsigned ? low >>> 0 : low + high * 0x100000000;
    return result;
};
//# sourceMappingURL=utils.js.map