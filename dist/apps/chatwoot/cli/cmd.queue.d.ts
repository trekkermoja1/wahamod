import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { Conversation } from '@waha/apps/chatwoot/client/Conversation';
import { QueueRegistry } from '@waha/apps/chatwoot/services/QueueRegistry';
export interface QueueCommandContext {
    queues: {
        registry: QueueRegistry;
    };
    l: Locale;
    conversation: Conversation;
}
export declare function QueueStatus(ctx: QueueCommandContext, name: string): Promise<void>;
export declare function QueueStart(ctx: QueueCommandContext, name: string): Promise<void>;
export declare function QueueStop(ctx: QueueCommandContext, name?: string): Promise<void>;
