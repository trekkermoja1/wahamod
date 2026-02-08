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
exports.EventResponsePayload = exports.EventResponse = exports.EventResponseType = exports.EventCancelRequest = exports.EventMessageRequest = exports.EventMessage = exports.EventLocation = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const responses_dto_1 = require("./responses.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const properties_dto_1 = require("./properties.dto");
class EventLocation {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.EventLocation = EventLocation;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the location',
        example: 'Luxe Nail Studio 💅',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EventLocation.prototype, "name", void 0);
class EventMessage {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, startTime: { required: true, type: () => Number }, endTime: { required: false, type: () => Number }, location: { required: false, type: () => require("./events.dto").EventLocation }, extraGuestsAllowed: { required: false, type: () => Boolean } };
    }
}
exports.EventMessage = EventMessage;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the event',
        example: "John's Nail Appointment 💅",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EventMessage.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the event',
        example: "It's time for your nail care session! 🌟\\n\\nYou'll be getting a *classic gel manicure* – clean, polished, and long-lasting. 💖\\n\\n📍 *Location:* Luxe Nail Studio\\nWe're on the *2nd floor of the Plaza Mall*, next to the flower shop. Look for the *pink neon sign*!\\n\\nFeel free to arrive *5–10 mins early* so we can get started on time 😊",
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EventMessage.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start time of the event (Unix timestamp in seconds)',
        example: 2063137000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], EventMessage.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End time of the event (Unix timestamp in seconds)',
        example: null,
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EventMessage.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location of the event',
        required: false,
        type: EventLocation,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EventLocation),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", EventLocation)
], EventMessage.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether extra guests are allowed',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EventMessage.prototype, "extraGuestsAllowed", void 0);
class EventMessageRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String }, event: { required: true, type: () => require("./events.dto").EventMessage }, reply_to: { required: false, type: () => String } };
    }
}
exports.EventMessageRequest = EventMessageRequest;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], EventMessageRequest.prototype, "chatId", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], EventMessageRequest.prototype, "reply_to", void 0);
class EventCancelRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.EventCancelRequest = EventCancelRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the event message to cancel',
        example: 'true_12345678901@c.us_ABCDEFGHIJKLMNOPQRST',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EventCancelRequest.prototype, "id", void 0);
var EventResponseType;
(function (EventResponseType) {
    EventResponseType["UNKNOWN"] = "UNKNOWN";
    EventResponseType["GOING"] = "GOING";
    EventResponseType["NOT_GOING"] = "NOT_GOING";
    EventResponseType["MAYBE"] = "MAYBE";
})(EventResponseType || (exports.EventResponseType = EventResponseType = {}));
class EventResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { response: { required: true, enum: require("./events.dto").EventResponseType }, timestampMs: { required: true, type: () => Number }, extraGuestCount: { required: true, type: () => Number } };
    }
}
exports.EventResponse = EventResponse;
class EventResponsePayload extends responses_dto_1.WAMessageBase {
    static _OPENAPI_METADATA_FACTORY() {
        return { eventCreationKey: { required: true, type: () => require("./chatting.dto").MessageDestination }, eventResponse: { required: false, type: () => require("./events.dto").EventResponse }, _data: { required: false, type: () => Object } };
    }
}
exports.EventResponsePayload = EventResponsePayload;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message in a raw format that we get from WhatsApp. May be changed anytime, use it with caution! It depends a lot on the underlying backend.',
    }),
    __metadata("design:type", Object)
], EventResponsePayload.prototype, "_data", void 0);
//# sourceMappingURL=events.dto.js.map