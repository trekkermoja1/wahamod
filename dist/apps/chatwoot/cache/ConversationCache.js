"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheForConfig = CacheForConfig;
const NodeCache = require("node-cache");
const cache = new NodeCache({
    stdTTL: 24 * 60 * 60,
    useClones: false,
});
function CacheForConfig(config) {
    return new ConversationCache(`${config.url}+${config.inboxId}`);
}
class ConversationCache {
    constructor(prefix) {
        this.prefix = prefix;
    }
    fullKey(key) {
        return `${this.prefix}.${key}`;
    }
    delete(key) {
        const fullKey = this.fullKey(key);
        cache.del(fullKey);
    }
    get(key) {
        const fullKey = this.fullKey(key);
        return cache.get(fullKey) || null;
    }
    has(key) {
        const fullKey = this.fullKey(key);
        return cache.has(fullKey);
    }
    set(key, value) {
        const fullKey = this.fullKey(key);
        cache.set(fullKey, value);
    }
    clean() {
        cache.keys().forEach((key) => {
            if (key.startsWith(this.prefix)) {
                cache.del(key);
            }
        });
    }
}
//# sourceMappingURL=ConversationCache.js.map