"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisMutexClient = void 0;
const LUA_UNLOCK_SCRIPT = `if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end`;
const LUA_EXTEND_SCRIPT = `if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("pexpire", KEYS[1], ARGV[2]) else return 0 end`;
class RedisMutexClient {
    constructor(redis, logger) {
        this.redis = redis;
        this.logger = logger;
    }
    async acquireLock(key, lockId, ttl) {
        this.logger.trace({ key, lockId, ttl }, 'Attempting to acquire lock');
        const result = await this.redis.set(key, lockId, 'PX', ttl, 'NX');
        if (result !== 'OK') {
            this.logger.trace({ key }, 'Failed to acquire lock');
            return false;
        }
        this.logger.trace({ key, lockId }, 'Successfully acquired lock');
        return true;
    }
    async releaseLock(key, lockId) {
        this.logger.trace({ key, lockId }, 'Unlocking key');
        const result = await this.redis.eval(LUA_UNLOCK_SCRIPT, 1, key, lockId);
        const success = result === 1;
        if (!success) {
            this.logger.trace({ key }, 'Failed to unlock key');
        }
        else {
            this.logger.trace({ key, lockId, success }, 'Unlock result');
        }
        return success;
    }
    async extendLock(key, lockId, ttl) {
        this.logger.trace({ key, lockId, ttl }, 'Extending TTL for key');
        const result = await this.redis.eval(LUA_EXTEND_SCRIPT, 1, key, lockId, ttl.toString());
        const success = result === 1;
        if (!success) {
            this.logger.trace({ key }, 'Failed to extend TTL for key');
        }
        else {
            this.logger.trace({ key, lockId, ttl, success }, 'TTL extension result');
        }
        return success;
    }
}
exports.RedisMutexClient = RedisMutexClient;
//# sourceMappingURL=RedisMutexClient.js.map