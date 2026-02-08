"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAHA_CLIENT_BROWSER_NAME = exports.WAHA_CLIENT_DEVICE_NAME = exports.KNEX_SQLITE_CLIENT = exports.PRESENCE_AUTO_ONLINE_DURATION_SECONDS = exports.PRESENCE_AUTO_ONLINE = void 0;
const helpers_1 = require("../helpers");
exports.PRESENCE_AUTO_ONLINE = process.env.WAHA_PRESENCE_AUTO_ONLINE
    ? (0, helpers_1.parseBool)(process.env.WAHA_PRESENCE_AUTO_ONLINE)
    : true;
exports.PRESENCE_AUTO_ONLINE_DURATION_SECONDS = parseInt(process.env.WAHA_PRESENCE_AUTO_ONLINE_DURATION_SECONDS) || 25;
let KNEX_SQLITE_CLIENT = process.env.WAHA_SQLITE_ENGINE;
exports.KNEX_SQLITE_CLIENT = KNEX_SQLITE_CLIENT;
if (KNEX_SQLITE_CLIENT != 'sqlite3' && KNEX_SQLITE_CLIENT != 'better-sqlite3') {
    exports.KNEX_SQLITE_CLIENT = KNEX_SQLITE_CLIENT = 'sqlite3';
}
exports.WAHA_CLIENT_DEVICE_NAME = process.env.WAHA_CLIENT_DEVICE_NAME || null;
exports.WAHA_CLIENT_BROWSER_NAME = process.env.WAHA_CLIENT_BROWSER_NAME || null;
//# sourceMappingURL=env.js.map