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
exports.CallData = exports.RejectCallRequest = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const properties_dto_1 = require("./properties.dto");
const class_validator_1 = require("class-validator");
function CallIdProperty() {
    return (0, swagger_1.ApiProperty)({
        description: 'Call ID',
        example: 'ABCDEFGABCDEFGABCDEFGABCDEFG',
    });
}
class RejectCallRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { from: { required: true, type: () => String }, id: { required: true, type: () => String } };
    }
}
exports.RejectCallRequest = RejectCallRequest;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RejectCallRequest.prototype, "from", void 0);
__decorate([
    CallIdProperty(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RejectCallRequest.prototype, "id", void 0);
class CallData {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, from: { required: false, type: () => String }, timestamp: { required: true, type: () => Number }, isVideo: { required: true, type: () => Boolean }, isGroup: { required: true, type: () => Boolean }, _data: { required: true, type: () => Object } };
    }
}
exports.CallData = CallData;
__decorate([
    CallIdProperty(),
    __metadata("design:type", String)
], CallData.prototype, "id", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], CallData.prototype, "from", void 0);
//# sourceMappingURL=calls.dto.js.map