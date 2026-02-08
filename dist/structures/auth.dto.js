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
exports.PairingCodeResponse = exports.RequestCodeRequest = exports.QRCodeValue = exports.QRCodeQuery = exports.QRCodeFormat = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
var QRCodeFormat;
(function (QRCodeFormat) {
    QRCodeFormat["IMAGE"] = "image";
    QRCodeFormat["RAW"] = "raw";
})(QRCodeFormat || (exports.QRCodeFormat = QRCodeFormat = {}));
class QRCodeQuery {
    constructor() {
        this.format = QRCodeFormat.IMAGE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { format: { required: true, default: QRCodeFormat.IMAGE, enum: require("./auth.dto").QRCodeFormat } };
    }
}
exports.QRCodeQuery = QRCodeQuery;
class QRCodeValue {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String } };
    }
}
exports.QRCodeValue = QRCodeValue;
class RequestCodeRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { phoneNumber: { required: true, type: () => String }, method: { required: true, type: () => String } };
    }
}
exports.RequestCodeRequest = RequestCodeRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mobile phone number in international format',
        example: '12132132130',
    }),
    __metadata("design:type", String)
], RequestCodeRequest.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'How would you like to receive the one time code for registration? |sms|voice. Leave empty for Web pairing.',
        example: null,
        required: false,
    }),
    __metadata("design:type", String)
], RequestCodeRequest.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], RequestCodeRequest.prototype, "localeLanguage", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], RequestCodeRequest.prototype, "localeCountry", void 0);
class PairingCodeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => String } };
    }
}
exports.PairingCodeResponse = PairingCodeResponse;
//# sourceMappingURL=auth.dto.js.map