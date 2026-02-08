import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { WAHASelf } from '@waha/apps/app_sdk/waha/WAHASelf';
import type { proto } from '@adiwajshing/baileys';
import { WAMessage } from '@waha/structures/responses.dto';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
import { Job } from 'bullmq';
export declare class TextMessage implements MessageToChatWootConverter {
    private readonly locale;
    private readonly logger;
    private readonly waha;
    private readonly job;
    constructor(locale: Locale, logger: ILogger, waha: WAHASelf, job: Job);
    convert(payload: WAMessage, protoMessage: proto.Message | null): Promise<ChatWootMessagePartial | null>;
    private getAttachments;
}
