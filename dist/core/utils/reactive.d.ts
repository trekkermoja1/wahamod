import { WAMessage } from '@waha/structures/responses.dto';
import { WAMessageAckBody } from '@waha/structures/webhooks.dto';
export declare function DistinctAck(flushEvery?: number): import("rxjs").MonoTypeOperatorFunction<WAMessageAckBody>;
export declare function DistinctMessages(flushEvery?: number): import("rxjs").MonoTypeOperatorFunction<WAMessage>;
