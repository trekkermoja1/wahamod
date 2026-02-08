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
exports.PaginationParams = exports.LimitOffsetParams = exports.SortOrder = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var SortOrder;
(function (SortOrder) {
    SortOrder["DESC"] = "desc";
    SortOrder["ASC"] = "asc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class LimitOffsetParams {
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number }, offset: { required: false, type: () => Number } };
    }
}
exports.LimitOffsetParams = LimitOffsetParams;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LimitOffsetParams.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LimitOffsetParams.prototype, "offset", void 0);
class PaginationParams extends LimitOffsetParams {
    static _OPENAPI_METADATA_FACTORY() {
        return { sortBy: { required: false, type: () => String }, sortOrder: { required: false, enum: require("./pagination.dto").SortOrder } };
    }
}
exports.PaginationParams = PaginationParams;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort by field',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationParams.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort order - <b>desc</b>ending (Z => A, New first) or <b>asc</b>ending (A => Z, Old first)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationParams.prototype, "sortOrder", void 0);
//# sourceMappingURL=pagination.dto.js.map