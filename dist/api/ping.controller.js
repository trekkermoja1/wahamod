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
exports.PingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ping_dto_1 = require("../structures/ping.dto");
let PingController = class PingController {
    ping() {
        return { message: 'pong' };
    }
};
exports.PingController = PingController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Ping the server',
        description: 'Check if the server is alive and responding to requests.',
    }),
    openapi.ApiResponse({ status: 200, type: require("../structures/ping.dto").PingResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ping_dto_1.PingResponse)
], PingController.prototype, "ping", null);
exports.PingController = PingController = __decorate([
    (0, common_1.Controller)('ping'),
    (0, swagger_1.ApiTags)('🔍 Observability')
], PingController);
//# sourceMappingURL=ping.controller.js.map