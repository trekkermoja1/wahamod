"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrefixedId = generatePrefixedId;
const ulid_1 = require("ulid");
function generatePrefixedId(prefix) {
    return `${prefix}_${(0, ulid_1.ulid)().toLowerCase()}`;
}
//# sourceMappingURL=ids.js.map