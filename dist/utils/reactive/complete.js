"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complete = complete;
function complete(collection) {
    for (const item of collection.values()) {
        item.complete();
    }
}
//# sourceMappingURL=complete.js.map