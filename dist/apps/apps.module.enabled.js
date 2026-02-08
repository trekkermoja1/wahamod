"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsEnabled = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const rmutex_1 = require("../modules/rmutex");
const nestjs_1 = require("@bull-board/nestjs");
const express_1 = require("@bull-board/express");
const auth_1 = require("./app_sdk/auth");
const chatwoot_module_1 = require("./chatwoot/chatwoot.module");
const apps_controller_1 = require("./app_sdk/api/apps.controller");
const calls_module_1 = require("./calls/calls.module");
const IAppsService_1 = require("./app_sdk/services/IAppsService");
const AppsEnabledService_1 = require("./app_sdk/services/AppsEnabledService");
const config_1 = require("../core/auth/config");
const AppRuntime_1 = require("./app_sdk/apps/AppRuntime");
const name_1 = require("./app_sdk/apps/name");
const QUEUES_IMPORTS_REQUIRED = [
    bullmq_1.BullModule.forRoot({
        connection: {
            url: process.env.REDIS_URL || 'redis://:redis@localhost:6379',
            maxRetriesPerRequest: null,
        },
        prefix: `waha-${process.env.WAHA_WORKER_ID}`,
    }),
    nestjs_redis_1.RedisModule.forRoot({
        closeClient: true,
        config: {
            url: process.env.REDIS_URL || 'redis://:redis@localhost:6379',
            onClientCreated: async (client) => {
                try {
                    await client.ping();
                }
                catch (err) {
                    console.error('[Redis] Connection failed:', err);
                    process.exit(1);
                }
            },
        },
    }),
    rmutex_1.RMutexModule,
    nestjs_1.BullBoardModule.forRoot({
        route: '/jobs',
        adapter: express_1.ExpressAdapter,
        middleware: (0, auth_1.BullAuthMiddleware)(),
        boardOptions: {
            uiConfig: {
                boardTitle: 'Jobs | WAHA',
                boardLogo: {
                    path: '/dashboard/layout/images/logo-white.svg',
                    width: 35,
                    height: 35,
                },
                favIcon: {
                    default: '/dashboard/favicon.ico',
                    alternative: '/dashboard/favicon.ico',
                },
                miscLinks: [
                    {
                        text: '📊 Dashboard',
                        url: '/dashboard',
                    },
                    {
                        text: '📚 Swagger (OpenAPI)',
                        url: '/',
                    },
                ],
            },
        },
    }),
];
const QUEUES_IMPORTS = AppRuntime_1.AppRuntimeConfig.HasAppsRequiringQueue()
    ? QUEUES_IMPORTS_REQUIRED
    : [];
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
            return calls_module_1.CallsAppExports;
        case name_1.AppName.chatwoot:
            return chatwoot_module_1.ChatWootExports;
        default:
            throw Error(`App module not found for ${name}`);
    }
}
exports.AppsEnabled = {
    imports: [
        ...QUEUES_IMPORTS,
        ...getAppModule(name_1.AppName.chatwoot).imports,
        ...getAppModule(name_1.AppName.calls).imports,
    ],
    controllers: [
        apps_controller_1.AppsController,
        ...getAppModule(name_1.AppName.chatwoot).controllers,
        ...getAppModule(name_1.AppName.calls).controllers,
    ],
    providers: [
        {
            provide: IAppsService_1.AppsService,
            useClass: AppsEnabledService_1.AppsEnabledService,
        },
        ...getAppModule(name_1.AppName.calls).providers,
        ...getAppModule(name_1.AppName.chatwoot).providers,
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