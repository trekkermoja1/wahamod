import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
import { WAMessage } from '@waha/structures/responses.dto';
import type { proto } from '@adiwajshing/baileys';
export declare class MessageEdited implements MessageToChatWootConverter {
    private readonly locale;
    constructor(locale: Locale);
    convert(payload: WAMessage, protoMessage: proto.Message | null): ChatWootMessagePartial | null;
}
