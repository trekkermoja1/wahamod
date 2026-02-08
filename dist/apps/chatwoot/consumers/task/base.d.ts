import { AppConsumer } from '@waha/apps/app_sdk/AppConsumer';
import { ScheduledData } from '@waha/apps/chatwoot/consumers/types';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { AppRepository } from '../../storage';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
export declare abstract class ChatWootTaskConsumer extends AppConsumer {
    protected readonly manager: SessionManager;
    protected readonly consumerName: string;
    protected appRepository: AppRepository;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService, consumerName: string);
    protected DIContainer(job: Job, appId: string): Promise<DIContainer>;
    protected abstract ErrorHeaderKey(): TKey | null;
    protected abstract Process(container: DIContainer, job: Job, signal: AbortSignal): Promise<any>;
    processJob(job: Job<ScheduledData, any, string>): Promise<any>;
    private ProcessAndReportStatus;
    protected conversationForReport(container: any, body: any): any;
    protected ReportErrorForJob(job: Job, err: any): Promise<void>;
    protected ReportErrorRecovered(job: Job): Promise<void>;
}
