"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalWebhookConfigConfig = void 0;
const webhooks_config_dto_1 = require("../../structures/webhooks.config.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Env;
(function (Env) {
    Env["WHATSAPP_HOOK_URL"] = "WHATSAPP_HOOK_URL";
    Env["WHATSAPP_HOOK_EVENTS"] = "WHATSAPP_HOOK_EVENTS";
    Env["WHATSAPP_HOOK_RETRIES_POLICY"] = "WHATSAPP_HOOK_RETRIES_POLICY";
    Env["WHATSAPP_HOOK_RETRIES_DELAY_SECONDS"] = "WHATSAPP_HOOK_RETRIES_DELAY_SECONDS";
    Env["WHATSAPP_HOOK_RETRIES_ATTEMPTS"] = "WHATSAPP_HOOK_RETRIES_ATTEMPTS";
    Env["WHATSAPP_HOOK_HMAC_KEY"] = "WHATSAPP_HOOK_HMAC_KEY";
    Env["WHATSAPP_HOOK_CUSTOM_HEADERS"] = "WHATSAPP_HOOK_CUSTOM_HEADERS";
})(Env || (Env = {}));
class GlobalWebhookConfigConfig {
    constructor(configService) {
        this.configService = configService;
        this._config = null;
    }
    getUrl() {
        return this.configService.get(Env.WHATSAPP_HOOK_URL);
    }
    getEvents() {
        const value = this.configService.get(Env.WHATSAPP_HOOK_EVENTS, '');
        return value ? value.split(',') : [];
    }
    getHmac() {
        const key = this.configService.get(Env.WHATSAPP_HOOK_HMAC_KEY, '');
        if (!key) {
            return null;
        }
        return {
            key: key,
        };
    }
    getRetries() {
        const policy = this.configService.get(Env.WHATSAPP_HOOK_RETRIES_POLICY, null);
        const delaySeconds = this.configService.get(Env.WHATSAPP_HOOK_RETRIES_DELAY_SECONDS, null);
        const attempts = this.configService.get(Env.WHATSAPP_HOOK_RETRIES_ATTEMPTS, null);
        if (!policy && !delaySeconds && !attempts) {
            return null;
        }
        return {
            policy: policy,
            delaySeconds: delaySeconds,
            attempts: attempts,
        };
    }
    getCustomHeaders() {
        const value = this.configService.get(Env.WHATSAPP_HOOK_CUSTOM_HEADERS, '');
        if (!value) {
            return [];
        }
        const headers = value.split(';');
        return headers.map((header) => {
            const parts = header.split(':');
            if (parts.length !== 2) {
                throw new Error(`${Env.WHATSAPP_HOOK_CUSTOM_HEADERS} - Invalid custom header, no ':' found in '${header}'`);
            }
            return {
                name: parts[0],
                value: parts[1],
            };
        });
    }
    get config() {
        if (!this._config) {
            this._config = this.parseWebhookConfig();
        }
        return this._config;
    }
    validateConfig() {
        const config = this.parseWebhookConfig();
        if (!config) {
            return null;
        }
        const errors = (0, class_validator_1.validateSync)(config);
        if (errors.length > 0) {
            return this.formatErrors([], errors, []).join('\n');
        }
        return;
    }
    getEnv(key) {
        const keys = {
            url: Env.WHATSAPP_HOOK_URL,
            events: Env.WHATSAPP_HOOK_EVENTS,
            'retries.policy': Env.WHATSAPP_HOOK_RETRIES_POLICY,
            'retries.delaySeconds': Env.WHATSAPP_HOOK_RETRIES_DELAY_SECONDS,
            'retries.attempts': Env.WHATSAPP_HOOK_RETRIES_ATTEMPTS,
            'hmac.key': Env.WHATSAPP_HOOK_HMAC_KEY,
        };
        return keys[key] || null;
    }
    formatErrors(lines, errors, path) {
        for (const err of errors) {
            path = [...path, err.property];
            for (const key in err.constraints) {
                if (!err.constraints.hasOwnProperty(key)) {
                    continue;
                }
                const property = path.join('.');
                const env = this.getEnv(property);
                if (env) {
                    const value = this.configService.get(env, '');
                    const line = `- ${env} (${property}): '${value}' => '${err.value}' - ${err.constraints[key]}`;
                    lines.push(line);
                }
                else {
                    const line = `- ${property}: '${err.value}' - ${err.constraints[key]}`;
                    lines.push(line);
                }
            }
            if (err.children) {
                this.formatErrors(lines, err.children, path);
            }
        }
        return lines;
    }
    parseWebhookConfig() {
        const url = this.getUrl();
        const events = this.getEvents();
        if (!url || events.length === 0) {
            return null;
        }
        const data = {
            url: url,
            events: events,
            hmac: this.getHmac(),
            retries: this.getRetries(),
            customHeaders: this.getCustomHeaders(),
        };
        return (0, class_transformer_1.plainToInstance)(webhooks_config_dto_1.WebhookConfig, data, {
            enableImplicitConversion: true,
        });
    }
}
exports.GlobalWebhookConfigConfig = GlobalWebhookConfigConfig;
//# sourceMappingURL=GlobalWebhookConfig.js.map