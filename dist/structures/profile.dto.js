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
exports.ProfilePictureRequest = exports.ProfileStatusRequest = exports.ProfileNameRequest = exports.MyProfile = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const files_dto_1 = require("./files.dto");
const properties_dto_1 = require("./properties.dto");
const class_validator_1 = require("class-validator");
class MyProfile {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, picture: { required: true, type: () => String, nullable: true } };
    }
}
exports.MyProfile = MyProfile;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], MyProfile.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/picture.jpg',
    }),
    __metadata("design:type", String)
], MyProfile.prototype, "picture", void 0);
class ProfileNameRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.ProfileNameRequest = ProfileNameRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'My New Name',
    }),
    __metadata("design:type", String)
], ProfileNameRequest.prototype, "name", void 0);
class ProfileStatusRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => String } };
    }
}
exports.ProfileStatusRequest = ProfileStatusRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: '🎉 Hey there! I am using WhatsApp 🎉',
    }),
    __metadata("design:type", String)
], ProfileStatusRequest.prototype, "status", void 0);
let ProfilePictureRequest = class ProfilePictureRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object } };
    }
};
exports.ProfilePictureRequest = ProfilePictureRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.RemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.BinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], ProfilePictureRequest.prototype, "file", void 0);
exports.ProfilePictureRequest = ProfilePictureRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.RemoteFile, files_dto_1.BinaryFile)
], ProfilePictureRequest);
//# sourceMappingURL=profile.dto.js.map