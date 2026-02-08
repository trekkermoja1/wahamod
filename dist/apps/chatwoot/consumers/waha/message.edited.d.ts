import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootWAHABaseConsumer, IMessageInfo } from '@waha/apps/chatwoot/consumers/waha/base';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAHAWebhookMessageEdited } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
export declare class WAHAMessageEditedConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    GetChatId(event: WAHAWebhookMessageEdited): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
