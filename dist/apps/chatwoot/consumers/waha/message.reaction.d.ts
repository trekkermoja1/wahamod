import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootMessagePartial, ChatWootWAHABaseConsumer, IMessageInfo } from '@waha/apps/chatwoot/consumers/waha/base';
import { MessageBaseHandler } from '@waha/apps/chatwoot/consumers/waha/base';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAMessageReaction } from '@waha/structures/responses.dto';
import { WAHAWebhookMessageReaction } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
export declare class WAHAMessageReactionConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    GetChatId(event: WAHAWebhookMessageReaction): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
export declare class MessageReactionHandler extends MessageBaseHandler<WAMessageReaction> {
    protected getMessage(payload: WAMessageReaction): Promise<ChatWootMessagePartial>;
    getReplyToWhatsAppID(payload: WAMessageReaction): string;
}
