"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = Activity;
function Activity() {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = async function (...args) {
            await this.maintainPresenceOnline();
            return await original.apply(this, args);
        };
        return descriptor;
    };
}
//# sourceMappingURL=activity.js.map