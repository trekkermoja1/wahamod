import { AllEventType } from '@waha/structures/enums.dto';
export declare enum RetryPolicy {
    LINEAR = "linear",
    EXPONENTIAL = "exponential",
    CONSTANT = "constant"
}
export declare class RetriesConfiguration {
    delaySeconds?: number;
    attempts?: number;
    policy?: RetryPolicy;
}
export declare class CustomHeader {
    name: string;
    value: string;
}
export declare class HmacConfiguration {
    key?: string;
}
export declare class WebhookConfig {
    url: string;
    events: AllEventType[];
    hmac?: HmacConfiguration;
    retries?: RetriesConfiguration;
    customHeaders?: CustomHeader[];
}
