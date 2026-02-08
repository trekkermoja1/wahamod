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
exports.WAHASessionPresence = exports.WAHAChatPresences = exports.WAHAPresenceData = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class WAHAPresenceData {
    static _OPENAPI_METADATA_FACTORY() {
        return { participant: { required: true, type: () => String }, lastKnownPresence: { required: true, enum: require("./enums.dto").WAHAPresenceStatus }, lastSeen: { required: false, type: () => Number } };
    }
}
exports.WAHAPresenceData = WAHAPresenceData;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Chat ID - participant or contact id',
        example: '11111111111@c.us',
    }),
    __metadata("design:type", String)
], WAHAPresenceData.prototype, "participant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1686568773,
    }),
    __metadata("design:type", Number)
], WAHAPresenceData.prototype, "lastSeen", void 0);
class WAHAChatPresences {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, presences: { required: true, type: () => [require("./presence.dto").WAHAPresenceData] } };
    }
}
exports.WAHAChatPresences = WAHAChatPresences;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Chat ID - either group id or contact id',
        example: '11111111111@c.us',
    }),
    __metadata("design:type", String)
], WAHAChatPresences.prototype, "id", void 0);
class WAHASessionPresence {
    static _OPENAPI_METADATA_FACTORY() {
        return { presence: { required: true, enum: require("./enums.dto").WAHAPresenceStatus }, chatId: { required: true, type: () => String } };
    }
}
exports.WAHASessionPresence = WAHASessionPresence;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Chat ID - either group id or contact id',
        example: '11111111111@c.us',
    }),
    __metadata("design:type", String)
], WAHASessionPresence.prototype, "chatId", void 0);
//# sourceMappingURL=presence.dto.js.map