import { ContactConversationService } from '@waha/apps/chatwoot/client/ContactConversationService';
import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootWAHABaseConsumer, IMessageInfo } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { WAHASelf } from '@waha/apps/app_sdk/waha/WAHASelf';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAHAWebhookSessionStatus } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
export declare class WAHASessionStatusConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    GetChatId(event: any): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
export declare class SessionStatusHandler {
    private repo;
    private l;
    private waha;
    constructor(repo: ContactConversationService, l: Locale, waha: WAHASelf);
    handle(data: WAHAWebhookSessionStatus): Promise<import("@figuro/chatwoot-sdk").generic_id & import("@figuro/chatwoot-sdk").message>;
}
