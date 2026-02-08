"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObjectByValues = sortObjectByValues;
exports.flipObject = flipObject;
exports.parseBool = parseBool;
exports.splitAt = splitAt;
function parseBool(value) {
    if (typeof value === 'boolean') {
        return value;
    }
    if (!value) {
        return false;
    }
    if (value.toLowerCase() === 'true' || value.toLowerCase() === '1') {
        return true;
    }
    if (value.toLowerCase() === 'false' || value.toLowerCase() === '0') {
        return false;
    }
    throw new Error('Error: parseBool got unexpected value - use "true" or "false" values');
}
function flipObject(object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
}
function splitAt(str, index) {
    const fst = [...str];
    const snd = fst.splice(index);
    return [fst.join(''), snd.join('')];
}
function sortObjectByValues(obj) {
    if (!obj) {
        return obj;
    }
    return Object.fromEntries(Object.entries(obj).sort(([, v1], [, v2]) => v2 - v1));
}
//# sourceMappingURL=helpers.js.map