"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookSender = void 0;
exports.exponentialDelay = exponentialDelay;
const enums_dto_1 = require("../../../structures/enums.dto");
const webhooks_config_dto_1 = require("../../../structures/webhooks.config.dto");
const version_1 = require("../../../version");
const axios_1 = require("axios");
const axios_retry_1 = require("axios-retry");
const crypto = require("crypto");
const uniqid = require('uniqid');
const HttpAgent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;
const DEFAULT_RETRY_DELAY_SECONDS = 2;
const DEFAULT_RETRY_ATTEMPTS = 15;
const DEFAULT_HMAC_ALGORITHM = 'sha512';
function noDelay(_retryNumber = 0, error) {
    return Math.max(0, (0, axios_retry_1.retryAfter)(error));
}
function constantDelay(delayFactor) {
    return (_retryNumber = 0, error = undefined) => {
        return Math.max(delayFactor, (0, axios_retry_1.retryAfter)(error));
    };
}
function exponentialDelay(delayFactor) {
    return (retryNumber = 0, error = undefined) => {
        const calculatedDelay = 2 ** retryNumber * delayFactor;
        const delay = Math.max(calculatedDelay, (0, axios_retry_1.retryAfter)(error));
        const randomSum = delay * 0.2 * Math.random();
        return delay + randomSum;
    };
}
class WebhookSender {
    constructor(loggerBuilder, webhookConfig) {
        this.webhookConfig = webhookConfig;
        this.url = webhookConfig.url;
        this.logger = loggerBuilder.child({ name: WebhookSender.name });
        this.config = webhookConfig;
        this.axios = this.buildAxiosInstance();
    }
    send(json) {
        const body = JSON.stringify(json);
        const headers = {
            'content-type': 'application/json',
        };
        Object.assign(headers, this.getWebhookHeader(json));
        Object.assign(headers, this.getHMACHeaders(body));
        const ctx = {
            id: headers['X-Webhook-Request-Id'],
            ['event.id']: json.id,
            event: json.event,
            url: this.url,
        };
        this.logger.info(ctx, `Sending POST...`);
        this.logger.debug(ctx, `POST DATA`);
        this.axios
            .post(this.url, body, { headers: headers })
            .then((response) => {
            this.logger.info(ctx, `POST request was sent with status code: ${response.status}`);
            this.logger.debug(Object.assign(Object.assign({}, ctx), { body: response.data }), `Response`);
        })
            .catch((error) => {
            var _a;
            this.logger.error(Object.assign(Object.assign({}, ctx), { error: error.message, data: (_a = error.response) === null || _a === void 0 ? void 0 : _a.data }), `POST request failed: ${error.message}`);
        });
    }
    buildAxiosInstance() {
        var _a, _b, _c, _d, _e;
        const customHeaders = this.config.customHeaders || [];
        const headers = {
            'content-type': 'application/json',
            'User-Agent': `WAHA/${version_1.VERSION.version}`,
        };
        customHeaders.forEach((header) => {
            headers[header.name] = header.value;
        });
        const attempts = (_b = (_a = this.config.retries) === null || _a === void 0 ? void 0 : _a.attempts) !== null && _b !== void 0 ? _b : DEFAULT_RETRY_ATTEMPTS;
        const delaySeconds = (_d = (_c = this.config.retries) === null || _c === void 0 ? void 0 : _c.delaySeconds) !== null && _d !== void 0 ? _d : DEFAULT_RETRY_DELAY_SECONDS;
        const delayMs = delaySeconds * enums_dto_1.SECOND;
        const policy = (_e = this.config.retries) === null || _e === void 0 ? void 0 : _e.policy;
        const retryDelay = this.buildRetryDelay(policy, delayMs);
        const instance = axios_1.default.create({
            headers: headers,
            httpAgent: WebhookSender.AGENTS.http,
            httpsAgent: WebhookSender.AGENTS.https,
        });
        (0, axios_retry_1.default)(instance, {
            retries: attempts,
            retryDelay: retryDelay,
            retryCondition: (error) => true,
            onRetry: (retryCount, error, requestConfig) => {
                this.logger.warn({
                    id: requestConfig.headers['X-Webhook-Request-Id'],
                }, `Error sending POST request: '${error.message}'. Retrying ${retryCount}/${attempts}...`);
            },
        });
        return instance;
    }
    getHMACHeaders(body) {
        const hmac = this.calculateHmac(body, DEFAULT_HMAC_ALGORITHM);
        if (!hmac) {
            return {};
        }
        return {
            'X-Webhook-Hmac': hmac,
            'X-Webhook-Hmac-Algorithm': DEFAULT_HMAC_ALGORITHM,
        };
    }
    getWebhookHeader(json) {
        var _a;
        const timestamp = ((_a = json.timestamp) === null || _a === void 0 ? void 0 : _a.toString()) || Date.now().toString();
        return {
            'X-Webhook-Request-Id': uniqid(),
            'X-Webhook-Timestamp': timestamp,
        };
    }
    calculateHmac(body, algorithm) {
        if (!this.config.hmac || !this.config.hmac.key) {
            return undefined;
        }
        return crypto
            .createHmac(algorithm, this.config.hmac.key)
            .update(body)
            .digest('hex');
    }
    buildRetryDelay(policy, ms) {
        if (!ms) {
            this.logger.debug(`Using no delay, because delaySeconds set to 0`);
            return noDelay;
        }
        switch (policy) {
            case webhooks_config_dto_1.RetryPolicy.CONSTANT:
                this.logger.debug(`Using constant delay with '${ms}' ms factor`);
                return constantDelay(ms);
            case webhooks_config_dto_1.RetryPolicy.LINEAR:
                this.logger.debug(`Using linear delay with '${ms}' ms factor`);
                return axios_retry_1.default.linearDelay(ms);
            case webhooks_config_dto_1.RetryPolicy.EXPONENTIAL:
                this.logger.debug(`Using exponential delay with '${ms}' ms factor`);
                return exponentialDelay(ms);
            default:
                this.logger.debug('No delay policy specified, using constant delay');
                return constantDelay(ms);
        }
    }
}
exports.WebhookSender = WebhookSender;
WebhookSender.AGENTS = {
    http: new HttpAgent({}),
    https: new HttpsAgent({ rejectUnauthorized: false }),
};
//# sourceMappingURL=WebhookSender.js.map