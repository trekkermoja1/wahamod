"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceProxy = void 0;
const NodeCache = require("node-cache");
class PresenceProxy {
    constructor() {
        this.cache = new NodeCache({
            stdTTL: 60,
            checkperiod: 60,
            useClones: false,
        });
        this.proxy = new Proxy({}, {
            get: (_, prop) => {
                return this.cache.get(prop);
            },
            set: (_, prop, value) => {
                this.cache.set(prop, value);
                return true;
            },
            deleteProperty: (_, prop) => {
                return this.cache.del(prop) > 0;
            },
            has: (_, prop) => {
                return this.cache.has(prop);
            },
            ownKeys: () => {
                return this.cache.keys();
            },
            getOwnPropertyDescriptor: (_, prop) => {
                if (this.cache.has(prop)) {
                    return {
                        enumerable: true,
                        configurable: true,
                    };
                }
                return undefined;
            },
        });
    }
}
exports.PresenceProxy = PresenceProxy;
//# sourceMappingURL=PresenceProxy.js.map