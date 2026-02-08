import { conversation_message_create } from '@figuro/chatwoot-sdk';
import { AppConsumer } from '@waha/apps/app_sdk/AppConsumer';
import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ContactConversationService } from '@waha/apps/chatwoot/client/ContactConversationService';
import { MessageType, SendAttachment } from '@waha/apps/chatwoot/client/types';
import { EventData } from '@waha/apps/chatwoot/consumers/types';
import { DIContainer } from '@waha/apps/chatwoot/di/DIContainer';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { WAHASelf, WAHASessionAPI } from '@waha/apps/app_sdk/waha/WAHASelf';
import { AppRepository, MessageMappingService } from '@waha/apps/chatwoot/storage';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { RMutexService } from '@waha/modules/rmutex/rmutex.service';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { MessageSource } from '@waha/structures/responses.dto';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { TKey } from '@waha/apps/chatwoot/i18n/templates';
import { ChatWootConfig } from '@waha/apps/chatwoot/dto/config.dto';
export declare function ListenEventsForChatWoot(config: ChatWootConfig): WAHAEvents[];
export declare abstract class ChatWootWAHABaseConsumer extends AppConsumer {
    protected readonly manager: SessionManager;
    protected readonly consumerName: string;
    protected appRepository: AppRepository;
    constructor(manager: SessionManager, log: PinoLogger, rmutex: RMutexService, consumerName: string);
    protected ErrorHeaderKey(): TKey | null;
    private ProcessAndReportErrors;
    protected DIContainer(job: Job, appId: string): Promise<DIContainer>;
    abstract GetChatId(event: any): string;
    abstract Process(job: Job<EventData, any, WAHAEvents>, messageInfo: IMessageInfo): Promise<any>;
    ShouldProcess(event: any): boolean;
    processJob(job: Job<EventData, any, WAHAEvents>): Promise<any>;
    protected ReportErrorForMessage(info: MessageReportInfo, job: Job, err: any): Promise<void>;
    protected ReportErrorRecovered(info: MessageReportInfo, job: Job): Promise<void>;
}
export interface IMessageInfo {
    onConversationId(id: number): void;
    onMessageType(type: MessageType): void;
}
export declare class MessageReportInfo implements IMessageInfo {
    conversationId: number | null;
    type: MessageType | null;
    onConversationId(id: number): void;
    onMessageType(type: MessageType): void;
}
export interface ChatWootMessagePartial {
    content: string;
    attachments: SendAttachment[];
    private?: boolean;
}
export interface MessageBaseHandlerPayload {
    id: string;
    timestamp: number;
    from?: string;
    fromMe?: boolean;
    source?: MessageSource;
}
export declare abstract class MessageBaseHandler<Payload extends MessageBaseHandlerPayload> {
    protected job: Job;
    protected mappingService: MessageMappingService;
    protected repo: ContactConversationService;
    protected logger: ILogger;
    protected info: IMessageInfo;
    protected session: WAHASessionAPI;
    protected l: Locale;
    protected waha: WAHASelf;
    constructor(job: Job, mappingService: MessageMappingService, repo: ContactConversationService, logger: ILogger, info: IMessageInfo, session: WAHASessionAPI, l: Locale, waha: WAHASelf);
    protected abstract getMessage(payload: Payload): Promise<ChatWootMessagePartial>;
    protected get historyMessage(): boolean;
    protected finalizeContent(content: string, payload: Payload): string;
    abstract getReplyToWhatsAppID(payload: Payload): string | undefined;
    protected get delayFromMeAPI(): number;
    protected get shouldAddFromTag(): boolean;
    ShouldProcessMessage(payload: Payload): Promise<boolean>;
    handle(payload: Payload): Promise<conversation_message_create | null>;
    private saveMapping;
    private buildChatWootMessage;
    getReplyToChatWootMessageID(payload: Payload): Promise<number | undefined>;
}
