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
exports.WAMessageReaction = exports.WAReaction = exports.WAMessage = exports.WAMessageBase = exports.MessageSource = exports.WALocation = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const media_dto_1 = require("./media.dto");
const enums_dto_1 = require("./enums.dto");
const properties_dto_1 = require("./properties.dto");
class WALocation {
    static _OPENAPI_METADATA_FACTORY() {
        return { latitude: { required: true, type: () => String }, longitude: { required: true, type: () => String }, live: { required: true, type: () => Boolean }, name: { required: false, type: () => String }, address: { required: false, type: () => String }, url: { required: false, type: () => String }, description: { required: false, type: () => String }, thumbnail: { required: false, type: () => String } };
    }
}
exports.WALocation = WALocation;
var MessageSource;
(function (MessageSource) {
    MessageSource["API"] = "api";
    MessageSource["APP"] = "app";
})(MessageSource || (exports.MessageSource = MessageSource = {}));
class WAMessageBase {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, timestamp: { required: true, type: () => Number }, from: { required: true, type: () => String }, fromMe: { required: true, type: () => Boolean }, source: { required: true, enum: require("./responses.dto").MessageSource }, to: { required: true, type: () => String }, participant: { required: true, type: () => String } };
    }
}
exports.WAMessageBase = WAMessageBase;
__decorate([
    (0, properties_dto_1.MessageIdProperty)(),
    __metadata("design:type", String)
], WAMessageBase.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp for when the message was created',
        example: 1666943582,
    }),
    __metadata("design:type", Number)
], WAMessageBase.prototype, "timestamp", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)({
        description: 'ID for the Chat that this message was sent to, except if the message was sent by the current user ',
    }),
    __metadata("design:type", String)
], WAMessageBase.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the message was sent by the current user',
    }),
    __metadata("design:type", Boolean)
], WAMessageBase.prototype, "fromMe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The device that sent the message - either API or APP. Available in events (webhooks/websockets) only and only "fromMe: true" messages.',
        example: MessageSource.API,
    }),
    __metadata("design:type", String)
], WAMessageBase.prototype, "source", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)({
        description: `
* ID for who this message is for.
* If the message is sent by the current user, it will be the Chat to which the message is being sent.
* If the message is sent by another user, it will be the ID for the current user.
`,
    }),
    __metadata("design:type", String)
], WAMessageBase.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'For groups - participant who sent the message',
    }),
    __metadata("design:type", String)
], WAMessageBase.prototype, "participant", void 0);
class WAMessage extends WAMessageBase {
    static _OPENAPI_METADATA_FACTORY() {
        return { body: { required: true, type: () => String }, hasMedia: { required: true, type: () => Boolean }, media: { required: false, type: () => require("./media.dto").WAMedia }, mediaUrl: { required: true, type: () => String }, ack: { required: true, enum: require("./enums.dto").WAMessageAck }, ackName: { required: true, type: () => String }, author: { required: false, type: () => String }, location: { required: false, type: () => require("./responses.dto").WALocation }, vCards: { required: false, type: () => [String] }, replyTo: { required: false, type: () => require("./message.dto").ReplyToMessage }, _data: { required: false, type: () => Object } };
    }
}
exports.WAMessage = WAMessage;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message content',
    }),
    __metadata("design:type", String)
], WAMessage.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the message has media available for download',
    }),
    __metadata("design:type", Boolean)
], WAMessage.prototype, "hasMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Media object for the message if any and downloaded',
    }),
    __metadata("design:type", media_dto_1.WAMedia)
], WAMessage.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Use `media.url` instead! The URL for the media in the message if any',
        deprecated: true,
        example: 'http://localhost:3000/api/files/false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA.oga',
    }),
    __metadata("design:type", String)
], WAMessage.prototype, "mediaUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ACK status for the message',
    }),
    __metadata("design:type", Number)
], WAMessage.prototype, "ack", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ACK status name for the message',
    }),
    __metadata("design:type", String)
], WAMessage.prototype, "ackName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'If the message was sent to a group, this field will contain the user that sent the message.',
    }),
    __metadata("design:type", String)
], WAMessage.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location information contained in the message, if the message is type "location"',
    }),
    __metadata("design:type", WALocation)
], WAMessage.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of vCards contained in the message.',
    }),
    __metadata("design:type", Array)
], WAMessage.prototype, "vCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message in a raw format that we get from WhatsApp. May be changed anytime, use it with caution! It depends a lot on the underlying backend.',
    }),
    __metadata("design:type", Object)
], WAMessage.prototype, "_data", void 0);
class WAReaction {
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String }, messageId: { required: true, type: () => String } };
    }
}
exports.WAReaction = WAReaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reaction to the message. Either the reaction (emoji) or empty string to remove the reaction',
    }),
    __metadata("design:type", String)
], WAReaction.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message ID for the message to react to',
        example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
    }),
    __metadata("design:type", String)
], WAReaction.prototype, "messageId", void 0);
class WAMessageReaction extends WAMessageBase {
    static _OPENAPI_METADATA_FACTORY() {
        return { reaction: { required: true, type: () => require("./responses.dto").WAReaction } };
    }
}
exports.WAMessageReaction = WAMessageReaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reaction to the message. Either the reaction (emoji) or empty string to remove the reaction',
    }),
    __metadata("design:type", WAReaction)
], WAMessageReaction.prototype, "reaction", void 0);
//# sourceMappingURL=responses.dto.js.map