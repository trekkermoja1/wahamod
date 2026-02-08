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
exports.ServerController = void 0;
const openapi = require("@nestjs/swagger");
const process = require("node:process");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config.service");
const WAHAValidationPipe_1 = require("../nestjs/pipes/WAHAValidationPipe");
const environment_dto_1 = require("../structures/environment.dto");
const server_dto_1 = require("../structures/server.dto");
const promiseTimeout_1 = require("../utils/promiseTimeout");
const version_1 = require("../version");
const lodash = require("lodash");
let ServerController = class ServerController {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger('ServerController');
    }
    get() {
        return version_1.VERSION;
    }
    environment(query) {
        let result = process.env;
        if (!query.all) {
            result = lodash.pickBy(result, (value, key) => {
                return (key.startsWith('WAHA_') ||
                    key.startsWith('WHATSAPP_') ||
                    key === 'DEBUG');
            });
        }
        const map = new Map();
        Object.keys(result)
            .sort()
            .forEach((key) => {
            map.set(key, result[key]);
        });
        return Object.fromEntries(map);
    }
    async status() {
        const now = Date.now();
        const uptime = Math.floor(process.uptime() * 1000);
        const startTimestamp = now - uptime;
        return {
            startTimestamp: startTimestamp,
            uptime: uptime,
            worker: {
                id: this.config.workerId,
            },
        };
    }
    async stop(request) {
        const timeout = 1000;
        if (request.force) {
            this.logger.log(`Force stopping the server in ${timeout}ms`);
            setTimeout(() => {
                this.logger.log('Force stopping the server');
                process.kill(process.pid, 'SIGKILL');
                process.exit(0);
            }, timeout);
        }
        else {
            this.logger.log(`Gracefully stopping the server in ${timeout}ms`);
            setTimeout(async () => {
                this.logger.log('Gracefully closing the application...');
                process.kill(process.pid, 'SIGTERM');
                await (0, promiseTimeout_1.sleep)(10000);
                process.exit(0);
            }, timeout);
        }
        return { stopping: true };
    }
};
exports.ServerController = ServerController;
__decorate([
    (0, common_1.Get)('version'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the version of the server' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/environment.dto").WAHAEnvironment }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", environment_dto_1.WAHAEnvironment)
], ServerController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('environment'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the server environment' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)(new WAHAValidationPipe_1.WAHAValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [server_dto_1.EnvironmentQuery]),
    __metadata("design:returntype", Object)
], ServerController.prototype, "environment", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the server status' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/server.dto").ServerStatusResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "status", null);
__decorate([
    (0, common_1.Post)('stop'),
    (0, swagger_1.ApiOperation)({
        summary: 'Stop (and restart) the server',
        description: "If you're using docker, after calling this endpoint Docker will start a new container, " +
            'so you can use this endpoint to restart the server',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 201, type: require("../structures/server.dto").StopResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [server_dto_1.StopRequest]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "stop", null);
exports.ServerController = ServerController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/server'),
    (0, swagger_1.ApiTags)('🔍 Observability'),
    __metadata("design:paramtypes", [config_service_1.WhatsappConfigService])
], ServerController);
//# sourceMappingURL=server.controller.js.map