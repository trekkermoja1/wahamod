import { WhatsappSession } from '@waha/core/abc/session.abc';
import { WebhookSender } from '@waha/core/integrations/webhooks/WebhookSender';
import { WebhookConfig } from '@waha/structures/webhooks.config.dto';
import { LoggerBuilder } from '@waha/utils/logging';
export declare class WebhookConductor {
    protected loggerBuilder: LoggerBuilder;
    private logger;
    private eventUnmask;
    constructor(loggerBuilder: LoggerBuilder);
    protected buildSender(webhookConfig: WebhookConfig): WebhookSender;
    private getSuitableEvents;
    configure(session: WhatsappSession, webhooks: WebhookConfig[]): void;
    private configureSingleWebhook;
}
