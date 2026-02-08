import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
import { WAMessage } from '@waha/structures/responses.dto';
import type { proto } from '@adiwajshing/baileys';
export declare class FacebookAdMessage implements MessageToChatWootConverter {
    private readonly locale;
    private readonly logger;
    constructor(locale: Locale, logger: ILogger);
    convert(payload: WAMessage, protoMessage: proto.Message | null): Promise<ChatWootMessagePartial | null>;
    private extractAdData;
    private getAttachments;
}
