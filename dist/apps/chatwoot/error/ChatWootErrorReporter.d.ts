import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { Conversation } from '@waha/apps/chatwoot/client/Conversation';
import { MessageType } from '@waha/apps/chatwoot/client/types';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { Job } from 'bullmq';
export declare class ChatWootErrorReporter {
    private logger;
    private job;
    private l;
    private errorRenderer;
    constructor(logger: ILogger, job: Job, l: Locale);
    ReportError(conversation: Conversation, header: string, type: MessageType, error: any, replyTo?: number): Promise<void>;
    ReportSucceeded(conversation: Conversation, type: MessageType, replyTo?: number): Promise<void>;
}
