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
exports.AppsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const IAppsService_1 = require("../services/IAppsService");
const manager_abc_1 = require("../../../core/abc/manager.abc");
const WAHAValidationPipe_1 = require("../../../nestjs/pipes/WAHAValidationPipe");
const app_dto_1 = require("../dto/app.dto");
const query_dto_1 = require("../dto/query.dto");
let AppsController = class AppsController {
    constructor(appsService, manager) {
        this.appsService = appsService;
        this.manager = manager;
    }
    async list(query) {
        return this.appsService.list(this.manager, query.session);
    }
    async create(app) {
        const result = await this.appsService.create(this.manager, app);
        const isRunning = this.manager.isRunning(app.session);
        if (isRunning && app.enabled) {
            await this.manager.restart(app.session);
        }
        return result;
    }
    async get(id) {
        return await this.appsService.get(this.manager, id);
    }
    async update(id, app) {
        if (!app.id) {
            app.id = id;
        }
        else if (app.id !== id) {
            throw new common_1.NotFoundException(`App ID in path (${id}) does not match ID in body (${app.id})`);
        }
        const result = await this.appsService.upsert(this.manager, app);
        const isRunning = this.manager.isRunning(app.session);
        if (isRunning) {
            await this.manager.restart(app.session);
        }
        return result;
    }
    async delete(id) {
        const app = await this.appsService.delete(this.manager, id);
        const isRunning = this.manager.isRunning(app.session);
        if (isRunning) {
            await this.manager.restart(app.session);
        }
    }
};
exports.AppsController = AppsController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List all apps for a session' }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(new WAHAValidationPipe_1.WAHAValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.ListAppsQuery]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new app' }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_dto_1.App]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get app by ID' }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing app' }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, app_dto_1.App]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an app' }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "delete", null);
exports.AppsController = AppsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/apps'),
    (0, swagger_1.ApiTags)('🧩 Apps'),
    __param(0, (0, common_1.Inject)(IAppsService_1.AppsService)),
    __metadata("design:paramtypes", [Object, manager_abc_1.SessionManager])
], AppsController);
//# sourceMappingURL=apps.controller.js.map