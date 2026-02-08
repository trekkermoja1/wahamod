import { DefaultJobOptions } from 'bullmq';
export declare const JOB_DELAY = 1000;
export declare const JOB_LOCK_TTL = 20000;
export declare const JOB_CONCURRENCY: number;
export declare const JobRemoveOptions: {
    removeOnComplete: {
        age: number;
        count: number;
    };
    removeOnFail: {
        age: number;
        count: number;
    };
};
export declare const ExponentialRetriesJobOptions: DefaultJobOptions;
export declare const NoRetriesJobOptions: DefaultJobOptions;
export declare function merge(...args: any[]): any;
