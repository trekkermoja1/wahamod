"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureBase64 = ensureBase64;
function ensureBase64(data) {
    if (!data) {
        return data;
    }
    if (typeof data === 'string') {
        return data.trim();
    }
    if (data instanceof Uint8Array) {
        return Buffer.from(data).toString('base64');
    }
    if (data instanceof ArrayBuffer) {
        return Buffer.from(new Uint8Array(data)).toString('base64');
    }
    return null;
}
//# sourceMappingURL=bytes.js.map