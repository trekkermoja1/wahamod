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
exports.SwaggerConfigServiceCore = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const helpers_1 = require("../../helpers");
const config_2 = require("../auth/config");
let SwaggerConfigServiceCore = class SwaggerConfigServiceCore {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
    }
    get advancedConfigEnabled() {
        const value = this.configService.get('WHATSAPP_SWAGGER_CONFIG_ADVANCED', false);
        return (0, helpers_1.parseBool)(value);
    }
    get enabled() {
        const value = this.configService.get('WHATSAPP_SWAGGER_ENABLED', 'true');
        return (0, helpers_1.parseBool)(value);
    }
    get credentials() {
        const user = config_2.Auth.swagger.username.value;
        const password = config_2.Auth.swagger.password.value;
        if (!user && !password) {
            return null;
        }
        if ((user && !password) || (!user && password)) {
            this.logger.warn('Set up both WHATSAPP_SWAGGER_USERNAME and WHATSAPP_SWAGGER_PASSWORD ' +
                'to enable swagger authentication.');
            return null;
        }
        return [user, password];
    }
    get title() {
        return this.configService.get('WHATSAPP_SWAGGER_TITLE', '');
    }
    get description() {
        return this.configService.get('WHATSAPP_SWAGGER_DESCRIPTION', '');
    }
    get externalDocUrl() {
        return this.configService.get('WHATSAPP_SWAGGER_EXTERNAL_DOC_URL', '');
    }
};
exports.SwaggerConfigServiceCore = SwaggerConfigServiceCore;
exports.SwaggerConfigServiceCore = SwaggerConfigServiceCore = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_pino_1.InjectPinoLogger)('SwaggerConfigService')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        nestjs_pino_1.PinoLogger])
], SwaggerConfigServiceCore);
//# sourceMappingURL=SwaggerConfigServiceCore.js.map