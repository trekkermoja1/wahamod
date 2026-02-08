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
exports.MessagePollVoteRequest = exports.NewMessageIDResponse = exports.MessageButtonReply = exports.MessageDestination = exports.MessagePollRequest = exports.MessagePoll = exports.WANumberExistResult = exports.MessageStarRequest = exports.MessageReactionRequest = exports.MessageForwardRequest = exports.MessageLinkPreviewRequest = exports.MessageVideoRequest = exports.MessageVoiceRequest = exports.MessageFileRequest = exports.MessageImageRequest = exports.MessageLocationRequest = exports.MessageReplyRequest = exports.EditMessageRequest = exports.MessageLinkCustomPreviewRequest = exports.LinkPreviewData = exports.MessageTextRequest = exports.MessageContactVcardRequest = exports.Contact = exports.VCardContact = exports.MessageRequest = exports.SendSeenRequest = exports.ChatRequest = exports.GetPresenceQuery = exports.GetMessageQuery = exports.ChatQuery = exports.MessageTextQuery = exports.CheckNumberStatusQuery = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const IsFileType_1 = require("../nestjs/validation/IsFileType");
const chats_dto_1 = require("./chats.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
const files_dto_1 = require("./files.dto");
const properties_dto_1 = require("./properties.dto");
class CheckNumberStatusQuery extends base_dto_1.SessionQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: true, type: () => String } };
    }
}
exports.CheckNumberStatusQuery = CheckNumberStatusQuery;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The phone number to check',
        example: '1213213213',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckNumberStatusQuery.prototype, "phone", void 0);
class MessageTextQuery extends base_dto_1.SessionQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: true, type: () => String }, text: { required: true, type: () => String } };
    }
}
exports.MessageTextQuery = MessageTextQuery;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageTextQuery.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageTextQuery.prototype, "text", void 0);
class ChatQuery extends base_dto_1.SessionQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String } };
    }
}
exports.ChatQuery = ChatQuery;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], ChatQuery.prototype, "chatId", void 0);
class GetMessageQuery extends chats_dto_1.GetChatMessagesQuery {
    constructor() {
        super(...arguments);
        this.session = base_dto_1.WHATSAPP_DEFAULT_SESSION_NAME;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { session: { required: true, type: () => String, default: base_dto_1.WHATSAPP_DEFAULT_SESSION_NAME }, chatId: { required: true, type: () => String } };
    }
}
exports.GetMessageQuery = GetMessageQuery;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetMessageQuery.prototype, "session", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetMessageQuery.prototype, "chatId", void 0);
class GetPresenceQuery extends ChatQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.GetPresenceQuery = GetPresenceQuery;
class ChatRequest extends base_dto_1.SessionBaseRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String } };
    }
}
exports.ChatRequest = ChatRequest;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatRequest.prototype, "chatId", void 0);
class SendSeenRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { messageId: { required: false, type: () => String }, messageIds: { required: false, type: () => [String] }, participant: { required: false, type: () => String } };
    }
}
exports.SendSeenRequest = SendSeenRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
        deprecated: true,
        required: false,
    }),
    __metadata("design:type", String)
], SendSeenRequest.prototype, "messageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA'],
        required: false,
    }),
    __metadata("design:type", Array)
], SendSeenRequest.prototype, "messageIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11111111111@c.us',
        required: false,
        default: null,
        description: 'NOWEB engine only - the ID of the user that sent the message (undefined for individual chats)',
    }),
    __metadata("design:type", String)
], SendSeenRequest.prototype, "participant", void 0);
class MessageRequest extends base_dto_1.SessionBaseRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { messageId: { required: true, type: () => String } };
    }
}
exports.MessageRequest = MessageRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
    }),
    __metadata("design:type", String)
], MessageRequest.prototype, "messageId", void 0);
class VCardContact {
    static _OPENAPI_METADATA_FACTORY() {
        return { vcard: { required: true, type: () => String } };
    }
}
exports.VCardContact = VCardContact;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BEGIN:VCARD\nVERSION:3.0\nFN:Jane Doe\nORG:Company Name;\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\nEND:VCARD',
        description: 'The vcard string',
    }),
    __metadata("design:type", String)
], VCardContact.prototype, "vcard", void 0);
class Contact {
    constructor() {
        this.vcard = null;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String }, organization: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, whatsappId: { required: true, type: () => String }, vcard: { required: true, type: () => String, default: null } };
    }
}
exports.Contact = Contact;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'The full name of the contact',
    }),
    __metadata("design:type", String)
], Contact.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Company Name',
        description: 'The organization of the contact',
        required: false,
    }),
    __metadata("design:type", String)
], Contact.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+91 11111 11111',
        description: 'The phone number of the contact',
    }),
    __metadata("design:type", String)
], Contact.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '911111111111',
        description: 'The whatsapp id of the contact. DO NOT add + or @c.us',
        required: false,
    }),
    __metadata("design:type", String)
], Contact.prototype, "whatsappId", void 0);
let MessageContactVcardRequest = class MessageContactVcardRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { contacts: { required: true, type: () => [Object] }, reply_to: { required: false, type: () => String } };
    }
};
exports.MessageContactVcardRequest = MessageContactVcardRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        oneOf: [
            {
                $ref: (0, swagger_1.getSchemaPath)(VCardContact),
            },
            {
                $ref: (0, swagger_1.getSchemaPath)(Contact),
            },
        ],
    }),
    __metadata("design:type", Array)
], MessageContactVcardRequest.prototype, "contacts", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], MessageContactVcardRequest.prototype, "reply_to", void 0);
exports.MessageContactVcardRequest = MessageContactVcardRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(Contact, VCardContact)
], MessageContactVcardRequest);
class MessageTextRequest extends ChatRequest {
    constructor() {
        super(...arguments);
        this.text = 'Hi there!';
        this.linkPreview = true;
        this.linkPreviewHighQuality = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String, default: "Hi there!" }, reply_to: { required: false, type: () => String }, linkPreview: { required: false, type: () => Boolean, default: true }, linkPreviewHighQuality: { required: false, type: () => Boolean, default: false } };
    }
}
exports.MessageTextRequest = MessageTextRequest;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Array)
], MessageTextRequest.prototype, "mentions", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], MessageTextRequest.prototype, "reply_to", void 0);
let LinkPreviewData = class LinkPreviewData {
    constructor() {
        this.url = 'https://github.com/';
        this.title = 'Your Title';
        this.description = 'Check this out, amazing!';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String, default: "https://github.com/" }, title: { required: true, type: () => String, default: "Your Title" }, description: { required: true, type: () => String, default: "Check this out, amazing!" }, image: { required: false, type: () => Object } };
    }
};
exports.LinkPreviewData = LinkPreviewData;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_tld: false,
    }),
    __metadata("design:type", String)
], LinkPreviewData.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkPreviewData.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkPreviewData.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === void 0 ? void 0 : value.url) {
            return (0, class_transformer_1.plainToInstance)(files_dto_1.FileURL, value);
        }
        if (value === null || value === void 0 ? void 0 : value.data) {
            return (0, class_transformer_1.plainToInstance)(files_dto_1.FileContent, value);
        }
        return value;
    }, { toClassOnly: true }),
    (0, IsFileType_1.IsFileType)({ message: 'Image must contain either "data" or "url".' }),
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.FileURL) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.FileContent) },
        ],
        example: {
            url: process.env.WHATSAPP_SWAGGER_JPG_EXAMPLE_URL ||
                'https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg',
        },
    }),
    __metadata("design:type", Object)
], LinkPreviewData.prototype, "image", void 0);
exports.LinkPreviewData = LinkPreviewData = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.FileURL, files_dto_1.FileContent)
], LinkPreviewData);
class MessageLinkCustomPreviewRequest extends ChatRequest {
    constructor() {
        super(...arguments);
        this.text = 'Check this out! https://github.com/';
        this.linkPreviewHighQuality = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String, default: "Check this out! https://github.com/" }, linkPreviewHighQuality: { required: false, type: () => Boolean, default: true }, preview: { required: true, type: () => require("./chatting.dto").LinkPreviewData }, reply_to: { required: false, type: () => String } };
    }
}
exports.MessageLinkCustomPreviewRequest = MessageLinkCustomPreviewRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The text to send. MUST include the URL provided in preview.url',
    }),
    __metadata("design:type", String)
], MessageLinkCustomPreviewRequest.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MessageLinkCustomPreviewRequest.prototype, "linkPreviewHighQuality", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LinkPreviewData),
    __metadata("design:type", LinkPreviewData)
], MessageLinkCustomPreviewRequest.prototype, "preview", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MessageLinkCustomPreviewRequest.prototype, "reply_to", void 0);
class EditMessageRequest {
    constructor() {
        this.text = 'Hello, world!';
        this.linkPreview = true;
        this.linkPreviewHighQuality = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String, default: "Hello, world!" }, linkPreview: { required: false, type: () => Boolean, default: true }, linkPreviewHighQuality: { required: false, type: () => Boolean, default: false } };
    }
}
exports.EditMessageRequest = EditMessageRequest;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Array)
], EditMessageRequest.prototype, "mentions", void 0);
class MessageReplyRequest extends MessageTextRequest {
    constructor() {
        super(...arguments);
        this.text = 'Reply text';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String, default: "Reply text" } };
    }
}
exports.MessageReplyRequest = MessageReplyRequest;
class MessageLocationRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, title: { required: true, type: () => String }, reply_to: { required: false, type: () => String } };
    }
}
exports.MessageLocationRequest = MessageLocationRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 38.8937255,
    }),
    __metadata("design:type", Number)
], MessageLocationRequest.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -77.0969763,
    }),
    __metadata("design:type", Number)
], MessageLocationRequest.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Our office',
    }),
    __metadata("design:type", String)
], MessageLocationRequest.prototype, "title", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], MessageLocationRequest.prototype, "reply_to", void 0);
let FileRequest = class FileRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.RemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.BinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], FileRequest.prototype, "file", void 0);
FileRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.BinaryFile, files_dto_1.RemoteFile)
], FileRequest);
class MessageImageRequest extends FileRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { caption: { required: false, type: () => String }, reply_to: { required: false, type: () => String } };
    }
}
exports.MessageImageRequest = MessageImageRequest;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Array)
], MessageImageRequest.prototype, "mentions", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], MessageImageRequest.prototype, "reply_to", void 0);
class MessageFileRequest extends FileRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { caption: { required: false, type: () => String }, reply_to: { required: false, type: () => String } };
    }
}
exports.MessageFileRequest = MessageFileRequest;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Array)
], MessageFileRequest.prototype, "mentions", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], MessageFileRequest.prototype, "reply_to", void 0);
let MessageVoiceRequest = class MessageVoiceRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object }, reply_to: { required: false, type: () => String }, convert: { required: true, type: () => Boolean } };
    }
};
exports.MessageVoiceRequest = MessageVoiceRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VoiceRemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VoiceBinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], MessageVoiceRequest.prototype, "file", void 0);
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    __metadata("design:type", String)
], MessageVoiceRequest.prototype, "reply_to", void 0);
__decorate([
    (0, properties_dto_1.ConvertApiProperty)(),
    __metadata("design:type", Boolean)
], MessageVoiceRequest.prototype, "convert", void 0);
exports.MessageVoiceRequest = MessageVoiceRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.VoiceBinaryFile, files_dto_1.VoiceRemoteFile)
], MessageVoiceRequest);
let MessageVideoRequest = class MessageVideoRequest extends ChatRequest {
    constructor() {
        super(...arguments);
        this.caption = 'Just watch at this!';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object }, caption: { required: false, type: () => String, default: "Just watch at this!" }, reply_to: { required: false, type: () => String }, asNote: { required: false, type: () => Boolean }, convert: { required: true, type: () => Boolean } };
    }
};
exports.MessageVideoRequest = MessageVideoRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VideoRemoteFile) },
            { $ref: (0, swagger_1.getSchemaPath)(files_dto_1.VideoBinaryFile) },
        ],
    }),
    __metadata("design:type", Object)
], MessageVideoRequest.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Array)
], MessageVideoRequest.prototype, "mentions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
        example: null,
    }),
    __metadata("design:type", String)
], MessageVideoRequest.prototype, "reply_to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Send as video note (aka instant or round video).',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MessageVideoRequest.prototype, "asNote", void 0);
__decorate([
    (0, properties_dto_1.ConvertApiProperty)(),
    __metadata("design:type", Boolean)
], MessageVideoRequest.prototype, "convert", void 0);
exports.MessageVideoRequest = MessageVideoRequest = __decorate([
    (0, swagger_1.ApiExtraModels)(files_dto_1.VideoRemoteFile, files_dto_1.VideoBinaryFile)
], MessageVideoRequest);
class MessageLinkPreviewRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, title: { required: true, type: () => String } };
    }
}
exports.MessageLinkPreviewRequest = MessageLinkPreviewRequest;
class MessageForwardRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { messageId: { required: true, type: () => String } };
    }
}
exports.MessageForwardRequest = MessageForwardRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
    }),
    __metadata("design:type", String)
], MessageForwardRequest.prototype, "messageId", void 0);
class MessageReactionRequest extends MessageRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { reaction: { required: true, type: () => String } };
    }
}
exports.MessageReactionRequest = MessageReactionRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emoji to react with. Send an empty string to remove the reaction',
        example: '👍',
    }),
    __metadata("design:type", String)
], MessageReactionRequest.prototype, "reaction", void 0);
class MessageStarRequest extends MessageRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String }, star: { required: true, type: () => Boolean } };
    }
}
exports.MessageStarRequest = MessageStarRequest;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], MessageStarRequest.prototype, "chatId", void 0);
class WANumberExistResult {
    static _OPENAPI_METADATA_FACTORY() {
        return { numberExists: { required: true, type: () => Boolean }, chatId: { required: false, type: () => String } };
    }
}
exports.WANumberExistResult = WANumberExistResult;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Chat id for the phone number. Undefined if the number does not exist',
    }),
    __metadata("design:type", String)
], WANumberExistResult.prototype, "chatId", void 0);
class MessagePoll {
    constructor() {
        this.multipleAnswers = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, options: { required: true, type: () => [String] }, multipleAnswers: { required: true, type: () => Object, default: false } };
    }
}
exports.MessagePoll = MessagePoll;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'How are you?',
    }),
    __metadata("design:type", String)
], MessagePoll.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Awesome!', 'Good!', 'Not bad!'],
    }),
    __metadata("design:type", Array)
], MessagePoll.prototype, "options", void 0);
class MessagePollRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { poll: { required: true, type: () => require("./chatting.dto").MessagePoll }, reply_to: { required: false, type: () => String } };
    }
}
exports.MessagePollRequest = MessagePollRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
        example: null,
    }),
    __metadata("design:type", String)
], MessagePollRequest.prototype, "reply_to", void 0);
class MessageDestination {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, to: { required: true, type: () => String }, from: { required: true, type: () => String }, fromMe: { required: true, type: () => Boolean }, participant: { required: false, type: () => String } };
    }
}
exports.MessageDestination = MessageDestination;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message ID',
        example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
    }),
    __metadata("design:type", String)
], MessageDestination.prototype, "id", void 0);
class MessageButtonReply extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { replyTo: { required: false, type: () => String }, selectedDisplayText: { required: true, type: () => String }, selectedButtonID: { required: true, type: () => String } };
    }
}
exports.MessageButtonReply = MessageButtonReply;
__decorate([
    (0, properties_dto_1.ReplyToProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageButtonReply.prototype, "replyTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageButtonReply.prototype, "selectedDisplayText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageButtonReply.prototype, "selectedButtonID", void 0);
class NewMessageIDResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.NewMessageIDResponse = NewMessageIDResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pre-generated message id',
        example: 'BBBBBBBBBBBBBBBBB',
        required: true,
    }),
    __metadata("design:type", String)
], NewMessageIDResponse.prototype, "id", void 0);
class MessagePollVoteRequest extends ChatRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { pollMessageId: { required: true, type: () => String }, pollServerId: { required: false, type: () => Number }, votes: { required: true, type: () => [String] } };
    }
}
exports.MessagePollVoteRequest = MessagePollVoteRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the poll message. Format: {fromMe}_{chatID}_{messageId}[_{participant}] or just ID for GOWS',
        example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessagePollVoteRequest.prototype, "pollMessageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Only for Channels - server message id (if known); if omitted, API may look it up in the storage',
        required: false,
        example: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MessagePollVoteRequest.prototype, "pollServerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Poll options you are voting for',
        example: 'Awesome!',
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MessagePollVoteRequest.prototype, "votes", void 0);
//# sourceMappingURL=chatting.dto.js.map