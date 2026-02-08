"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsureSeconds = EnsureSeconds;
exports.EnsureMilliseconds = EnsureMilliseconds;
function EnsureSeconds(ms) {
    if (!ms) {
        return ms;
    }
    if (ms >= 1e12) {
        return Math.floor(ms / 1000);
    }
    return ms;
}
function EnsureMilliseconds(seconds) {
    if (!seconds) {
        return seconds;
    }
    if (seconds < 1e12) {
        return seconds * 1000;
    }
    return seconds;
}
//# sourceMappingURL=timehelper.js.map