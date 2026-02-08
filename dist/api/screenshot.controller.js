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
exports.ScreenshotController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiFileAcceptHeader_1 = require("../nestjs/ApiFileAcceptHeader");
const manager_abc_1 = require("../core/abc/manager.abc");
const BufferResponseInterceptor_1 = require("../nestjs/BufferResponseInterceptor");
const base_dto_1 = require("../structures/base.dto");
let ScreenshotController = class ScreenshotController {
    constructor(manager) {
        this.manager = manager;
    }
    async screenshot(res, sessionQuery) {
        const whatsappService = this.manager.getSession(sessionQuery.session);
        return await whatsappService.getScreenshot();
    }
};
exports.ScreenshotController = ScreenshotController;
__decorate([
    (0, common_1.Get)('/screenshot'),
    (0, common_1.UseInterceptors)(new BufferResponseInterceptor_1.BufferResponseInterceptor('image/jpeg')),
    (0, ApiFileAcceptHeader_1.ApiFileAcceptHeader)('image/jpeg'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, base_dto_1.SessionQuery]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "screenshot", null);
exports.ScreenshotController = ScreenshotController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api'),
    (0, swagger_1.ApiTags)('🖼️ Screenshot'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], ScreenshotController);
//# sourceMappingURL=screenshot.controller.js.map