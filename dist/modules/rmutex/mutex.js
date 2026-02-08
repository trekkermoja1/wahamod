"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RMutexLockedImpl = exports.RMutexImpl = void 0;
const crypto = require("crypto");
class RMutexImpl {
    constructor(client, key, ttl) {
        this.client = client;
        this.ttl = ttl;
        this.keys = [];
        this.keys.push(key);
    }
    key() {
        return this.keys.join('-');
    }
    withKey(key) {
        this.keys.push(key);
        return this;
    }
    async lock() {
        const key = this.key();
        const lockId = crypto.randomUUID();
        const result = await this.client.acquireLock(key, lockId, this.ttl);
        if (!result) {
            return null;
        }
        return new RMutexLockedImpl(this.client, key, lockId, this.ttl);
    }
}
exports.RMutexImpl = RMutexImpl;
class RMutexLockedImpl {
    constructor(client, key, lockId, ttl) {
        this.client = client;
        this.key = key;
        this.lockId = lockId;
        this.ttl = ttl;
    }
    async release() {
        return this.client.releaseLock(this.key, this.lockId);
    }
    async extend(ttl) {
        const newTtl = ttl !== undefined ? ttl : this.ttl;
        return this.client.extendLock(this.key, this.lockId, newTtl);
    }
}
exports.RMutexLockedImpl = RMutexLockedImpl;
//# sourceMappingURL=mutex.js.map