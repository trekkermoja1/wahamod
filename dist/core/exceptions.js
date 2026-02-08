"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableInPlusVersion = exports.NotImplementedByEngineError = exports.DOCS_URL = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
exports.DOCS_URL = 'https://waha.devlike.pro/';
const engine = (0, config_1.getEngineName)();
class NotImplementedByEngineError extends common_1.NotImplementedException {
    constructor(msg = '') {
        let error = `The method is not implemented by '${engine}' engine. Check the docs and try another engine: ${exports.DOCS_URL}`;
        if (msg) {
            error = `${msg} ${error}`;
        }
        super(error);
    }
}
exports.NotImplementedByEngineError = NotImplementedByEngineError;
class AvailableInPlusVersion extends common_1.UnprocessableEntityException {
    constructor(feature = 'The feature') {
        super(`${feature} is available only in Plus version for '${engine}' engine. Check this out: ${exports.DOCS_URL}`);
    }
}
exports.AvailableInPlusVersion = AvailableInPlusVersion;
//# sourceMappingURL=exceptions.js.map