import { ConfigService } from '@nestjs/config';
import { WebhookConfig } from '@waha/structures/webhooks.config.dto';
export declare class GlobalWebhookConfigConfig {
    private configService;
    protected _config: WebhookConfig | null;
    constructor(configService: ConfigService);
    private getUrl;
    private getEvents;
    private getHmac;
    private getRetries;
    private getCustomHeaders;
    get config(): WebhookConfig;
    validateConfig(): string | null;
    private getEnv;
    private formatErrors;
    private parseWebhookConfig;
}
