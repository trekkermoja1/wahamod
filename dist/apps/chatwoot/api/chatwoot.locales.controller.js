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
exports.ChatwootLocalesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const i18n_1 = require("../i18n");
let ChatwootLocalesController = class ChatwootLocalesController {
    getLanguages() {
        const locales = i18n_1.i18n.available();
        const priority = ['en-US', 'pt-BR', 'es-ES'];
        return (0, lodash_1.sortBy)(locales, [
            (x) => {
                const idx = priority.indexOf(x.locale);
                return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
            },
            'locale',
        ]);
    }
};
exports.ChatwootLocalesController = ChatwootLocalesController;
__decorate([
    (0, common_1.Get)('locales'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available languages for Chatwoot app',
        description: 'Get available languages for Chatwoot app',
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ChatwootLocalesController.prototype, "getLanguages", null);
exports.ChatwootLocalesController = ChatwootLocalesController = __decorate([
    (0, common_1.Controller)('api/apps/chatwoot'),
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, swagger_1.ApiTags)('🧩 Apps')
], ChatwootLocalesController);
//# sourceMappingURL=chatwoot.locales.controller.js.map