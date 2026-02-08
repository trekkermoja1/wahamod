"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairs = pairs;
function* pairs(iter1, iter2) {
    for (const id1 of iter1) {
        for (const id2 of iter2) {
            yield [id1, id2];
        }
    }
}
//# sourceMappingURL=pairs.js.map