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
exports.WebhookGroupV2Participants = exports.WebhookGroupV2Update = exports.WebhookGroupV2Leave = exports.WebhookGroupV2Join = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const enums_dto_1 = require("./enums.dto");
const webhooks_dto_1 = require("./webhooks.dto");
class WebhookGroupV2Join extends webhooks_dto_1.WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.GROUP_V2_JOIN;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.GROUP_V2_JOIN, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./groups.events.dto").GroupV2JoinEvent } };
    }
}
exports.WebhookGroupV2Join = WebhookGroupV2Join;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When you joined or were added to a group',
    }),
    __metadata("design:type", Object)
], WebhookGroupV2Join.prototype, "event", void 0);
class WebhookGroupV2Leave extends webhooks_dto_1.WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.GROUP_V2_LEAVE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.GROUP_V2_LEAVE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./groups.events.dto").GroupV2LeaveEvent } };
    }
}
exports.WebhookGroupV2Leave = WebhookGroupV2Leave;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When you left or were removed from a group',
    }),
    __metadata("design:type", Object)
], WebhookGroupV2Leave.prototype, "event", void 0);
class WebhookGroupV2Update extends webhooks_dto_1.WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.GROUP_V2_UPDATE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.GROUP_V2_UPDATE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./groups.events.dto").GroupV2UpdateEvent } };
    }
}
exports.WebhookGroupV2Update = WebhookGroupV2Update;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When group info is updated',
    }),
    __metadata("design:type", Object)
], WebhookGroupV2Update.prototype, "event", void 0);
class WebhookGroupV2Participants extends webhooks_dto_1.WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.GROUP_V2_PARTICIPANTS;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.GROUP_V2_PARTICIPANTS, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./groups.events.dto").GroupV2ParticipantsEvent } };
    }
}
exports.WebhookGroupV2Participants = WebhookGroupV2Participants;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When participants changed - join, leave, promote to admin',
    }),
    __metadata("design:type", Object)
], WebhookGroupV2Participants.prototype, "event", void 0);
//# sourceMappingURL=groups.webhooks.dto.js.map