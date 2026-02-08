import { messages } from '@waha/core/engines/gows/grpc/gows';
import { MessageStatus } from '@waha/core/engines/gows/types';
import { WAMessageAck } from '@waha/structures/enums.dto';
export declare function optional(value: any, type: any): any;
export declare function parseJson(value: messages.Json | {
    data?: string;
}): any;
export declare function parseJsonList(value: messages.JsonList): any[];
export declare function statusToAck(status: MessageStatus): WAMessageAck | null;
