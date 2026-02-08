import { CallData } from '@waha/structures/calls.dto';
import { MessageBaseHandlerPayload } from '@waha/apps/chatwoot/consumers/waha/base';
export declare function ShouldProcessCall(event: {
    payload: CallData;
}): boolean;
export type CallMessagePayload = CallData & MessageBaseHandlerPayload & {
    callId: string;
};
declare const SUFFIX: {
    "call.received": string;
    "call.accepted": string;
    "call.rejected": string;
};
type Events = keyof typeof SUFFIX;
export declare function BuildFakeCallMessageId(id: string, event: Events): string;
export declare function BuildCallMessagePayload(call: CallData, event: Events): CallMessagePayload;
export {};
