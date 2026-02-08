export declare function SignalToPromise(signal: AbortSignal): Promise<never>;
export declare function SignalRace<T>(promise: Promise<T>, signal: AbortSignal): Promise<T>;
