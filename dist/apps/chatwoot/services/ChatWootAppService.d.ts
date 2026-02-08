import { IAppService } from '@waha/apps/app_sdk/services/IAppService';
import { ChatWootAppConfig } from '@waha/apps/chatwoot/dto/config.dto';
import { ChatWootScheduleService } from '@waha/apps/chatwoot/services/ChatWootScheduleService';
import { ChatWootWAHAQueueService } from '@waha/apps/chatwoot/services/ChatWootWAHAQueueService';
import { App } from '@waha/apps/chatwoot/storage';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { PinoLogger } from 'nestjs-pino';
export declare class ChatWootAppService implements IAppService {
    private chatWootWAHAQueueService;
    private chatWootScheduleService;
    protected logger: PinoLogger;
    constructor(chatWootWAHAQueueService: ChatWootWAHAQueueService, chatWootScheduleService: ChatWootScheduleService, logger: PinoLogger);
    validate(app: App<ChatWootAppConfig>): void;
    beforeCreated(app: App<ChatWootAppConfig>): Promise<void>;
    beforeEnabled(savedApp: App<ChatWootAppConfig>, newApp: App<ChatWootAppConfig>): Promise<void>;
    beforeDisabled(savedApp: App<ChatWootAppConfig>, newApp: App<ChatWootAppConfig>): Promise<void>;
    beforeUpdated(savedApp: App<ChatWootAppConfig>, newApp: App<ChatWootAppConfig>): Promise<void>;
    beforeDeleted(app: App<ChatWootAppConfig>): Promise<void>;
    private sendConnectedMessage;
    private sendDisconnectedMessage;
    private sendUpdatedMessage;
    beforeSessionStart(app: App<ChatWootAppConfig>, session: WhatsappSession): void;
    afterSessionStart(app: App<ChatWootAppConfig>, session: WhatsappSession): void;
    private setupCustomAttributes;
    private cleanCache;
}
