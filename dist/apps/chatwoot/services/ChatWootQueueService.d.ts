import { InboxData } from '@waha/apps/chatwoot/consumers/types';
import { Queue } from 'bullmq';
import { QueueRegistry } from './QueueRegistry';
export declare class ChatWootQueueService {
    private readonly queueRegistry;
    constructor(queueRegistry: QueueRegistry);
    add(queue: Queue, name: string, data: any): Promise<any>;
    private getQueueForEvent;
    addMessageCreatedJob(data: InboxData): Promise<any>;
    addMessageUpdatedJob(data: InboxData): Promise<any>;
    addMessageDeletedJob(data: InboxData): Promise<any>;
    addCommandsJob(event: string, data: InboxData): Promise<any>;
    addJobToQueue(event: string, data: InboxData): Promise<any>;
}
