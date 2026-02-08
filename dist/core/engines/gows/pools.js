"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizedPool = exports.Pool = void 0;
const crypto = require("crypto");
class Pool {
    constructor(factory) {
        this.factory = factory;
        this.instances = new Map();
    }
    key(name) {
        return name;
    }
    get(name) {
        const key = this.key(name);
        if (this.instances.has(key)) {
            return this.instances.get(key);
        }
        const client = this.factory();
        this.instances.set(key, client);
        return client;
    }
}
exports.Pool = Pool;
class SizedPool extends Pool {
    constructor(size, factory) {
        if (!Number.isInteger(size) || size <= 0) {
            throw new Error('size must be a positive integer');
        }
        super(factory);
        this.size = size;
    }
    key(name) {
        const hash = crypto.createHash('sha256').update(name).digest();
        const num = hash.readUInt32BE(0);
        const bucket = num % this.size;
        return Number(bucket);
    }
}
exports.SizedPool = SizedPool;
//# sourceMappingURL=pools.js.map