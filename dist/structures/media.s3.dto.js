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
exports.S3MediaData = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class S3MediaData {
    static _OPENAPI_METADATA_FACTORY() {
        return { Bucket: { required: true, type: () => String }, Key: { required: true, type: () => String } };
    }
}
exports.S3MediaData = S3MediaData;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the S3 bucket',
        example: 'my-bucket',
    }),
    __metadata("design:type", String)
], S3MediaData.prototype, "Bucket", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The key of the object in the S3 bucket',
        example: 'default/false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA.oga',
    }),
    __metadata("design:type", String)
], S3MediaData.prototype, "Key", void 0);
//# sourceMappingURL=media.s3.dto.js.map