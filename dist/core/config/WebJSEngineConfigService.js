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
exports.WebJSEngineConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let WebJSEngineConfigService = class WebJSEngineConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    getConfig() {
        let webVersion = this.configService.get('WAHA_WEBJS_WEB_VERSION', undefined);
        if (webVersion === '2.2412.54-videofix') {
            webVersion = undefined;
        }
        return {
            webVersion: webVersion,
            cacheType: this.getCacheType(),
            puppeteerArgs: this.getPuppeterArgs(),
        };
    }
    getCacheType() {
        const cacheType = this.configService
            .get('WAHA_WEBJS_CACHE_TYPE', 'none')
            .toLowerCase();
        if (cacheType != 'local' && cacheType != 'none') {
            throw new Error('Invalid cache type, only "local" and "none" are allowed');
        }
        return cacheType;
    }
    getPuppeterArgs() {
        const args = this.configService.get('WAHA_WEBJS_PUPPETER_ARGS', '');
        return args
            .split(' ')
            .map((arg) => arg.trim())
            .filter(Boolean);
    }
};
exports.WebJSEngineConfigService = WebJSEngineConfigService;
exports.WebJSEngineConfigService = WebJSEngineConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WebJSEngineConfigService);
//# sourceMappingURL=WebJSEngineConfigService.js.map