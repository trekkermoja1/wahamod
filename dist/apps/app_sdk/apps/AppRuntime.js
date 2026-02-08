"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRuntimeConfig = void 0;
const env_1 = require("../env");
const definition_1 = require("./definition");
class AppRuntimeConfigC {
    constructor(apps) {
        this.apps = apps;
    }
    static FromEnv(env) {
        if (!env.enabled) {
            return new AppRuntimeConfigC(null);
        }
        let apps = Object.values(definition_1.APPS);
        if (env.on && env.on.length > 0) {
            apps = apps.filter((app) => env.on.includes(app.name));
        }
        if (env.off && env.off.length > 0) {
            apps = apps.filter((app) => !env.off.includes(app.name));
        }
        return new AppRuntimeConfigC(apps);
    }
    Enabled() {
        return this.apps !== null;
    }
    GetApps() {
        return this.apps || [];
    }
    GetAppsWithMigration() {
        return this.GetApps().filter((app) => app.migrations);
    }
    GetAppsRequiringPlainKey() {
        return this.GetApps().filter((app) => app.plainkey);
    }
    GetAppsRequiringQueue() {
        return this.GetApps().filter((app) => app.queue);
    }
    HasApp(name) {
        return this.GetApps().some((app) => app.name === name);
    }
    HasAppsRequiringPlainKey() {
        return this.GetAppsRequiringPlainKey().length > 0;
    }
    HasAppsRequiringQueue() {
        return this.GetAppsRequiringQueue().length > 0;
    }
}
exports.AppRuntimeConfig = AppRuntimeConfigC.FromEnv(env_1.AppEnv);
//# sourceMappingURL=AppRuntime.js.map