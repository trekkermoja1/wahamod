import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ChatWootInboxMessageConsumer } from '@waha/apps/chatwoot/consumers/inbox/base';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { WAHASessionAPI } from '@waha/apps/app_sdk/waha/WAHASelf';
import { MessageMappingService } from '@waha/apps/chatwoot/storage';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { ChatWootConfig } from '@waha/apps/chatwoot/dto/config.dto';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
export declare class ChatWootInboxMessageCreatedConsumer extends ChatWootInboxMessageConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    ErrorHeaderKey(): TKey | null;
    protected Process(container: DIContainer, body: any, job: Job): Promise<any[]>;
}
export declare class MessageHandler {
    private mappingService;
    private logger;
    private session;
    private config;
    private l;
    constructor(mappingService: MessageMappingService, logger: ILogger, session: WAHASessionAPI, config: ChatWootConfig, l: Locale);
    handle(body: any): Promise<any[]>;
    private saveMapping;
    private getMapping;
    getReplyTo(message: any): Promise<string | undefined>;
    private sendTextMessage;
    private sendFile;
}
