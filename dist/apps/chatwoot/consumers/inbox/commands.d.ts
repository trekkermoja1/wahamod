import { ChatWootInboxMessageConsumer } from '@waha/apps/chatwoot/consumers/inbox/base';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { FlowProducer, Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { QueueRegistry } from '@waha/apps/chatwoot/services/QueueRegistry';
export declare class ChatWootInboxCommandsConsumer extends ChatWootInboxMessageConsumer {
    protected readonly manager: SessionManager;
    private readonly queueRegistry;
    private readonly messagesPullFlow;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService, queueRegistry: QueueRegistry, messagesPullFlow: FlowProducer);
    ErrorHeaderKey(): TKey | null;
    protected conversationForReport(container: any, body: any): import("../../client/Conversation").Conversation;
    protected Process(container: DIContainer, body: any, job: Job): Promise<void>;
}
