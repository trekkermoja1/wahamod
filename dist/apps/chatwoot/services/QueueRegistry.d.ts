import { Queue } from 'bullmq';
import { QueueName } from '../consumers/QueueName';
export declare class QueueRegistry {
    private readonly scheduledMessageCleanupQueue;
    private readonly scheduledCheckVersionQueue;
    private readonly taskContactsPullQueue;
    private readonly taskMessagesPullQueue;
    private readonly wahaSessionStatusQueue;
    private readonly wahaMessageAnyQueue;
    private readonly wahaMessageReactionQueue;
    private readonly wahaMessageEditedQueue;
    private readonly wahaMessageRevokedQueue;
    private readonly wahaMessageAckQueue;
    private readonly wahaCallReceivedQueue;
    private readonly wahaCallAcceptedQueue;
    private readonly wahaCallRejectedQueue;
    private readonly inboxMessageCreatedQueue;
    private readonly inboxMessageUpdatedQueue;
    private readonly inboxConversationCreatedQueue;
    private readonly inboxConversationStatusChangedQueue;
    private readonly inboxMessageDeletedQueue;
    private readonly inboxCommandsQueue;
    private readonly queues;
    constructor(scheduledMessageCleanupQueue: Queue, scheduledCheckVersionQueue: Queue, taskContactsPullQueue: Queue, taskMessagesPullQueue: Queue, wahaSessionStatusQueue: Queue, wahaMessageAnyQueue: Queue, wahaMessageReactionQueue: Queue, wahaMessageEditedQueue: Queue, wahaMessageRevokedQueue: Queue, wahaMessageAckQueue: Queue, wahaCallReceivedQueue: Queue, wahaCallAcceptedQueue: Queue, wahaCallRejectedQueue: Queue, inboxMessageCreatedQueue: Queue, inboxMessageUpdatedQueue: Queue, inboxConversationCreatedQueue: Queue, inboxConversationStatusChangedQueue: Queue, inboxMessageDeletedQueue: Queue, inboxCommandsQueue: Queue);
    queue(name: QueueName): Queue;
}
