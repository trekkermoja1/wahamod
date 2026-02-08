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
exports.WAHAEnvironment = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class WAHAEnvironment {
    static _OPENAPI_METADATA_FACTORY() {
        return { version: { required: true, type: () => String }, engine: { required: true, type: () => String }, tier: { required: true, type: () => String }, browser: { required: true, type: () => String }, platform: { required: true, type: () => String } };
    }
}
exports.WAHAEnvironment = WAHAEnvironment;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'YYYY.MM.BUILD',
    }),
    __metadata("design:type", String)
], WAHAEnvironment.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'WEBJS',
    }),
    __metadata("design:type", String)
], WAHAEnvironment.prototype, "engine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PLUS',
    }),
    __metadata("design:type", String)
], WAHAEnvironment.prototype, "tier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/usr/path/to/bin/google-chrome',
    }),
    __metadata("design:type", String)
], WAHAEnvironment.prototype, "browser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'linux/x86',
    }),
    __metadata("design:type", String)
], WAHAEnvironment.prototype, "platform", void 0);
//# sourceMappingURL=environment.dto.js.map