"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEnv = void 0;
const helpers_1 = require("../../helpers");
function parseCommaSeparatedList(value) {
    if (!value) {
        return null;
    }
    return value.split(',').map((item) => item.trim());
}
exports.AppEnv = {
    enabled: (0, helpers_1.parseBool)(process.env.WAHA_APPS_ENABLED),
    on: parseCommaSeparatedList(process.env.WAHA_APPS_ON),
    off: parseCommaSeparatedList(process.env.WAHA_APPS_OFF),
};
//# sourceMappingURL=env.js.map