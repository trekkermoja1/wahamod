import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import type { proto } from '@adiwajshing/baileys';
import { WAMessage } from '@waha/structures/responses.dto';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
export declare class AlbumMessage implements MessageToChatWootConverter {
    private readonly locale;
    constructor(locale: Locale);
    convert(payload: WAMessage, protoMessage: proto.Message | null): ChatWootMessagePartial | null;
}
