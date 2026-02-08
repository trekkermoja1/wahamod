"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TZ = exports.APPS_CHATWOOT_LANGUAGES_FOLDER = exports.CHATWOOT_MESSAGE_CALENDAR_THRESHOLD_SECONDS = exports.CHATWOOT_COMMAND_PREFIX = void 0;
exports.CHATWOOT_COMMAND_PREFIX = process.env.WAHA_CHATWOOT_COMMAND_PREFIX || 'wa/';
exports.CHATWOOT_MESSAGE_CALENDAR_THRESHOLD_SECONDS = parseInt(process.env.WAHA_CHATWOOT_MESSAGE_CALENDAR_THRESHOLD_SECONDS) || 600;
exports.APPS_CHATWOOT_LANGUAGES_FOLDER = (_a = process.env.WAHA_APPS_CHATWOOT_LANGUAGES_FOLDER) === null || _a === void 0 ? void 0 : _a.trim();
exports.TZ = process.env.TZ;
//# sourceMappingURL=env.js.map