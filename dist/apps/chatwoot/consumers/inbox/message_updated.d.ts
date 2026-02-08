import { ChatWootInboxMessageConsumer } from '@waha/apps/chatwoot/consumers/inbox/base';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
export declare class ChatWootInboxMessageUpdatedConsumer extends ChatWootInboxMessageConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    ErrorHeaderKey(): TKey | null;
    protected Process(container: DIContainer, body: any, job: Job): Promise<any[]>;
}
