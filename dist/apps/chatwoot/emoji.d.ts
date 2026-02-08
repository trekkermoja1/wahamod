import { WAHASessionStatus, WAMessageAck } from '@waha/structures/enums.dto';
export declare function SessionStatusEmoji(status: WAHASessionStatus): string;
export declare function MessageAckEmoji(ack: WAMessageAck): "⏳" | "❌" | "✔️" | "✅" | "❔";
