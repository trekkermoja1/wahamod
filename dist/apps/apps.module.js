"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsModuleExports = void 0;
const AppRuntime_1 = require("./app_sdk/apps/AppRuntime");
const apps_module_disabled_1 = require("./apps.module.disabled");
const apps_module_enabled_1 = require("./apps.module.enabled");
exports.AppsModuleExports = AppRuntime_1.AppRuntimeConfig.Enabled()
    ? apps_module_enabled_1.AppsEnabled
    : apps_module_disabled_1.AppsDisabled;
//# sourceMappingURL=apps.module.js.map