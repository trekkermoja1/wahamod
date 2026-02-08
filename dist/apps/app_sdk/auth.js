"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullAuthMiddleware = BullAuthMiddleware;
const process = require("node:process");
const helpers_1 = require("../../helpers");
const basicAuth = require("express-basic-auth");
const config_1 = require("../../core/auth/config");
function BullAuthMiddleware() {
    let username = config_1.Auth.dashboard.username.value || '';
    let password = config_1.Auth.dashboard.password.value || '';
    if (process.env.WAHA_DASHBOARD_ENABLED) {
        const enabled = (0, helpers_1.parseBool)(process.env.WAHA_DASHBOARD_ENABLED);
        if (!enabled) {
            username = 'admin';
            password = crypto.randomUUID();
        }
    }
    return basicAuth({
        challenge: true,
        users: {
            [String(username)]: String(password),
        },
    });
}
//# sourceMappingURL=auth.js.map