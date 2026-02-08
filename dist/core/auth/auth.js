"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashAuth = exports.PlainApiKeyAuth = exports.NoAuth = exports.IApiKeyAuth = void 0;
exports.compare = compare;
const crypto = require("crypto");
class IApiKeyAuth {
}
exports.IApiKeyAuth = IApiKeyAuth;
class NoAuth {
    isValid(plain) {
        return true;
    }
    skipAuth() {
        return true;
    }
}
exports.NoAuth = NoAuth;
class PlainApiKeyAuth {
    constructor(key) {
        this.key = key;
    }
    isValid(plain) {
        return compare(plain, this.key);
    }
    skipAuth() {
        return false;
    }
}
exports.PlainApiKeyAuth = PlainApiKeyAuth;
class HashAuth {
    constructor(hash, algorithm) {
        this.hash = hash;
        this.algorithm = algorithm;
    }
    isValid(plain) {
        if (!plain) {
            return false;
        }
        const hash = crypto.createHash(this.algorithm).update(plain).digest('hex');
        return compare(hash, this.hash);
    }
    skipAuth() {
        return false;
    }
}
exports.HashAuth = HashAuth;
function compare(provided, stored) {
    if (!stored || !provided) {
        return false;
    }
    try {
        const providedBuffer = Buffer.from(provided);
        const storedBuffer = Buffer.from(stored);
        if (providedBuffer.length !== storedBuffer.length) {
            const dummyBuffer = Buffer.alloc(providedBuffer.length);
            crypto.timingSafeEqual(providedBuffer, dummyBuffer);
            return false;
        }
        return crypto.timingSafeEqual(providedBuffer, storedBuffer);
    }
    catch (error) {
        return false;
    }
}
//# sourceMappingURL=auth.js.map