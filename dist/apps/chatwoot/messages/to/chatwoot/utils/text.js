"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyString = isEmptyString;
function isEmptyString(content) {
    if (!content) {
        return true;
    }
    return content === '' || content === '\n';
}
//# sourceMappingURL=text.js.map