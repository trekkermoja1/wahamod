import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { ChatWootScheduledConsumer } from './base';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
export declare class CheckVersionConsumer extends ChatWootScheduledConsumer {
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    protected ErrorHeaderKey(): TKey;
    protected Process(container: DIContainer, job: Job): Promise<any>;
    private CheckWAHACoreVersion;
    private CheckNewVersionAvailable;
    private fetchLatestVersion;
}
