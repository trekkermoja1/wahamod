import { AppConsumer } from '@waha/apps/app_sdk/AppConsumer';
import { EventName } from '@waha/apps/chatwoot/client/types';
import { InboxData } from '@waha/apps/chatwoot/consumers/types';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { WAHASessionAPI } from '@waha/apps/app_sdk/waha/WAHASelf';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { AppRepository } from '../../storage';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { Conversation } from '@waha/apps/chatwoot/client/Conversation';
export declare abstract class ChatWootInboxMessageConsumer extends AppConsumer {
    protected readonly manager: SessionManager;
    protected readonly consumerName: string;
    protected appRepository: AppRepository;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService, consumerName: string);
    protected DIContainer(job: Job, appId: string): Promise<DIContainer>;
    protected abstract ErrorHeaderKey(): TKey | null;
    protected abstract Process(container: DIContainer, body: any, job: Job): Promise<any>;
    protected GetConversationID(body: any): any;
    processJob(job: Job<InboxData, any, EventName>): Promise<any>;
    private ProcessAndReportStatus;
    protected conversationForReport(container: any, body: any): Conversation;
    protected ReportErrorForMessage(job: Job, err: any, body: any): Promise<void>;
    protected ReportErrorRecovered(job: Job, body: any): Promise<void>;
}
export declare function LookupAndCheckChatId(session: WAHASessionAPI, body: any): Promise<string>;
