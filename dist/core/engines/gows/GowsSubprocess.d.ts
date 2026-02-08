import { Logger } from 'pino';
export declare class GowsSubprocess {
    private logger;
    readonly path: string;
    readonly socket: string;
    readonly pprof: boolean;
    private checkIntervalMs;
    private readyDelayMs;
    private readyText;
    private child;
    private ready;
    constructor(logger: Logger, path: string, socket: string, pprof?: boolean);
    start(onExit: (code: number) => void): void;
    listenReady(): void;
    waitWhenReady(timeout: number): Promise<void>;
    stop(): Promise<void>;
    private log;
}
