"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModuleCore = exports.PROVIDERS_BASE = exports.CONTROLLERS = exports.IMPORTS_CORE = void 0;
const process = require("node:process");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const serve_static_1 = require("@nestjs/serve-static");
const terminus_1 = require("@nestjs/terminus");
const channels_controller_1 = require("../api/channels.controller");
const lids_controller_1 = require("../api/lids.controller");
const profile_controller_1 = require("../api/profile.controller");
const server_controller_1 = require("../api/server.controller");
const server_debug_controller_1 = require("../api/server.debug.controller");
const websocket_gateway_core_1 = require("../api/websocket.gateway.core");
const apps_module_1 = require("../apps/apps.module");
const contacts_session_controller_1 = require("../contacts.session.controller");
const apiKey_strategy_1 = require("./auth/apiKey.strategy");
const auth_1 = require("./auth/auth");
const auth_middleware_1 = require("./auth/auth.middleware");
const basicAuth_1 = require("./auth/basicAuth");
const WebSocketAuth_1 = require("./auth/WebSocketAuth");
const GowsEngineConfigService_1 = require("./config/GowsEngineConfigService");
const WebJSEngineConfigService_1 = require("./config/WebJSEngineConfigService");
const media_local_storage_module_1 = require("./media/local/media.local.storage.module");
const MediaLocalStorageConfig_1 = require("./media/local/MediaLocalStorageConfig");
const ChannelsInfoServiceCore_1 = require("./services/ChannelsInfoServiceCore");
const helpers_1 = require("../helpers");
const BufferJsonReplacerInterceptor_1 = require("../nestjs/BufferJsonReplacerInterceptor");
const HttpsExpress_1 = require("../nestjs/HttpsExpress");
const logging_1 = require("../utils/logging");
const Joi = require("joi");
const nestjs_pino_1 = require("nestjs-pino");
const nestjs_pino_2 = require("nestjs-pino");
const path_1 = require("path");
const auth_controller_1 = require("../api/auth.controller");
const calls_controller_1 = require("../api/calls.controller");
const chats_controller_1 = require("../api/chats.controller");
const chatting_controller_1 = require("../api/chatting.controller");
const contacts_controller_1 = require("../api/contacts.controller");
const events_controller_1 = require("../api/events.controller");
const groups_controller_1 = require("../api/groups.controller");
const health_controller_1 = require("../api/health.controller");
const labels_controller_1 = require("../api/labels.controller");
const media_controller_1 = require("../api/media.controller");
const ping_controller_1 = require("../api/ping.controller");
const presence_controller_1 = require("../api/presence.controller");
const screenshot_controller_1 = require("../api/screenshot.controller");
const sessions_controller_1 = require("../api/sessions.controller");
const status_controller_1 = require("../api/status.controller");
const version_controller_1 = require("../api/version.controller");
const config_service_1 = require("../config.service");
const manager_abc_1 = require("./abc/manager.abc");
const WAHAHealthCheckService_1 = require("./abc/WAHAHealthCheckService");
const ApiKeyAuthFactory_1 = require("./auth/ApiKeyAuthFactory");
const DashboardConfigServiceCore_1 = require("./config/DashboardConfigServiceCore");
const EngineConfigService_1 = require("./config/EngineConfigService");
const SwaggerConfigServiceCore_1 = require("./config/SwaggerConfigServiceCore");
const WAHAHealthCheckServiceCore_1 = require("./health/WAHAHealthCheckServiceCore");
const manager_core_1 = require("./manager.core");
exports.IMPORTS_CORE = [
    ...apps_module_1.AppsModuleExports.imports,
    nestjs_pino_1.LoggerModule.forRoot({
        renameContext: 'name',
        pinoHttp: {
            quietReqLogger: true,
            level: (0, logging_1.getPinoLogLevel)(),
            useLevel: (0, logging_1.getPinoHttpUseLevel)(),
            transport: (0, logging_1.getPinoTransport)(),
            autoLogging: {
                ignore: (req) => {
                    return (req.url.startsWith('/ping') ||
                        req.url.startsWith('/dashboard/') ||
                        req.url.startsWith('/api/files/') ||
                        req.url.startsWith('/api/s3/') ||
                        req.url.startsWith('/jobs/'));
                },
            },
            serializers: {
                req: (req) => ({
                    id: req.id,
                    method: req.method,
                    url: req.url,
                    query: req.query,
                    params: req.params,
                }),
                res: (res) => ({
                    statusCode: res.statusCode,
                }),
            },
        },
    }),
    config_1.ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
            WHATSAPP_API_SCHEMA: Joi.string().valid('http', 'https').default('http'),
        }),
    }),
    serve_static_1.ServeStaticModule.forRootAsync({
        imports: [],
        extraProviders: [DashboardConfigServiceCore_1.DashboardConfigServiceCore],
        inject: [DashboardConfigServiceCore_1.DashboardConfigServiceCore],
        useFactory: (dashboardConfig) => {
            if (!dashboardConfig.enabled) {
                return [];
            }
            return [
                {
                    rootPath: (0, path_1.join)(__dirname, '..', 'dashboard'),
                    serveRoot: dashboardConfig.dashboardUri,
                },
                {
                    rootPath: (0, path_1.join)(__dirname, '..', 'dashboard'),
                    serveRoot: '/dashboard',
                },
            ];
        },
    }),
    passport_1.PassportModule,
    terminus_1.TerminusModule,
];
const IMPORTS_MEDIA = [
    config_1.ConfigModule.forRoot({
        validationSchema: Joi.object({
            WAHA_MEDIA_STORAGE: Joi.string()
                .valid('LOCAL', 'S3', 'POSTGRESQL')
                .default('LOCAL'),
        }),
    }),
    media_local_storage_module_1.MediaLocalStorageModule,
];
const IMPORTS = [...exports.IMPORTS_CORE, ...IMPORTS_MEDIA];
exports.CONTROLLERS = [
    auth_controller_1.AuthController,
    sessions_controller_1.SessionsController,
    profile_controller_1.ProfileController,
    chatting_controller_1.ChattingController,
    chats_controller_1.ChatsController,
    calls_controller_1.CallsController,
    channels_controller_1.ChannelsController,
    status_controller_1.StatusController,
    labels_controller_1.LabelsController,
    contacts_controller_1.ContactsController,
    contacts_session_controller_1.ContactsSessionController,
    lids_controller_1.LidsController,
    groups_controller_1.GroupsController,
    presence_controller_1.PresenceController,
    screenshot_controller_1.ScreenshotController,
    events_controller_1.EventsController,
    ping_controller_1.PingController,
    health_controller_1.HealthController,
    server_controller_1.ServerController,
    server_debug_controller_1.ServerDebugController,
    version_controller_1.VersionController,
    media_controller_1.MediaController,
    ...apps_module_1.AppsModuleExports.controllers,
];
exports.PROVIDERS_BASE = [
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: BufferJsonReplacerInterceptor_1.BufferJsonReplacerInterceptor,
    },
    DashboardConfigServiceCore_1.DashboardConfigServiceCore,
    SwaggerConfigServiceCore_1.SwaggerConfigServiceCore,
    WebJSEngineConfigService_1.WebJSEngineConfigService,
    GowsEngineConfigService_1.GowsEngineConfigService,
    config_service_1.WhatsappConfigService,
    EngineConfigService_1.EngineConfigService,
    websocket_gateway_core_1.WebsocketGatewayCore,
    MediaLocalStorageConfig_1.MediaLocalStorageConfig,
    WebSocketAuth_1.WebSocketAuth,
    apiKey_strategy_1.ApiKeyStrategy,
    {
        provide: auth_1.IApiKeyAuth,
        useFactory: ApiKeyAuthFactory_1.ApiKeyAuthFactory,
        inject: [config_service_1.WhatsappConfigService, nestjs_pino_2.Logger],
    },
    ...apps_module_1.AppsModuleExports.providers,
];
const PROVIDERS = [
    {
        provide: manager_abc_1.SessionManager,
        useClass: manager_core_1.SessionManagerCore,
    },
    {
        provide: WAHAHealthCheckService_1.WAHAHealthCheckService,
        useClass: WAHAHealthCheckServiceCore_1.WAHAHealthCheckServiceCore,
    },
    ChannelsInfoServiceCore_1.ChannelsInfoServiceCore,
    ...exports.PROVIDERS_BASE,
];
let AppModuleCore = class AppModuleCore {
    constructor(config, dashboardConfig) {
        this.config = config;
        this.dashboardConfig = dashboardConfig;
        this.startTimestamp = Date.now();
    }
    static getHttpsOptions(logger) {
        const httpsEnabled = (0, helpers_1.parseBool)(process.env.WAHA_HTTPS_ENABLED);
        if (!httpsEnabled) {
            return undefined;
        }
        const httpsExpress = new HttpsExpress_1.HttpsExpress(logger);
        return httpsExpress.readSync();
    }
    static appReady(app, logger) {
        const httpsEnabled = (0, helpers_1.parseBool)(process.env.WAHA_HTTPS_ENABLED);
        if (!httpsEnabled) {
            return;
        }
        const httpd = app.getHttpServer();
        const httpsExpress = new HttpsExpress_1.HttpsExpress(logger);
        httpsExpress.watchCertChanges(httpd);
    }
    configure(consumer) {
        const exclude = this.config.getExcludedPaths();
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude(...exclude)
            .forRoutes('api', 'health', 'ws');
        const dashboardCredentials = this.dashboardConfig.credentials;
        if (dashboardCredentials) {
            const username = dashboardCredentials[0];
            const password = dashboardCredentials[1];
            consumer
                .apply((0, basicAuth_1.BasicAuthFunction)(username, password))
                .forRoutes('dashboard');
        }
    }
};
exports.AppModuleCore = AppModuleCore;
exports.AppModuleCore = AppModuleCore = __decorate([
    (0, common_1.Module)({
        imports: IMPORTS,
        controllers: exports.CONTROLLERS,
        providers: PROVIDERS,
    }),
    __metadata("design:paramtypes", [config_service_1.WhatsappConfigService,
        DashboardConfigServiceCore_1.DashboardConfigServiceCore])
], AppModuleCore);
//# sourceMappingURL=app.module.core.js.map