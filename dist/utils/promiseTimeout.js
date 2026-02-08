"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseTimeout = exports.TimeoutError = void 0;
exports.sleep = sleep;
exports.waitUntil = waitUntil;
class TimeoutError extends Error {
}
exports.TimeoutError = TimeoutError;
const promiseTimeout = function (ms, promise) {
    let timer;
    return Promise.race([
        promise,
        new Promise((_, reject) => (timer = setTimeout(() => reject(new TimeoutError(`Timed out in ${ms}ms.`)), ms))),
    ]).finally(() => clearTimeout(timer));
};
exports.promiseTimeout = promiseTimeout;
async function sleep(ms) {
    if (ms == 0) {
        return;
    }
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function waitUntil(condition, everyMs, timeoutMs) {
    const startTime = Date.now();
    let result = await condition();
    while (!result && Date.now() - startTime < timeoutMs) {
        await sleep(everyMs);
        result = await condition();
    }
    return result;
}
//# sourceMappingURL=promiseTimeout.js.map