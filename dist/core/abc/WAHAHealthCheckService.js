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
exports.WAHAHealthCheckService = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const config_service_1 = require("../../config.service");
const manager_abc_1 = require("./manager.abc");
let WAHAHealthCheckService = class WAHAHealthCheckService {
    constructor(sessionManager, health, config) {
        this.sessionManager = sessionManager;
        this.health = health;
        this.config = config;
        this.logger = new common_1.Logger('WAHAHealthCheckService');
    }
};
exports.WAHAHealthCheckService = WAHAHealthCheckService;
exports.WAHAHealthCheckService = WAHAHealthCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        terminus_1.HealthCheckService,
        config_service_1.WhatsappConfigService])
], WAHAHealthCheckService);
//# sourceMappingURL=WAHAHealthCheckService.js.map