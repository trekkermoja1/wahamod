"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
const path = require("node:path");
const AppRuntime_1 = require("./apps/AppRuntime");
function migrateSDK(knex) {
    const config = {
        directory: `${__dirname}/migrations`,
        tableName: 'apps_migrations',
        loadExtensions: ['.js'],
    };
    return knex.migrate.latest(config);
}
function migrateApp(knex, app) {
    const appsDirectory = path.join(__dirname, '..', '..', 'apps');
    const directory = path.join(appsDirectory, app, 'migrations');
    const config = {
        directory: directory,
        tableName: `app_${app}_migrations`,
        loadExtensions: ['.js'],
    };
    return knex.migrate.latest(config);
}
async function migrate(knex) {
    await migrateSDK(knex);
    for (const app of AppRuntime_1.AppRuntimeConfig.GetAppsWithMigration()) {
        await migrateApp(knex, app.name);
    }
}
//# sourceMappingURL=migrations.js.map