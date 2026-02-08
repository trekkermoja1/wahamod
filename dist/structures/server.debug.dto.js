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
exports.BrowserTraceQuery = exports.CpuProfileQuery = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CpuProfileQuery {
    constructor() {
        this.seconds = 30;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { seconds: { required: true, type: () => Number, default: 30, minimum: 1 } };
    }
}
exports.CpuProfileQuery = CpuProfileQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)({
        description: 'How many seconds to sample CPU',
        example: 30,
        required: false,
        default: 30,
    }),
    __metadata("design:type", Number)
], CpuProfileQuery.prototype, "seconds", void 0);
class BrowserTraceQuery {
    constructor() {
        this.seconds = 30;
        this.categories = ['*'];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { seconds: { required: true, type: () => Number, default: 30 }, categories: { required: true, type: () => [String], default: ['*'] } };
    }
}
exports.BrowserTraceQuery = BrowserTraceQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'How many seconds to trace',
        example: 30,
        required: true,
    }),
    __metadata("design:type", Number)
], BrowserTraceQuery.prototype, "seconds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Categories to trace (all by default)',
        example: ['*'],
        required: true,
    }),
    __metadata("design:type", Array)
], BrowserTraceQuery.prototype, "categories", void 0);
//# sourceMappingURL=server.debug.dto.js.map