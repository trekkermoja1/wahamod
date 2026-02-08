import { ChatWootTaskConsumer } from '@waha/apps/chatwoot/consumers/task/base';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job, JobState } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { Conversation } from '@waha/apps/chatwoot/client/Conversation';
import { IgnoreJidConfig } from '@waha/core/utils/jids';
import { QueueManager } from '@waha/apps/chatwoot/services/QueueManager';
export declare enum ChatID {
    ALL = "all",
    SUMMARY = "summary"
}
export type MessagesPullOptions = {
    chat: string;
    batch: number;
    progress: number | null;
    period: {
        start: number;
        end: number;
    };
    force: boolean;
    pause: boolean;
    timeout: {
        media: number;
    };
    media: boolean;
    ignore: IgnoreJidConfig;
    resolveConversations: boolean;
};
interface Progress {
    ok: number;
    exists: number;
    ignored: number;
    errors: number;
    chats: string[];
    messages: {
        first?: number;
        last?: number;
    };
    conversations: number[];
    conversationResolve: {
        success: number;
        error: number;
    };
}
export declare class TaskMessagesPullConsumer extends ChatWootTaskConsumer {
    protected queueManager: QueueManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService, queueManager: QueueManager);
    protected ErrorHeaderKey(): TKey | null;
    protected Process(container: DIContainer, job: Job, signal: AbortSignal): Promise<Progress>;
}
export declare class TaskActivity {
    private l;
    private conversation;
    constructor(l: Locale, conversation: Conversation);
    queue(paused: boolean): Promise<void>;
    details(data: any): Promise<void>;
    started(job: Job, options: MessagesPullOptions): Promise<void>;
    progress(progress: Progress, options: MessagesPullOptions): Promise<void>;
    completed(progress: any, options: any): Promise<void>;
}
export declare function MessagesPullStatusMessage(l: Locale, job: Job, state: JobState | 'unknown'): string;
export {};
