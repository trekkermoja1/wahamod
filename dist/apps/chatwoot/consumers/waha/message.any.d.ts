import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootMessagePartial, ChatWootWAHABaseConsumer, IMessageInfo, MessageBaseHandler } from '@waha/apps/chatwoot/consumers/waha/base';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAMessage } from '@waha/structures/responses.dto';
import { WAHAWebhookMessageAny } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
export declare class WAHAMessageAnyConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    GetChatId(event: WAHAWebhookMessageAny): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
export declare class MessageAnyHandler extends MessageBaseHandler<WAMessage> {
    shouldLogUnsupported: boolean;
    protected getMessage(payload: WAMessage): Promise<ChatWootMessagePartial>;
    getReplyToWhatsAppID(payload: WAMessage): string;
}
