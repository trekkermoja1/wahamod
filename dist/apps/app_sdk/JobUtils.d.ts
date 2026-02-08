import { Job } from 'bullmq';
import { FlowJob } from 'bullmq/dist/esm/interfaces';
export declare function NextAttemptDelayInMs(job: Job): number | null;
export declare function NextAttemptDelayInWholeSeconds(job: Job): number;
export declare function HasBeenRetried(job: Job): boolean;
export declare function QueueNameRepr(name: string): string;
export declare function JobLink(job: Job): {
    text: string;
    url: string;
};
export declare function ChainJobsOneAtATime(jobs: FlowJob[]): FlowJob;
