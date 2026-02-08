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
exports.GroupV2ParticipantsEvent = exports.GroupParticipantType = exports.GroupV2UpdateEvent = exports.GroupV2LeaveEvent = exports.GroupV2JoinEvent = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class GroupV2JoinEvent {
    static _OPENAPI_METADATA_FACTORY() {
        return { timestamp: { required: true, type: () => Number }, group: { required: true, type: () => require("./groups.dto").GroupInfo }, _data: { required: true, type: () => Object } };
    }
}
exports.GroupV2JoinEvent = GroupV2JoinEvent;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp',
        example: 1666943582,
    }),
    __metadata("design:type", Number)
], GroupV2JoinEvent.prototype, "timestamp", void 0);
class GroupV2LeaveEvent {
    static _OPENAPI_METADATA_FACTORY() {
        return { timestamp: { required: true, type: () => Number }, group: { required: true, type: () => require("./groups.dto").GroupId }, _data: { required: true, type: () => Object } };
    }
}
exports.GroupV2LeaveEvent = GroupV2LeaveEvent;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp',
        example: 1666943582,
    }),
    __metadata("design:type", Number)
], GroupV2LeaveEvent.prototype, "timestamp", void 0);
class GroupV2UpdateEvent {
    static _OPENAPI_METADATA_FACTORY() {
        return { timestamp: { required: true, type: () => Number }, group: { required: true, type: () => Object }, _data: { required: true, type: () => Object } };
    }
}
exports.GroupV2UpdateEvent = GroupV2UpdateEvent;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp',
        example: 1666943582,
    }),
    __metadata("design:type", Number)
], GroupV2UpdateEvent.prototype, "timestamp", void 0);
var GroupParticipantType;
(function (GroupParticipantType) {
    GroupParticipantType["JOIN"] = "join";
    GroupParticipantType["LEAVE"] = "leave";
    GroupParticipantType["PROMOTE"] = "promote";
    GroupParticipantType["DEMOTE"] = "demote";
})(GroupParticipantType || (exports.GroupParticipantType = GroupParticipantType = {}));
class GroupV2ParticipantsEvent {
    static _OPENAPI_METADATA_FACTORY() {
        return { group: { required: true, type: () => require("./groups.dto").GroupId }, type: { required: true, enum: require("./groups.events.dto").GroupParticipantType }, timestamp: { required: true, type: () => Number }, participants: { required: true, type: () => [require("./groups.dto").GroupParticipant] }, _data: { required: true, type: () => Object } };
    }
}
exports.GroupV2ParticipantsEvent = GroupV2ParticipantsEvent;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the event',
    }),
    __metadata("design:type", String)
], GroupV2ParticipantsEvent.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp',
        example: 1666943582,
    }),
    __metadata("design:type", Number)
], GroupV2ParticipantsEvent.prototype, "timestamp", void 0);
//# sourceMappingURL=groups.events.dto.js.map