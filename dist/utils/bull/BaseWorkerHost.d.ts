import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare abstract class BaseWorkerHost extends WorkerHost {
    process(job: Job, token?: string): Promise<any>;
    abstract processJob(job: Job, token?: string): Promise<any>;
}
