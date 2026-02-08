import type { proto } from '@adiwajshing/baileys';
import { WALocation } from '@waha/structures/responses.dto';
export declare function extractWALocation(waproto: proto.Message): WALocation | null;
