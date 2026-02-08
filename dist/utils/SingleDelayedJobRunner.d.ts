import { Logger } from 'pino';
type FunctionNoArgs = () => Promise<any>;
export declare class SingleDelayedJobRunner {
    private name;
    private timeoutMs;
    private warningOverride;
    private timeout;
    private logger;
    constructor(name: string, timeoutMs: number, logger: Logger, warningOverride?: boolean);
    get scheduled(): boolean;
    schedule(fn: FunctionNoArgs): boolean;
    cancel(): void;
    private log;
}
export {};
