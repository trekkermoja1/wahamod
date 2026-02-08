"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheAsync = CacheAsync;
exports.CacheSync = CacheSync;
function CacheAsync() {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        const symbol = Symbol(`__cache_${propertyKey}`);
        descriptor.value = async function (...args) {
            const key = symbol;
            if (this[key]) {
                return this[key];
            }
            const result = await original.apply(this, args);
            this[key] = result;
            return result;
        };
    };
}
function CacheSync() {
    return function (_target, propertyKey, descriptor) {
        const original = descriptor.value;
        if (typeof original !== 'function') {
            throw new Error('@CacheSync can only decorate methods');
        }
        const symbol = Symbol(`__cache_${propertyKey}`);
        descriptor.value = function (...args) {
            if (Object.prototype.hasOwnProperty.call(this, symbol)) {
                return this[symbol];
            }
            const result = original.apply(this, args);
            Object.defineProperty(this, symbol, {
                value: result,
                enumerable: false,
                configurable: false,
                writable: false,
            });
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=Cache.js.map