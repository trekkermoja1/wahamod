import { WhatsappSession } from '@waha/core/abc/session.abc';
import { QueueRegistry } from './QueueRegistry';
import { App } from '@waha/apps/app_sdk/dto/app.dto';
import { ChatWootAppConfig } from '@waha/apps/chatwoot/dto/config.dto';
export declare class ChatWootWAHAQueueService {
    private readonly queueRegistry;
    constructor(queueRegistry: QueueRegistry);
    private getQueueForEvent;
    private addJobToQueue;
    listenEvents(app: App<ChatWootAppConfig>, session: WhatsappSession): void;
}
