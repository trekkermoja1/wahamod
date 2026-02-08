import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { BaseWorkerHost } from '@waha/utils/bull/BaseWorkerHost';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { Logger } from 'pino';
export interface JobDataTimeout {
    timeout?: {
        job?: number;
    };
}
export declare abstract class AppConsumer extends BaseWorkerHost {
    protected readonly rmutex: RMutexService;
    protected readonly logger: Logger;
    constructor(appName: string, componentName: string, log: PinoLogger, rmutex: RMutexService);
    protected signal(job: any): AbortSignal;
    protected withMutex<T, R>(job: Job<T, R, any>, mutexKey: string, processor: () => Promise<R>): Promise<R>;
}
