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
exports.ReplyToMessage = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const properties_dto_1 = require("./properties.dto");
class ReplyToMessage {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, participant: { required: false, type: () => String }, body: { required: false, type: () => String }, _data: { required: false, type: () => Object } };
    }
}
exports.ReplyToMessage = ReplyToMessage;
__decorate([
    (0, properties_dto_1.MessageIdOnlyProperty)(),
    __metadata("design:type", String)
], ReplyToMessage.prototype, "id", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], ReplyToMessage.prototype, "participant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Hello!',
    }),
    __metadata("design:type", String)
], ReplyToMessage.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Raw data from reply's message",
    }),
    __metadata("design:type", Object)
], ReplyToMessage.prototype, "_data", void 0);
//# sourceMappingURL=message.dto.js.map