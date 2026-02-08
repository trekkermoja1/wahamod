"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyAuthFactory = ApiKeyAuthFactory;
const auth_1 = require("./auth");
const config_1 = require("./config");
function ApiKeyAuthFactory(config, logger) {
    setTimeout(() => {
        (0, config_1.ReportGeneratedValue)();
    }, 4000);
    const apiKey = config.getApiKey();
    if (!apiKey) {
        setTimeout(() => {
            logger.warn('🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫');
            logger.warn('WARNING: No API key detected. This is a security risk.');
            logger.warn('Your API is publicly accessible without any authentication.');
            logger.warn('To secure your API, set environment variable: WAHA_API_KEY=your_api_key');
            logger.warn('For better security, use WAHA_API_KEY=sha512:{SHA512_HASH_FOR_YOUR_API_KEY}');
            logger.warn('🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫');
        }, 3000);
        return new auth_1.NoAuth();
    }
    if (apiKey.startsWith('sha512:')) {
        const hash = apiKey.slice(7);
        return new auth_1.HashAuth(hash, 'sha512');
    }
    return new auth_1.PlainApiKeyAuth(apiKey);
}
//# sourceMappingURL=ApiKeyAuthFactory.js.map