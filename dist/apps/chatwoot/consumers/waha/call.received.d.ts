import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { ChatWootMessagePartial, ChatWootWAHABaseConsumer, IMessageInfo, MessageBaseHandler, MessageBaseHandlerPayload } from '@waha/apps/chatwoot/consumers/waha/base';
import { CallMessagePayload } from '@waha/apps/chatwoot/consumers/waha/call.0.base';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAHAWebhookCallReceived } from '@waha/structures/webhooks.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { CallData } from '@waha/structures/calls.dto';
export declare class WAHACallReceivedConsumer extends ChatWootWAHABaseConsumer {
    protected readonly manager: SessionManager;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService);
    ShouldProcess(event: WAHAWebhookCallReceived): boolean;
    GetChatId(event: WAHAWebhookCallReceived): string;
    Process(job: Job<EventData, any, WAHAEvents>, info: IMessageInfo): Promise<any>;
}
export declare class CallReceivedMessageHandler extends MessageBaseHandler<CallMessagePayload> {
    protected getMessage(payload: MessageBaseHandlerPayload & CallData): Promise<ChatWootMessagePartial>;
    getReplyToWhatsAppID(payload: MessageBaseHandlerPayload & CallData): string | undefined;
}
