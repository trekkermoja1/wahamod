import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
import type { proto } from '@adiwajshing/baileys';
import { WAMessage } from '@waha/structures/responses.dto';
export declare class PixMessage implements MessageToChatWootConverter {
    private readonly l;
    private readonly logger;
    constructor(l: Locale, logger: ILogger);
    convert(payload: WAMessage, protoMessage: proto.Message | null): ChatWootMessagePartial | null;
    private extractPixData;
    private resolveNativeFlowButtons;
}
