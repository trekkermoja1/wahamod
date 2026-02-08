import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
import type { proto } from '@adiwajshing/baileys';
import { WAMessage } from '@waha/structures/responses.dto';
export declare class EventMessage implements MessageToChatWootConverter {
    private readonly l;
    constructor(l: Locale);
    convert(payload: WAMessage, protoMessage: proto.Message | null): ChatWootMessagePartial | null;
}
