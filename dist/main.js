"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_ws_1 = require("@nestjs/platform-ws");
const webhooks_1 = require("./structures/webhooks");
const logging_1 = require("./utils/logging");
const express_1 = require("express");
const nestjs_pino_1 = require("nestjs-pino");
const nestjs_pino_2 = require("nestjs-pino");
const pino_1 = require("pino");
const config_service_1 = require("./config.service");
const SwaggerConfiguratorCore_1 = require("./core/SwaggerConfiguratorCore");
const AllExceptionsFilter_1 = require("./nestjs/AllExceptionsFilter");
const version_1 = require("./version");
const esm_1 = require("./vendor/esm");
const undici_1 = require("undici");
(0, undici_1.setGlobalDispatcher)(new undici_1.Agent({ connect: { family: 4 } }));
const logger = (0, pino_1.default)({
    level: (0, logging_1.getPinoLogLevel)(),
    transport: (0, logging_1.getPinoTransport)(),
}).child({ name: 'Bootstrap' });
process.on('uncaughtException', (err) => {
    logger.error({ err }, 'Uncaught Exception');
    if (err instanceof Error) {
        logger.error(err.stack);
    }
});
process.on('unhandledRejection', (reason, promise) => {
    logger.error({ promise }, 'Unhandled Rejection at');
    if (reason instanceof Error) {
        logger.error(reason.stack);
    }
    else {
        logger.error({ reason }, 'Unhandled rejection reason');
    }
});
logger.info('NODE - Catching unhandled rejections and exceptions enabled');
process.on('SIGINT', () => {
    logger.info('SIGINT received');
});
process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
});
async function loadModules() {
    await (0, esm_1.loadESMModules)();
    const version = (0, version_1.getWAHAVersion)();
    if (version === version_1.WAHAVersion.CORE) {
        const { AppModuleCore } = await Promise.resolve().then(() => require('./core/app.module.core'));
        return AppModuleCore;
    }
    const { AppModulePlus } = await Promise.resolve().then(() => require('./plus/app.module.plus'));
    return AppModulePlus;
}
async function bootstrap() {
    const version = (0, version_1.getWAHAVersion)();
    logger.info(`WAHA (WhatsApp HTTP API) - Running ${version} version...`);
    const AppModule = await loadModules();
    const httpsOptions = AppModule.getHttpsOptions(logger);
    const app = await core_1.NestFactory.create(AppModule, {
        logger: (0, logging_1.getNestJSLogLevels)(),
        httpsOptions: httpsOptions,
        bufferLogs: true,
        forceCloseConnections: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.useGlobalInterceptors(new nestjs_pino_2.LoggerErrorInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter_1.AllExceptionsFilter());
    app.enableCors();
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: false }));
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    const swaggerConfigurator = new SwaggerConfiguratorCore_1.SwaggerConfiguratorCore(app);
    swaggerConfigurator.configure(webhooks_1.WAHA_WEBHOOKS);
    AppModule.appReady(app, logger);
    app.enableShutdownHooks();
    const config = app.get(config_service_1.WhatsappConfigService);
    await app.listen(config.port);
    logger.info(`WhatsApp HTTP API is running on: ${await app.getUrl()}`);
    logger.info({ version: version_1.VERSION }, 'Environment');
}
bootstrap().catch((error) => {
    logger.error({ error }, `Failed to start WAHA: ${error}`);
    logger.error(error.stack);
    process.exit(1);
});
//# sourceMappingURL=main.js.map