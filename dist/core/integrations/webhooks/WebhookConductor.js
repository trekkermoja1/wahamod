"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookConductor = void 0;
const manager_abc_1 = require("../../abc/manager.abc");
const WebhookSender_1 = require("./WebhookSender");
const enums_dto_1 = require("../../../structures/enums.dto");
const events_1 = require("../../../utils/events");
class WebhookConductor {
    constructor(loggerBuilder) {
        this.loggerBuilder = loggerBuilder;
        this.eventUnmask = new events_1.EventWildUnmask(enums_dto_1.WAHAEvents, enums_dto_1.WAHAEventsWild);
        this.logger = loggerBuilder.child({ name: WebhookConductor.name });
    }
    buildSender(webhookConfig) {
        return new WebhookSender_1.WebhookSender(this.loggerBuilder, webhookConfig);
    }
    getSuitableEvents(events) {
        return this.eventUnmask.unmask(events);
    }
    configure(session, webhooks) {
        for (const webhookConfig of webhooks) {
            this.configureSingleWebhook(session, webhookConfig);
        }
    }
    configureSingleWebhook(session, webhook) {
        if (!webhook || !webhook.url || webhook.events.length === 0) {
            return;
        }
        const url = webhook.url;
        this.logger.info(`Configuring webhooks for ${url}...`);
        const events = this.getSuitableEvents(webhook.events);
        const sender = this.buildSender(webhook);
        for (const event of events) {
            const obs$ = session.getEventObservable(event);
            obs$.subscribe((payload) => {
                const data = (0, manager_abc_1.populateSessionInfo)(event, session)(payload);
                sender.send(data);
            });
            this.logger.debug(`Event '${event}' is enabled for url: ${url}`);
        }
        this.logger.info(`Webhooks were configured for ${url}.`);
    }
}
exports.WebhookConductor = WebhookConductor;
//# sourceMappingURL=WebhookConductor.js.map