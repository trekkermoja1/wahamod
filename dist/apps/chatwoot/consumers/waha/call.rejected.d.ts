import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootMessagePartial, ChatWootWAHABaseConsumer, IMessageInfo, MessageBaseHandler } from '@waha/apps/chatwoot/consumers/waha/base';
import { CallMessagePayload } from '@waha/apps/chatwoot/consumers/waha/call.0.base';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAHAWebhookCallRejected } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
export declare class WAHACallRejectedConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    ShouldProcess(event: WAHAWebhookCallRejected): boolean;
    GetChatId(event: WAHAWebhookCallRejected): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
export declare class CallRejectedMessageHandler extends MessageBaseHandler<CallMessagePayload> {
    protected getMessage(payload: CallMessagePayload): Promise<ChatWootMessagePartial>;
    getReplyToWhatsAppID(payload: CallMessagePayload): string | undefined;
}
