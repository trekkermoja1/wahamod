"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = fileExists;
exports.safeJoin = safeJoin;
const path = require("path");
const fs = require('fs-extra');
async function fileExists(filepath) {
    try {
        await fs.access(filepath, fs.constants.F_OK);
    }
    catch (error) {
        return false;
    }
    return true;
}
function safeJoin(base, input) {
    base = path.resolve(base);
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid path');
    }
    if (input.startsWith('~') || path.isAbsolute(input)) {
        throw new Error('Home or absolute paths not allowed');
    }
    const joined = path.join(base, input);
    const resolved = path.resolve(joined);
    if (!resolved.startsWith(base + path.sep)) {
        throw new Error('Access outside base dir not allowed');
    }
    return resolved;
}
//# sourceMappingURL=files.js.map