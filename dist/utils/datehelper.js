"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToday = isToday;
exports.isYesterday = isYesterday;
exports.isSameYear = isSameYear;
function isToday(input, reference = new Date()) {
    if (!input || !(input instanceof Date) || Number.isNaN(input.getTime())) {
        return false;
    }
    return (input.getFullYear() === reference.getFullYear() &&
        input.getMonth() === reference.getMonth() &&
        input.getDate() === reference.getDate());
}
function isYesterday(input, reference = new Date()) {
    if (!input || !(input instanceof Date) || Number.isNaN(input.getTime())) {
        return false;
    }
    const yesterday = new Date(reference);
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    const candidate = new Date(input);
    candidate.setHours(0, 0, 0, 0);
    return candidate.getTime() === yesterday.getTime();
}
function isSameYear(input, reference = new Date()) {
    if (!input || !(input instanceof Date) || Number.isNaN(input.getTime())) {
        return false;
    }
    return input.getFullYear() === reference.getFullYear();
}
//# sourceMappingURL=datehelper.js.map