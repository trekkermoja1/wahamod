import { ChatWootInboxMessageConsumer } from '@waha/apps/chatwoot/consumers/inbox/base';
import { Job } from 'bullmq';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { PinoLogger } from 'nestjs-pino';
import { RMutexService } from '@waha/modules/rmutex';
export declare class ChatWootConversationCreatedConsumer extends ChatWootInboxMessageConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    protected ErrorHeaderKey(): TKey | null;
    protected GetConversationID(body: any): any;
    protected Process(container: DIContainer, body: any, job: Job): Promise<any>;
}
