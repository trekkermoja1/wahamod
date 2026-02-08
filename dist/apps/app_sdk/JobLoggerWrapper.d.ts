import { Job } from 'bullmq';
import { Logger } from 'pino';
import { ILogger } from './ILogger';
export declare class JobLoggerWrapper implements ILogger {
    private job;
    private readonly logger;
    constructor(job: Job, logger: Logger);
    fatal(log: string): void;
    error(log: string): void;
    warn(log: string): void;
    info(log: string): void;
    debug(log: string): void;
    trace(log: string): void;
    private log;
}
