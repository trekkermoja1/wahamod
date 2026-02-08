import { Locale } from '@waha/apps/chatwoot/i18n/locale';
import { Job } from 'bullmq';
import { ChatWootMessagePartial } from '@waha/apps/chatwoot/consumers/waha/base';
import type { proto } from '@adiwajshing/baileys';
import { WAMessage } from '@waha/structures/responses.dto';
import { MessageToChatWootConverter } from '@waha/apps/chatwoot/messages/to/chatwoot';
export declare class HasMediaWithNoMediaMessage implements MessageToChatWootConverter {
    private readonly locale;
    private readonly job;
    constructor(locale: Locale, job: Job);
    convert(payload: WAMessage, protoMessage: proto.Message | null): ChatWootMessagePartial;
}
