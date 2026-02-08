"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsDisabled = void 0;
const IAppsService_1 = require("./app_sdk/services/IAppsService");
const AppsDisabledService_1 = require("./app_sdk/services/AppsDisabledService");
const apps_controller_1 = require("./app_sdk/api/apps.controller");
const chatwoot_locales_controller_1 = require("./chatwoot/api/chatwoot.locales.controller");
exports.AppsDisabled = {
    providers: [
        {
            provide: IAppsService_1.AppsService,
            useClass: AppsDisabledService_1.AppsDisabledService,
        },
    ],
    imports: [],
    controllers: [apps_controller_1.AppsController, chatwoot_locales_controller_1.ChatwootLocalesController],
};
//# sourceMappingURL=apps.module.disabled.js.map