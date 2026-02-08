import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ContactConversationService } from '@waha/apps/chatwoot/client/ContactConversationService';
import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootWAHABaseConsumer, IMessageInfo } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { MessageMappingService } from '@waha/apps/chatwoot/storage';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAHAWebhookMessageRevoked } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
export declare class WAHAMessageRevokedConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    GetChatId(event: WAHAWebhookMessageRevoked): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
export declare class MessageRevokedHandler {
    private mappingService;
    private repo;
    private logger;
    private l;
    private info;
    constructor(mappingService: MessageMappingService, repo: ContactConversationService, logger: ILogger, l: Locale, info: IMessageInfo);
    handle(event: WAHAWebhookMessageRevoked): Promise<void>;
    private buildChatWootMessage;
}
