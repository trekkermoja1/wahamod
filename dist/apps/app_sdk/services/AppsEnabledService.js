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
exports.AppsEnabledService = exports.AppDisableError = void 0;
const common_1 = require("@nestjs/common");
const migrations_1 = require("../migrations");
const ChatWootAppService_1 = require("../../chatwoot/services/ChatWootAppService");
const CallsAppService_1 = require("../../calls/services/CallsAppService");
const ids_1 = require("../../../utils/ids");
const nestjs_pino_1 = require("nestjs-pino");
const AppRepository_1 = require("../storage/AppRepository");
const name_1 = require("../apps/name");
const AppRuntime_1 = require("../apps/AppRuntime");
class AppDisableError extends common_1.UnprocessableEntityException {
    constructor(app) {
        super(`App '${app}' is disabled in runtime configuration - adjust WAHA_APPS_ON / WAHA_APPS_OFF environment variables to enable it.`);
    }
}
exports.AppDisableError = AppDisableError;
let AppsEnabledService = class AppsEnabledService {
    constructor(logger, chatwootService, callsAppService) {
        this.logger = logger;
        this.chatwootService = chatwootService;
        this.callsAppService = callsAppService;
    }
    async list(manager, session) {
        const knex = manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const apps = await repo.getAllBySession(session);
        apps.forEach((app) => {
            delete app.pk;
        });
        return apps;
    }
    async create(manager, app) {
        await this.checkSessionExists(manager, app.session);
        app.id = app.id || (0, ids_1.generatePrefixedId)('app');
        const knex = manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const existingApp = await repo.getById(app.id);
        if (existingApp) {
            throw new Error(`App with ID '${app.id}' already exists.`);
        }
        let existingApps = [];
        if (app.app === name_1.AppName.chatwoot || app.app === name_1.AppName.calls) {
            existingApps = await repo.getAllBySession(app.session);
        }
        if (app.app === name_1.AppName.chatwoot) {
            const existingChatwootApp = existingApps.find((existingApp) => existingApp.app === name_1.AppName.chatwoot);
            if (existingChatwootApp) {
                throw new Error(`Only one Chatwoot app is allowed per session. Session '${app.session}' already has a Chatwoot app with ID '${existingChatwootApp.id}'.`);
            }
        }
        if (app.app === name_1.AppName.calls) {
            const existingCallsApp = existingApps.find((existingApp) => existingApp.app === name_1.AppName.calls);
            if (existingCallsApp) {
                throw new Error(`Only one Calls app is allowed per session. Session '${app.session}' already has a Calls app with ID '${existingCallsApp.id}'.`);
            }
        }
        const service = this.getAppService(app);
        if (!service && !AppRuntime_1.AppRuntimeConfig.HasApp(app.app)) {
            throw new AppDisableError(app.app);
        }
        service.validate(app);
        if (app.enabled !== false) {
            await service.beforeCreated(app);
        }
        const result = await repo.save(app);
        delete result.pk;
        return result;
    }
    async get(manager, appId) {
        const knex = manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const app = await repo.getById(appId);
        if (!app) {
            throw new common_1.NotFoundException(`App '${appId}' not found`);
        }
        delete app.pk;
        return app;
    }
    async upsert(manager, app) {
        return await this.update(manager, app, true);
    }
    async update(manager, app, upsert = false) {
        await this.checkSessionExists(manager, app.session);
        const knex = manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const savedApp = await repo.getById(app.id);
        if (!savedApp && upsert) {
            return this.create(manager, app);
        }
        if (!savedApp) {
            throw new common_1.NotFoundException(`App '${app.id}' not found`);
        }
        if (savedApp.app != app.app) {
            throw new Error(`Can not change app type. Delete and create a new app. Before type: '${savedApp.app}' After type: '${app.app}'`);
        }
        if (savedApp.session != app.session) {
            throw new Error(`Can not change session. Delete and create a new app. Before session: '${savedApp.session}' After session: '${app.session}'`);
        }
        const service = this.getAppService(app);
        if (!service && !AppRuntime_1.AppRuntimeConfig.HasApp(app.app)) {
            throw new AppDisableError(app.app);
        }
        service.validate(app);
        const hasEnabledChange = savedApp.enabled !== app.enabled;
        if (hasEnabledChange) {
            if (app.enabled) {
                await service.beforeEnabled(savedApp, app);
            }
            else {
                await service.beforeDisabled(savedApp, app);
            }
        }
        else {
            await service.beforeUpdated(savedApp, app);
        }
        await repo.update(app.id, app);
        const updated = await repo.getById(app.id);
        updated === null || updated === void 0 ? true : delete updated.pk;
        return updated;
    }
    async delete(manager, appId) {
        const knex = manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const app = await repo.getById(appId);
        if (!app) {
            throw new common_1.NotFoundException(`App '${appId}' not found`);
        }
        const service = this.getAppService(app);
        await (service === null || service === void 0 ? void 0 : service.beforeDeleted(app));
        await repo.delete(app.id);
        delete app.pk;
        return app;
    }
    async removeBySession(manager, session) {
        const knex = manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        await repo.deleteBySession(session);
    }
    async beforeSessionStart(session, store) {
        const knex = store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const apps = await repo.getEnabledBySession(session.name);
        for (const app of apps) {
            const service = this.getAppService(app);
            if (!service && !AppRuntime_1.AppRuntimeConfig.HasApp(app.app)) {
                throw new AppDisableError(app.app);
            }
            service.beforeSessionStart(app, session);
        }
    }
    async afterSessionStart(session, store) {
        const knex = store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const apps = await repo.getEnabledBySession(session.name);
        for (const app of apps) {
            const service = this.getAppService(app);
            if (!service && !AppRuntime_1.AppRuntimeConfig.HasApp(app.app)) {
                throw new AppDisableError(app.app);
            }
            service.afterSessionStart(app, session);
        }
    }
    async syncSessionApps(manager, session, apps) {
        const existing = await this.list(manager, session);
        const ids = new Set();
        for (const app of apps) {
            if (!app.id) {
                const found = existing.find((a) => a.app === app.app);
                if (found) {
                    app.id = found.id;
                }
            }
            app.session = session;
            await this.upsert(manager, app);
            ids.add(app.id);
        }
        for (const app of existing) {
            if (ids.has(app.id)) {
                continue;
            }
            await this.delete(manager, app.id);
        }
    }
    async migrate(knex) {
        await (0, migrations_1.migrate)(knex);
    }
    getAppService(app) {
        switch (app.app) {
            case name_1.AppName.chatwoot:
                return this.chatwootService;
            case name_1.AppName.calls:
                return this.callsAppService;
            default:
                throw new Error(`App '${app.app}' not supported`);
        }
    }
    async checkSessionExists(manager, sessionName) {
        const session = await manager.exists(sessionName);
        if (session === null) {
            throw new common_1.NotFoundException('Session not found');
        }
    }
};
exports.AppsEnabledService = AppsEnabledService;
exports.AppsEnabledService = AppsEnabledService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_pino_1.InjectPinoLogger)('AppsService')),
    __param(1, (0, common_1.Optional)()),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [nestjs_pino_1.PinoLogger,
        ChatWootAppService_1.ChatWootAppService,
        CallsAppService_1.CallsAppService])
], AppsEnabledService);
//# sourceMappingURL=AppsEnabledService.js.map