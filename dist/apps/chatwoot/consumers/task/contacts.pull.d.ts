import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job, JobState } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { ChatWootTaskConsumer } from '@waha/apps/chatwoot/consumers/task/base';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export interface ContactsPullOptions {
    batch: number;
    progress: number | null;
    avatar: null | 'if-missing' | 'update';
    attributes: boolean;
    contacts: {
        groups: boolean;
        lids: boolean;
    };
    delay: {
        contact: number;
        batch: number;
    };
}
export declare class TaskContactsPullConsumer extends ChatWootTaskConsumer {
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    protected ErrorHeaderKey(): TKey;
    protected Process(container: DIContainer, job: Job, signal?: AbortSignal): Promise<any>;
}
export declare function ContactsPullStatusMessage(l: Locale, job: Job, state: JobState | 'unknown'): string;
