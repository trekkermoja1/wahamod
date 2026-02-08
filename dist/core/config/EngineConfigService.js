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
exports.EngineConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helpers_1 = require("../../helpers");
const enums_dto_1 = require("../../structures/enums.dto");
const version_1 = require("../../version");
let EngineConfigService = class EngineConfigService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger('EngineConfigService');
    }
    getDefaultEngineName() {
        const value = (0, version_1.getEngineName)();
        if (value in enums_dto_1.WAHAEngine) {
            return enums_dto_1.WAHAEngine[value];
        }
        this.logger.warn(`Unknown WhatsApp default engine WHATSAPP_DEFAULT_ENGINE=${value}. Using WEBJS`);
        return enums_dto_1.WAHAEngine.WEBJS;
    }
    get shouldPrintQR() {
        const value = this.configService.get('WAHA_PRINT_QR', true);
        return (0, helpers_1.parseBool)(value);
    }
};
exports.EngineConfigService = EngineConfigService;
exports.EngineConfigService = EngineConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EngineConfigService);
//# sourceMappingURL=EngineConfigService.js.map