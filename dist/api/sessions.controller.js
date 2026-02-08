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
exports.SessionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const unprocessable_entity_exception_1 = require("@nestjs/common/exceptions/unprocessable-entity.exception");
const swagger_1 = require("@nestjs/swagger");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const WAHAValidationPipe_1 = require("../nestjs/pipes/WAHAValidationPipe");
const IAppsService_1 = require("../apps/app_sdk/services/IAppsService");
const sessions_deprecated_dto_1 = require("../structures/sessions.deprecated.dto");
const ids_1 = require("../utils/ids");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const sessions_dto_1 = require("../structures/sessions.dto");
const sessions_examples_1 = require("./sessions.examples");
let SessionsController = class SessionsController {
    constructor(manager, appsService) {
        this.manager = manager;
        this.appsService = appsService;
    }
    withLock(name, fn) {
        return this.manager.withLock(name, fn);
    }
    async list(query) {
        var _a;
        const sessions = await this.manager.getSessions(query.all);
        if ((_a = query.expand) === null || _a === void 0 ? void 0 : _a.includes(sessions_dto_1.SessionExpand.apps)) {
            for (const session of sessions) {
                session.apps = await this.appsService.list(this.manager, session.name);
            }
        }
        return sessions;
    }
    async get(name, query) {
        var _a;
        const session = await this.manager.getSessionInfo(name);
        if (session === null) {
            throw new common_1.NotFoundException('Session not found');
        }
        if ((_a = query.expand) === null || _a === void 0 ? void 0 : _a.includes(sessions_dto_1.SessionExpand.apps)) {
            session.apps = await this.appsService.list(this.manager, name);
        }
        return session;
    }
    getMe(session) {
        return session.getSessionMeInfo();
    }
    async create(request) {
        const name = request.name || (0, ids_1.generatePrefixedId)('session');
        await this.withLock(name, async () => {
            if (await this.manager.exists(name)) {
                const msg = `Session '${name}' already exists. Use PUT to update it.`;
                throw new unprocessable_entity_exception_1.UnprocessableEntityException(msg);
            }
            const config = request.config;
            const start = request.start || false;
            await this.manager.upsert(name, config);
            if (request.apps) {
                await this.appsService.syncSessionApps(this.manager, name, request.apps);
            }
            if (start) {
                await this.manager.assign(name);
                await this.manager.start(name);
            }
        });
        const session = await this.manager.getSessionInfo(name);
        if (request.apps) {
            session.apps = await this.appsService.list(this.manager, name);
        }
        return session;
    }
    async update(name, request) {
        await this.withLock(name, async () => {
            if (!(await this.manager.exists(name))) {
                throw new common_1.NotFoundException('Session not found');
            }
            const config = request.config;
            const isRunning = this.manager.isRunning(name);
            await this.manager.stop(name, true);
            await this.manager.upsert(name, config);
            if (request.apps) {
                await this.appsService.syncSessionApps(this.manager, name, request.apps);
            }
            if (isRunning) {
                await this.manager.start(name);
            }
        });
        const session = await this.manager.getSessionInfo(name);
        if (request.apps) {
            session.apps = await this.appsService.list(this.manager, name);
        }
        return session;
    }
    async delete(name) {
        await this.withLock(name, async () => {
            await this.manager.unassign(name);
            await this.manager.unpair(name);
            await this.manager.stop(name, true);
            await this.manager.logout(name);
            await this.manager.delete(name);
        });
    }
    async start(name) {
        await this.withLock(name, async () => {
            const exists = await this.manager.exists(name);
            if (!exists) {
                throw new common_1.NotFoundException('Session not found');
            }
            await this.manager.assign(name);
            await this.manager.start(name);
        });
        return await this.manager.getSessionInfo(name);
    }
    async stop(name) {
        await this.withLock(name, async () => {
            await this.manager.unassign(name);
            await this.manager.stop(name, false);
        });
        return await this.manager.getSessionInfo(name);
    }
    async logout(name) {
        await this.withLock(name, async () => {
            const exists = await this.manager.exists(name);
            if (!exists) {
                throw new common_1.NotFoundException('Session not found');
            }
            const isRunning = this.manager.isRunning(name);
            await this.manager.unpair(name);
            await this.manager.stop(name, true);
            await this.manager.logout(name);
            if (isRunning) {
                await this.manager.start(name);
            }
        });
        return await this.manager.getSessionInfo(name);
    }
    async restart(name) {
        await this.manager.restart(name);
        return await this.manager.getSessionInfo(name);
    }
    async DEPRACATED_start(request) {
        const name = request.name;
        if (!request.name) {
            throw new unprocessable_entity_exception_1.UnprocessableEntityException('Session name is required');
        }
        if (this.manager.isRunning(name)) {
            const msg = `Session '${name}' is already started.`;
            throw new unprocessable_entity_exception_1.UnprocessableEntityException(msg);
        }
        return await this.withLock(name, async () => {
            const config = request.config;
            await this.manager.upsert(name, config);
            await this.manager.assign(name);
            return await this.manager.start(name);
        });
    }
    async DEPRECATED_stop(request) {
        if (!request.name) {
            throw new unprocessable_entity_exception_1.UnprocessableEntityException('Session name is required');
        }
        const name = request.name;
        if (request.logout) {
            await this.withLock(name, async () => {
                await this.manager.unassign(name);
                await this.manager.unpair(name);
                await this.manager.stop(name, true);
                await this.manager.logout(name);
                await this.manager.delete(name);
            });
        }
        else {
            await this.withLock(name, async () => {
                await this.manager.unassign(name);
                await this.manager.stop(name, false);
            });
        }
        return;
    }
    async DEPRECATED_logout(request) {
        if (!request.name) {
            throw new unprocessable_entity_exception_1.UnprocessableEntityException('Session name is required');
        }
        const name = request.name;
        await this.withLock(name, async () => {
            await this.manager.unassign(name);
            await this.manager.unpair(name);
            await this.manager.stop(name, true);
            await this.manager.logout(name);
            await this.manager.delete(name);
        });
        return;
    }
};
exports.SessionsController = SessionsController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List all sessions' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/sessions.dto").SessionInfo] }),
    __param(0, (0, common_1.Query)(new WAHAValidationPipe_1.WAHAValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_dto_1.ListSessionsQuery]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:session'),
    (0, swagger_1.ApiOperation)({ summary: 'Get session information' }),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200, type: require("../structures/sessions.dto").SessionInfo }),
    __param(0, (0, common_1.Param)('session')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sessions_dto_1.SessionInfoQuery]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':session/me'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get information about the authenticated account' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/sessions.dto").MeInfo }),
    __param(0, SessionApiParam_1.SessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", sessions_dto_1.MeInfo)
], SessionsController.prototype, "getMe", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a session',
        description: 'Create session a new session (and start it at the same time if required).',
    }),
    (0, swagger_1.ApiBody)({ type: sessions_dto_1.SessionCreateRequest, examples: sessions_examples_1.SessionExamples }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_dto_1.SessionCreateRequest]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':session'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a session',
        description: '',
    }),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiBody)({ type: sessions_dto_1.SessionUpdateRequest, examples: sessions_examples_1.SessionExamples }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe({ forbidNonWhitelisted: false })),
    openapi.ApiResponse({ status: 200, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Param)('session')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sessions_dto_1.SessionUpdateRequest]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':session'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Delete the session',
        description: 'Delete the session with the given name. Stop and logout as well. Idempotent operation.',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('session')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':session/start'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Start the session',
        description: 'Start the session with the given name. The session must exist. Idempotent operation.',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Param)('session')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':session/stop'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Stop the session',
        description: 'Stop the session with the given name. Idempotent operation.',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Param)('session')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "stop", null);
__decorate([
    (0, common_1.Post)(':session/logout'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Logout from the session',
        description: 'Logout the session, restart a session if it was not STOPPED',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Param)('session')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)(':session/restart'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Restart the session',
        description: 'Restart the session with the given name.',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Param)('session')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "restart", null);
__decorate([
    (0, common_1.Post)('/start/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Upsert and Start session',
        description: 'Create session (if not exists) or update a config (if exists) and start it.',
        deprecated: true,
    }),
    openapi.ApiResponse({ status: 201, type: require("../structures/sessions.dto").SessionDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_deprecated_dto_1.SessionStartDeprecatedRequest]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "DEPRACATED_start", null);
__decorate([
    (0, common_1.Post)('/stop/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Stop (and Logout if asked) session',
        description: 'Stop session and Logout by default.',
        deprecated: true,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_deprecated_dto_1.SessionStopDeprecatedRequest]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "DEPRECATED_stop", null);
__decorate([
    (0, common_1.Post)('/logout/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout and Delete session.',
        description: 'Stop, Logout and Delete session.',
        deprecated: true,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_deprecated_dto_1.SessionLogoutDeprecatedRequest]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "DEPRECATED_logout", null);
exports.SessionsController = SessionsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/sessions'),
    (0, swagger_1.ApiTags)('🖥️ Sessions'),
    __param(1, (0, common_1.Inject)(IAppsService_1.AppsService)),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager, Object])
], SessionsController);
//# sourceMappingURL=sessions.controller.js.map