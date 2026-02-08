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
exports.LidsListQueryParams = exports.LidToPhoneNumber = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("./pagination.dto");
class LidToPhoneNumber {
    static _OPENAPI_METADATA_FACTORY() {
        return { lid: { required: false, type: () => String }, pn: { required: false, type: () => String } };
    }
}
exports.LidToPhoneNumber = LidToPhoneNumber;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Linked ID for the user',
        example: '1111111@lid',
    }),
    __metadata("design:type", String)
], LidToPhoneNumber.prototype, "lid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number (chat id) for the user',
        example: '3333333@c.us',
    }),
    __metadata("design:type", String)
], LidToPhoneNumber.prototype, "pn", void 0);
class LidsListQueryParams extends pagination_dto_1.LimitOffsetParams {
    constructor() {
        super(...arguments);
        this.limit = 100;
        this.offset = 0;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, default: 100 }, offset: { required: false, type: () => Number, default: 0 } };
    }
}
exports.LidsListQueryParams = LidsListQueryParams;
//# sourceMappingURL=lids.dto.js.map