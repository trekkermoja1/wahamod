export declare class TimeoutError extends Error {
}
export declare const promiseTimeout: (ms: number, promise: Promise<any>) => Promise<any>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function waitUntil(condition: () => Promise<boolean>, everyMs: number, timeoutMs: number): Promise<boolean>;
