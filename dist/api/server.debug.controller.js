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
exports.ServerDebugController = void 0;
const openapi = require("@nestjs/swagger");
const inspector = require("node:inspector");
const v8 = require("node:v8");
const node_stream_1 = require("node:stream");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config.service");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const WAHAValidationPipe_1 = require("../nestjs/pipes/WAHAValidationPipe");
const server_debug_dto_1 = require("../structures/server.debug.dto");
const fs_1 = require("fs");
let ServerDebugController = class ServerDebugController {
    constructor(config, manager) {
        this.config = config;
        this.manager = manager;
        this.logger = new common_1.Logger('ServerDebugController');
        this.enabled = this.config.debugModeEnabled;
    }
    async cpuProfile(query) {
        if (!this.enabled) {
            throw new common_1.NotFoundException('WAHA_DEBUG_MODE is disabled');
        }
        const { seconds } = query;
        this.logger.log(`Collecting CPU profile for ${seconds}s...`);
        const session = new inspector.Session();
        session.connect();
        const profile = await new Promise((resolve, reject) => {
            session.post('Profiler.enable', (enableError) => {
                if (enableError) {
                    session.disconnect();
                    return reject(enableError);
                }
                session.post('Profiler.start', (startError) => {
                    if (startError) {
                        session.disconnect();
                        return reject(startError);
                    }
                    setTimeout(() => {
                        session.post('Profiler.stop', (stopError, params) => {
                            session.disconnect();
                            if (stopError) {
                                return reject(stopError);
                            }
                            resolve(params.profile);
                        });
                    }, seconds * 1000);
                });
            });
        });
        const filename = `CPU.${Date.now()}.${process.pid}.cpuprofile`;
        const stream = node_stream_1.Readable.from([JSON.stringify(profile)]);
        return new common_1.StreamableFile(stream, {
            type: 'application/json',
            disposition: `attachment; filename=${filename}`,
        });
    }
    async heapsnapshot() {
        if (!this.enabled) {
            throw new common_1.NotFoundException('WAHA_DEBUG_MODE is disabled');
        }
        this.logger.log('Creating a heap snapshot...');
        const heap = v8.getHeapSnapshot();
        const fileName = `${Date.now()}.heapsnapshot`;
        return new common_1.StreamableFile(heap, {
            type: 'application/octet-stream',
            disposition: `attachment; filename=${fileName}`,
        });
    }
    async browserTrace(session, query) {
        if (!this.enabled) {
            throw new common_1.NotFoundException('WAHA_DEBUG_MODE is disabled');
        }
        const filepath = await session.browserTrace(query);
        const stream = (0, fs_1.createReadStream)(filepath);
        const filename = `trace - ${session.name} - ${new Date()}.json`;
        return new common_1.StreamableFile(stream, {
            type: 'application/octet-stream',
            disposition: `attachment; filename=${filename}`,
        });
    }
};
exports.ServerDebugController = ServerDebugController;
__decorate([
    (0, common_1.Get)('cpu'),
    (0, swagger_1.ApiOperation)({
        summary: 'Collect and return a CPU profile for the current nodejs process',
        description: 'Uses the Node.js inspector profiler to capture a .cpuprofile',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [server_debug_dto_1.CpuProfileQuery]),
    __metadata("design:returntype", Promise)
], ServerDebugController.prototype, "cpuProfile", null);
__decorate([
    (0, common_1.Get)('heapsnapshot'),
    (0, swagger_1.ApiOperation)({
        summary: 'Return a heapsnapshot for the current nodejs process',
        description: "Return a heapsnapshot of the server's memory",
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerDebugController.prototype, "heapsnapshot", null);
__decorate([
    (0, common_1.Get)('browser/trace/:session'),
    (0, swagger_1.ApiOperation)({
        summary: 'Collect and get a trace.json for Chrome DevTools ',
        description: 'Uses https://pptr.dev/api/puppeteer.tracing',
    }),
    SessionApiParam_1.SessionApiParam,
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        server_debug_dto_1.BrowserTraceQuery]),
    __metadata("design:returntype", Promise)
], ServerDebugController.prototype, "browserTrace", null);
exports.ServerDebugController = ServerDebugController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/server/debug'),
    (0, swagger_1.ApiTags)('🔍 Observability'),
    __metadata("design:paramtypes", [config_service_1.WhatsappConfigService,
        manager_abc_1.SessionManager])
], ServerDebugController);
//# sourceMappingURL=server.debug.controller.js.map