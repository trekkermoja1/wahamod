import { QueueName } from '../consumers/QueueName';
import { QueueRegistry } from '@waha/apps/chatwoot/services/QueueRegistry';
export interface QueueStatus {
    name: string;
    paused: boolean;
    locked: boolean;
}
export declare class QueueManager {
    private readonly registry;
    private readonly queues;
    constructor(registry: QueueRegistry);
    pause(queues?: QueueName[]): Promise<void>;
    resume(queues?: QueueName[]): Promise<void>;
    resolve(shortcut: string | null): QueueName[];
    protected managable(queues: any): any;
    status(queues?: QueueName[]): Promise<QueueStatus[]>;
}
