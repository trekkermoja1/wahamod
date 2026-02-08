"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalToPromise = SignalToPromise;
exports.SignalRace = SignalRace;
function SignalToPromise(signal) {
    signal.throwIfAborted();
    return new Promise((_, reject) => {
        const onAbort = () => {
            signal.removeEventListener('abort', onAbort);
            reject(signal.reason instanceof DOMException
                ? signal.reason
                : new DOMException('The operation was aborted', 'AbortError'));
        };
        signal.addEventListener('abort', onAbort, { once: true });
    });
}
function SignalRace(promise, signal) {
    signal.throwIfAborted();
    return Promise.race([promise, SignalToPromise(signal)]);
}
//# sourceMappingURL=abortable.js.map