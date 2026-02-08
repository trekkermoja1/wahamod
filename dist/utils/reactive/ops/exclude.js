"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = exclude;
const rxjs_1 = require("rxjs");
function exclude(predicate) {
    return (0, rxjs_1.filter)((...args) => !predicate(...args));
}
//# sourceMappingURL=exclude.js.map