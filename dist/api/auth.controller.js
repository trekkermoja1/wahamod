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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiFileAcceptHeader_1 = require("../nestjs/ApiFileAcceptHeader");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const manager_abc_1 = require("../core/abc/manager.abc");
const session_abc_1 = require("../core/abc/session.abc");
const BufferResponseInterceptor_1 = require("../nestjs/BufferResponseInterceptor");
const auth_dto_1 = require("../structures/auth.dto");
const files_dto_1 = require("../structures/files.dto");
let AuthController = class AuthController {
    constructor(manager) {
        this.manager = manager;
    }
    async getQR(session, query) {
        const qr = session.getQR();
        if (query.format == auth_dto_1.QRCodeFormat.RAW) {
            return { value: qr.raw };
        }
        return qr.get();
    }
    requestCode(session, request) {
        return session.requestCode(request.phoneNumber, request.method, request);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('qr'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get QR code for pairing WhatsApp API.',
    }),
    SessionApiParam_1.SessionApiParam,
    (0, ApiFileAcceptHeader_1.ApiFileAcceptHeader)('image/png', files_dto_1.Base64File, auth_dto_1.QRCodeValue),
    (0, common_1.UseInterceptors)(new BufferResponseInterceptor_1.BufferResponseInterceptor('image/png')),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, SessionApiParam_1.QRCodeSessionParam),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        auth_dto_1.QRCodeQuery]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getQR", null);
__decorate([
    (0, common_1.Post)('request-code'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Request authentication code.',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, SessionApiParam_1.SessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        auth_dto_1.RequestCodeRequest]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "requestCode", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/auth'),
    (0, swagger_1.ApiTags)('🔑 Auth'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], AuthController);
//# sourceMappingURL=auth.controller.js.map