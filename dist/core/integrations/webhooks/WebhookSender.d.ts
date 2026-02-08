import { WebhookConfig } from '@waha/structures/webhooks.config.dto';
import { LoggerBuilder } from '@waha/utils/logging';
import { AxiosInstance } from 'axios';
import { Logger } from 'pino';
export declare function exponentialDelay(delayFactor: number): (retryNumber?: number, error?: any) => number;
export declare class WebhookSender {
    protected webhookConfig: WebhookConfig;
    protected static AGENTS: {
        http: any;
        https: any;
    };
    protected url: string;
    protected logger: Logger;
    protected readonly config: WebhookConfig;
    protected axios: AxiosInstance;
    constructor(loggerBuilder: LoggerBuilder, webhookConfig: WebhookConfig);
    send(json: any): void;
    protected buildAxiosInstance(): AxiosInstance;
    protected getHMACHeaders(body: string): {
        'X-Webhook-Hmac'?: undefined;
        'X-Webhook-Hmac-Algorithm'?: undefined;
    } | {
        'X-Webhook-Hmac': string;
        'X-Webhook-Hmac-Algorithm': string;
    };
    protected getWebhookHeader(json: any): {
        'X-Webhook-Request-Id': any;
        'X-Webhook-Timestamp': any;
    };
    private calculateHmac;
    private buildRetryDelay;
}
