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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManagerCore = void 0;
const common_1 = require("@nestjs/common");
const IAppsService_1 = require("../apps/app_sdk/services/IAppsService");
const GowsEngineConfigService_1 = require("./config/GowsEngineConfigService");
const WebJSEngineConfigService_1 = require("./config/WebJSEngineConfigService");
const session_gows_core_1 = require("./engines/gows/session.gows.core");
const WebhookConductor_1 = require("./integrations/webhooks/WebhookConductor");
const MediaStorageFactory_1 = require("./media/MediaStorageFactory");
const DefaultMap_1 = require("../utils/DefaultMap");
const logging_1 = require("../utils/logging");
const promiseTimeout_1 = require("../utils/promiseTimeout");
const complete_1 = require("../utils/reactive/complete");
const SwitchObservable_1 = require("../utils/reactive/SwitchObservable");
const nestjs_pino_1 = require("nestjs-pino");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const config_service_1 = require("../config.service");
const enums_dto_1 = require("../structures/enums.dto");
const manager_abc_1 = require("./abc/manager.abc");
const EngineConfigService_1 = require("./config/EngineConfigService");
const session_noweb_core_1 = require("./engines/noweb/session.noweb.core");
const session_webjs_core_1 = require("./engines/webjs/session.webjs.core");
const helpers_proxy_1 = require("./helpers.proxy");
const MediaManager_1 = require("./media/MediaManager");
const LocalSessionAuthRepository_1 = require("./storage/LocalSessionAuthRepository");
const LocalStoreCore_1 = require("./storage/LocalStoreCore");
let SessionManagerCore = class SessionManagerCore extends manager_abc_1.SessionManager {
    constructor(config, engineConfigService, webjsEngineConfigService, gowsConfigService, log, mediaStorageFactory, appsService) {
        super(log, config, gowsConfigService, appsService);
        this.engineConfigService = engineConfigService;
        this.webjsEngineConfigService = webjsEngineConfigService;
        this.mediaStorageFactory = mediaStorageFactory;
        this.SESSION_STOP_TIMEOUT = 3000;
        this.sessions = new Map();
        this.sessionConfigs = new Map();
        const engineName = this.engineConfigService.getDefaultEngineName();
        this.EngineClass = this.getEngine(engineName);
        this.engineBootstrap = this.getEngineBootstrap(engineName);
        this.events2 = new DefaultMap_1.DefaultMap((key) => new SwitchObservable_1.SwitchObservable((obs$) => {
            return obs$.pipe((0, rxjs_1.retry)(), (0, rxjs_1.share)());
        }));
        this.store = new LocalStoreCore_1.LocalStoreCore(engineName.toLowerCase());
        this.sessionAuthRepository = new LocalSessionAuthRepository_1.LocalSessionAuthRepository(this.store);
    }
    getEngine(engine) {
        if (engine === enums_dto_1.WAHAEngine.WEBJS) {
            return session_webjs_core_1.WhatsappSessionWebJSCore;
        }
        else if (engine === enums_dto_1.WAHAEngine.NOWEB) {
            return session_noweb_core_1.WhatsappSessionNoWebCore;
        }
        else if (engine === enums_dto_1.WAHAEngine.GOWS) {
            return session_gows_core_1.WhatsappSessionGoWSCore;
        }
        else {
            throw new common_1.NotFoundException(`Unknown whatsapp engine '${engine}'.`);
        }
    }
    async beforeApplicationShutdown(signal) {
        for (const [name, session] of this.sessions.entries()) {
            await this.stop(name, true);
        }
        this.stopEvents();
        await this.engineBootstrap.shutdown();
    }
    async onApplicationBootstrap() {
        await this.engineBootstrap.bootstrap();
        for (const [name, config] of this.sessionConfigs.entries()) {
            if (!this.sessions.has(name)) {
                this.log.info(`Removing ghost session config: ${name}`);
                this.sessionConfigs.delete(name);
            }
        }
        this.startPredefinedSessions();
    }
    async exists(name) {
        return this.sessions.has(name);
    }
    isRunning(name) {
        return this.sessions.has(name);
    }
    async upsert(name, config) {
        this.sessionConfigs.set(name, config || {});
    }
    async start(name) {
        if (this.sessions.has(name)) {
            throw new common_1.UnprocessableEntityException(`Session '${name}' is already started.`);
        }
        this.log.info({ session: name }, `Starting session...`);
        const logger = this.log.logger.child({ session: name });
        const sessionConfig = this.sessionConfigs.get(name);
        logger.level = (0, logging_1.getPinoLogLevel)(sessionConfig === null || sessionConfig === void 0 ? void 0 : sessionConfig.debug);
        const loggerBuilder = logger;
        const storage = await this.mediaStorageFactory.build(name, loggerBuilder.child({ name: 'Storage' }));
        await storage.init();
        const mediaManager = new MediaManager_1.MediaManager(storage, this.config.mimetypes, loggerBuilder.child({ name: 'MediaManager' }));
        const webhook = new WebhookConductor_1.WebhookConductor(loggerBuilder);
        const proxyConfig = this.getProxyConfig(name);
        const sessionParams = {
            name,
            mediaManager,
            loggerBuilder,
            printQR: this.engineConfigService.shouldPrintQR,
            sessionStore: this.store,
            proxyConfig: proxyConfig,
            sessionConfig: sessionConfig,
            ignore: this.ignoreChatsConfig(sessionConfig),
        };
        if (this.EngineClass === session_webjs_core_1.WhatsappSessionWebJSCore) {
            sessionParams.engineConfig = this.webjsEngineConfigService.getConfig();
        }
        else if (this.EngineClass === session_gows_core_1.WhatsappSessionGoWSCore) {
            sessionParams.engineConfig = this.gowsConfigService.getConfig();
        }
        await this.sessionAuthRepository.init(name);
        const session = new this.EngineClass(sessionParams);
        this.sessions.set(name, session);
        this.updateSession(name);
        const webhooks = this.getWebhooks(name);
        webhook.configure(session, webhooks);
        try {
            await this.appsService.beforeSessionStart(session, this.store);
        }
        catch (e) {
            logger.error(`Apps Error: ${e}`);
            session.status = enums_dto_1.WAHASessionStatus.FAILED;
        }
        if (session.status !== enums_dto_1.WAHASessionStatus.FAILED) {
            await session.start();
            logger.info('Session has been started.');
            await this.appsService.afterSessionStart(session, this.store);
        }
        await this.appsService.afterSessionStart(session, this.store);
        return {
            name: session.name,
            status: session.status,
            config: session.sessionConfig,
        };
    }
    updateSession(name) {
        const session = this.sessions.get(name);
        if (!session) {
            return;
        }
        for (const eventName in enums_dto_1.WAHAEvents) {
            const event = enums_dto_1.WAHAEvents[eventName];
            const stream$ = session
                .getEventObservable(event)
                .pipe((0, operators_1.map)((0, manager_abc_1.populateSessionInfo)(event, session)));
            this.events2.get(event).switch(stream$);
        }
    }
    getSessionEvent(session, event) {
        return this.events2.get(event);
    }
    async stop(name, silent) {
        if (!this.isRunning(name)) {
            this.log.debug({ session: name }, `Session is not running.`);
            return;
        }
        this.log.info({ session: name }, `Stopping session...`);
        try {
            const session = this.getSession(name);
            await session.stop();
        }
        catch (err) {
            this.log.warn(`Error while stopping session '${name}'`);
            if (!silent) {
                throw err;
            }
        }
        this.log.info({ session: name }, `Session has been stopped.`);
        this.sessions.delete(name);
        this.updateSession(name);
        await (0, promiseTimeout_1.sleep)(this.SESSION_STOP_TIMEOUT);
    }
    async unpair(name) {
        const session = this.sessions.get(name);
        if (!session) {
            return;
        }
        this.log.info({ session: name }, 'Unpairing the device from account...');
        await session.unpair().catch((err) => {
            this.log.warn(`Error while unpairing from device: ${err}`);
        });
        await (0, promiseTimeout_1.sleep)(1000);
    }
    async logout(name) {
        await this.sessionAuthRepository.clean(name);
    }
    async delete(name) {
        await this.appsService.removeBySession(this, name);
        this.sessions.delete(name);
        this.sessionConfigs.delete(name);
        this.updateSession(name);
    }
    getWebhooks(name) {
        let webhooks = [];
        const sessionConfig = this.sessionConfigs.get(name);
        if (sessionConfig === null || sessionConfig === void 0 ? void 0 : sessionConfig.webhooks) {
            webhooks = webhooks.concat(sessionConfig.webhooks);
        }
        const globalWebhookConfig = this.config.getWebhookConfig();
        if (globalWebhookConfig) {
            webhooks.push(globalWebhookConfig);
        }
        return webhooks;
    }
    getProxyConfig(name) {
        const sessionConfig = this.sessionConfigs.get(name);
        if (sessionConfig === null || sessionConfig === void 0 ? void 0 : sessionConfig.proxy) {
            return sessionConfig.proxy;
        }
        const session = this.sessions.get(name);
        if (!session) {
            return undefined;
        }
        const sessionsObj = {};
        this.sessions.forEach((s, n) => {
            sessionsObj[n] = s;
        });
        return (0, helpers_proxy_1.getProxyConfig)(this.config, sessionsObj, name);
    }
    getSession(name) {
        const session = this.sessions.get(name);
        if (!session) {
            throw new common_1.NotFoundException(`We didn't find a session with name '${name}'.\n` +
                `Please start it first by using POST /api/sessions/${name}/start request`);
        }
        return session;
    }
    async getSessions(all) {
        const result = [];
        for (const [name, session] of this.sessions.entries()) {
            const me = session.getSessionMeInfo();
            result.push({
                name: session.name,
                status: session.status,
                config: session.sessionConfig,
                me: me,
                presence: session.presence,
                timestamps: {
                    activity: session.getLastActivityTimestamp(),
                },
            });
        }
        if (all) {
            for (const [name, config] of this.sessionConfigs.entries()) {
                if (!this.sessions.has(name)) {
                    result.push({
                        name: name,
                        status: enums_dto_1.WAHASessionStatus.STOPPED,
                        config: config,
                        me: null,
                        presence: null,
                        timestamps: {
                            activity: null,
                        },
                    });
                }
            }
        }
        return result;
    }
    async fetchEngineInfo(session) {
        let engineInfo = {};
        if (session) {
            try {
                engineInfo = await (0, promiseTimeout_1.promiseTimeout)(1000, session.getEngineInfo());
            }
            catch (error) {
                this.log.debug({ session: session.name, error: `${error}` }, 'Can not get engine info');
            }
        }
        const engine = Object.assign({ engine: session === null || session === void 0 ? void 0 : session.engine }, engineInfo);
        return engine;
    }
    async getSessionInfo(name) {
        const sessions = await this.getSessions(true);
        const sessionInfo = sessions.find(s => s.name === name);
        if (!sessionInfo) {
            return null;
        }
        const session = this.sessions.get(name);
        const engine = await this.fetchEngineInfo(session);
        return Object.assign(Object.assign({}, sessionInfo), { engine: engine });
    }
    stopEvents() {
        (0, complete_1.complete)(this.events2);
    }
    async onModuleInit() {
        await this.init();
    }
    async init() {
        await this.store.init();
        const knex = this.store.getWAHADatabase();
        await this.appsService.migrate(knex);
    }
};
exports.SessionManagerCore = SessionManagerCore;
exports.SessionManagerCore = SessionManagerCore = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)(IAppsService_1.AppsService)),
    __metadata("design:paramtypes", [config_service_1.WhatsappConfigService,
        EngineConfigService_1.EngineConfigService,
        WebJSEngineConfigService_1.WebJSEngineConfigService,
        GowsEngineConfigService_1.GowsEngineConfigService,
        nestjs_pino_1.PinoLogger,
        MediaStorageFactory_1.MediaStorageFactory, Object])
], SessionManagerCore);
//# sourceMappingURL=manager.core.js.map