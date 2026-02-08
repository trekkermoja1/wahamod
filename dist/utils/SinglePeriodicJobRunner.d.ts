import { Logger } from 'pino';
type FunctionNoArgs = () => Promise<any>;
export declare class SinglePeriodicJobRunner {
    private name;
    private intervalMs;
    private warningOverlap;
    private warningOverride;
    private interval;
    private isWorking;
    private logger;
    constructor(name: string, intervalMs: number, logger: Logger, warningOverlap?: boolean, warningOverride?: boolean);
    start(fn: FunctionNoArgs): boolean;
    stop(): void;
    private log;
}
export {};
