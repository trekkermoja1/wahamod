"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEngineName = exports.IsChrome = exports.VERSION = exports.WAHAVersion = void 0;
exports.getWAHAVersion = getWAHAVersion;
const config_1 = require("./config");
Object.defineProperty(exports, "getEngineName", { enumerable: true, get: function () { return config_1.getEngineName; } });
const session_abc_1 = require("./core/abc/session.abc");
const enums_dto_1 = require("./structures/enums.dto");
const fs = require('fs');
var WAHAVersion;
(function (WAHAVersion) {
    WAHAVersion["PLUS"] = "PLUS";
    WAHAVersion["CORE"] = "CORE";
})(WAHAVersion || (exports.WAHAVersion = WAHAVersion = {}));
function getWAHAVersion() {
    return WAHAVersion.PLUS;
}
function getBrowser() {
    return (0, config_1.getEngineName)() === enums_dto_1.WAHAEngine.WEBJS
        ? (0, session_abc_1.getBrowserExecutablePath)()
        : null;
}
function getPlatform() {
    return `${process.platform}/${process.arch}`;
}
exports.VERSION = {
    version: '2025.12.3',
    engine: (0, config_1.getEngineName)(),
    tier: getWAHAVersion(),
    browser: getBrowser(),
    platform: getPlatform(),
};
exports.IsChrome = (_a = exports.VERSION.browser) === null || _a === void 0 ? void 0 : _a.includes('chrome');
//# sourceMappingURL=version.js.map