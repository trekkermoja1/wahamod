"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsEnabled = void 0;
const apps_controller_1 = require("./app_sdk/api/apps.controller");
const IAppsService_1 = require("./app_sdk/services/IAppsService");
const AppsEnabledService_1 = require("./app_sdk/services/AppsEnabledService");
const config_1 = require("../core/auth/config");
const AppRuntime_1 = require("./app_sdk/apps/AppRuntime");
const name_1 = require("./app_sdk/apps/name");
const QUEUES_IMPORTS_REQUIRED = [];
const QUEUES_IMPORTS = [];
function getAppModule(name) {
    if (!AppRuntime_1.AppRuntimeConfig.HasApp(name)) {
        return {
            imports: [],
            controllers: [],
            providers: [],
        };
    }
    switch (name) {
        case name_1.AppName.calls:
            return {
                imports: [],
                controllers: [],
                providers: [],
            };
        case name_1.AppName.chatwoot:
            return {
                imports: [],
                controllers: [],
                providers: [],
            };
        default:
            throw Error(`App module not found for ${name}`);
    }
}
exports.AppsEnabled = {
    imports: [
        ...QUEUES_IMPORTS,
    ],
    controllers: [
        apps_controller_1.AppsController,
    ],
    providers: [
        {
            provide: IAppsService_1.AppsService,
            useClass: AppsEnabledService_1.AppsEnabledService,
        },
    ],
};
function checkApiKey() {
    const key = config_1.Auth.key.value;
    if (!key) {
        return;
    }
    const plain = config_1.Auth.keyplain.value;
    if (!plain) {
        throw Error('WAHA_API_KEY set, please provide WAHA_API_KEY_PLAIN when WAHA_APPS_ENABLED');
    }
}
if (AppRuntime_1.AppRuntimeConfig.HasAppsRequiringPlainKey()) {
    checkApiKey();
}
//# sourceMappingURL=apps.module.enabled.js.map