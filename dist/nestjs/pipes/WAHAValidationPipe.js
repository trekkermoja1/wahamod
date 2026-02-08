"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAHAValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("../../helpers");
const WAHA_HTTP_STRICT_MODE = (0, helpers_1.parseBool)(process.env.WAHA_HTTP_STRICT_MODE);
class WAHAValidationPipe extends common_1.ValidationPipe {
    constructor(options) {
        options = options || {};
        options.transform = true;
        options.whitelist = true;
        options.forbidNonWhitelisted = WAHA_HTTP_STRICT_MODE;
        super(options);
    }
}
exports.WAHAValidationPipe = WAHAValidationPipe;
//# sourceMappingURL=WAHAValidationPipe.js.map