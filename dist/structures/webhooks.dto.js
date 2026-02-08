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
exports.WAHAWebhookEngineEvent = exports.WAHAWebhookEventResponseFailed = exports.WAHAWebhookEventResponse = exports.EnginePayload = exports.WAHAWebhookLabelChatDeleted = exports.WAHAWebhookLabelChatAdded = exports.WAHAWebhookLabelDeleted = exports.WAHAWebhookLabelUpsert = exports.WAHAWebhookCallRejected = exports.WAHAWebhookCallAccepted = exports.WAHAWebhookCallReceived = exports.WAHAWebhookChatArchive = exports.WAHAWebhookPollVoteFailed = exports.WAHAWebhookPollVote = exports.WAHAWebhookPresenceUpdate = exports.WAHAWebhookGroupLeave = exports.WAHAWebhookGroupJoin = exports.WAHAWebhookStateChange = exports.WAHAWebhookMessageEdited = exports.WAHAWebhookMessageRevoked = exports.WAHAWebhookMessageAckGroup = exports.WAHAWebhookMessageAck = exports.WAHAWebhookMessageAny = exports.WAHAWebhookMessageReaction = exports.WAHAWebhookMessage = exports.WAHAWebhookSessionStatus = exports.WAHAWebhook = exports.WASessionStatusBody = exports.SessionStatusPoint = exports.WAMessageEditedBody = exports.WAMessageRevokedBody = exports.PollVotePayload = exports.PollVote = exports.WAGroupPayload = exports.WAMessageAckBody = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const chatting_dto_1 = require("./chatting.dto");
const enums_dto_1 = require("./enums.dto");
const properties_dto_1 = require("./properties.dto");
const responses_dto_1 = require("./responses.dto");
class WAMessageAckBody {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, from: { required: true, type: () => String }, to: { required: true, type: () => String }, participant: { required: true, type: () => String }, fromMe: { required: true, type: () => Boolean }, ack: { required: true, enum: require("./enums.dto").WAMessageAck }, ackName: { required: true, type: () => String }, _data: { required: false, type: () => Object } };
    }
}
exports.WAMessageAckBody = WAMessageAckBody;
__decorate([
    (0, properties_dto_1.MessageIdProperty)(),
    __metadata("design:type", String)
], WAMessageAckBody.prototype, "id", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], WAMessageAckBody.prototype, "from", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], WAMessageAckBody.prototype, "to", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    __metadata("design:type", String)
], WAMessageAckBody.prototype, "participant", void 0);
class WAGroupPayload {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, timestamp: { required: true, type: () => Number }, chatId: { required: true, type: () => String }, author: { required: true, type: () => String }, body: { required: true, type: () => String }, recipientIds: { required: true, type: () => [String] } };
    }
}
exports.WAGroupPayload = WAGroupPayload;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID that represents the groupNotification',
    }),
    __metadata("design:type", Object)
], WAGroupPayload.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp for when the groupNotification was created',
    }),
    __metadata("design:type", Number)
], WAGroupPayload.prototype, "timestamp", void 0);
__decorate([
    (0, properties_dto_1.ChatIdProperty)({
        description: 'ID for the Chat that this groupNotification was sent for',
    }),
    __metadata("design:type", String)
], WAGroupPayload.prototype, "chatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ContactId for the user that produced the GroupNotification',
    }),
    __metadata("design:type", String)
], WAGroupPayload.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Extra content',
    }),
    __metadata("design:type", String)
], WAGroupPayload.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact IDs for the users that were affected by this GroupNotification',
    }),
    __metadata("design:type", Array)
], WAGroupPayload.prototype, "recipientIds", void 0);
class PollVote extends chatting_dto_1.MessageDestination {
    static _OPENAPI_METADATA_FACTORY() {
        return { selectedOptions: { required: true, type: () => [String] }, timestamp: { required: true, type: () => Number } };
    }
}
exports.PollVote = PollVote;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Option that user has selected',
        example: ['Awesome!'],
    }),
    __metadata("design:type", Array)
], PollVote.prototype, "selectedOptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp, ms',
        example: 1692861369,
    }),
    __metadata("design:type", Number)
], PollVote.prototype, "timestamp", void 0);
class PollVotePayload {
    static _OPENAPI_METADATA_FACTORY() {
        return { vote: { required: true, type: () => require("./webhooks.dto").PollVote }, poll: { required: true, type: () => require("./chatting.dto").MessageDestination }, _data: { required: false, type: () => Object } };
    }
}
exports.PollVotePayload = PollVotePayload;
class WAMessageRevokedBody {
    static _OPENAPI_METADATA_FACTORY() {
        return { after: { required: false, type: () => require("./responses.dto").WAMessage }, before: { required: false, type: () => require("./responses.dto").WAMessage }, revokedMessageId: { required: false, type: () => String }, _data: { required: false, type: () => Object } };
    }
}
exports.WAMessageRevokedBody = WAMessageRevokedBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the message that was revoked',
        example: 'A06CA7BB5DD8C8F705628CDB7E3A33C9',
    }),
    __metadata("design:type", String)
], WAMessageRevokedBody.prototype, "revokedMessageId", void 0);
class WAMessageEditedBody extends responses_dto_1.WAMessage {
    static _OPENAPI_METADATA_FACTORY() {
        return { editedMessageId: { required: false, type: () => String } };
    }
}
exports.WAMessageEditedBody = WAMessageEditedBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the original message that was edited',
        example: 'A06CA7BB5DD8C8F705628CDB7E3A33C9',
    }),
    __metadata("design:type", String)
], WAMessageEditedBody.prototype, "editedMessageId", void 0);
class SessionStatusPoint {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, enum: require("./enums.dto").WAHASessionStatus }, timestamp: { required: true, type: () => Number } };
    }
}
exports.SessionStatusPoint = SessionStatusPoint;
class WASessionStatusBody {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, status: { required: true, enum: require("./enums.dto").WAHASessionStatus }, statuses: { required: true, type: () => [require("./webhooks.dto").SessionStatusPoint] } };
    }
}
exports.WASessionStatusBody = WASessionStatusBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'default',
    }),
    __metadata("design:type", String)
], WASessionStatusBody.prototype, "name", void 0);
class WAHAWebhook {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, timestamp: { required: true, type: () => Number }, session: { required: true, type: () => String }, metadata: { required: false, type: () => Object }, engine: { required: true, enum: require("./enums.dto").WAHAEngine }, me: { required: false, type: () => require("./sessions.dto").MeInfo }, environment: { required: true, type: () => require("./environment.dto").WAHAEnvironment }, event: { required: true, enum: require("./enums.dto").WAHAEvents }, payload: { required: true } };
    }
}
exports.WAHAWebhook = WAHAWebhook;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'evt_01aaaaaaaaaaaaaaaaaaaaaaaa',
        description: 'Unique identifier for the event - lower case ULID format. https://github.com/ulid/spec',
    }),
    __metadata("design:type", String)
], WAHAWebhook.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1634567890123,
        description: 'Unix timestamp (ms) for when the event was created.',
    }),
    __metadata("design:type", Number)
], WAHAWebhook.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'default',
    }),
    __metadata("design:type", String)
], WAHAWebhook.prototype, "session", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            'user.id': '123',
            'user.email': 'email@example.com',
        },
        description: 'Metadata for the session.',
    }),
    __metadata("design:type", Object)
], WAHAWebhook.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: enums_dto_1.WAHAEngine.WEBJS,
    }),
    __metadata("design:type", String)
], WAHAWebhook.prototype, "engine", void 0);
class WAHAWebhookSessionStatus extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.SESSION_STATUS;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.SESSION_STATUS, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").WASessionStatusBody } };
    }
}
exports.WAHAWebhookSessionStatus = WAHAWebhookSessionStatus;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the session status changes.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookSessionStatus.prototype, "event", void 0);
class WAHAWebhookMessage extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./responses.dto").WAMessage } };
    }
}
exports.WAHAWebhookMessage = WAHAWebhookMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Incoming message.' }),
    __metadata("design:type", Object)
], WAHAWebhookMessage.prototype, "event", void 0);
class WAHAWebhookMessageReaction extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE_REACTION;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE_REACTION, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./responses.dto").WAMessageReaction } };
    }
}
exports.WAHAWebhookMessageReaction = WAHAWebhookMessageReaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a user reacts or removes a reaction.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookMessageReaction.prototype, "event", void 0);
class WAHAWebhookMessageAny extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE_ANY;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE_ANY, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./responses.dto").WAMessage } };
    }
}
exports.WAHAWebhookMessageAny = WAHAWebhookMessageAny;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fired on all message creations, including your own.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookMessageAny.prototype, "event", void 0);
class WAHAWebhookMessageAck extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE_ACK;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE_ACK, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").WAMessageAckBody } };
    }
}
exports.WAHAWebhookMessageAck = WAHAWebhookMessageAck;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Receive events when server or recipient gets the message, read or played it (contacts only).',
    }),
    __metadata("design:type", Object)
], WAHAWebhookMessageAck.prototype, "event", void 0);
class WAHAWebhookMessageAckGroup extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE_ACK_GROUP;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE_ACK_GROUP, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").WAMessageAckBody } };
    }
}
exports.WAHAWebhookMessageAckGroup = WAHAWebhookMessageAckGroup;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Receive events when participants in a group read or play messages.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookMessageAckGroup.prototype, "event", void 0);
class WAHAWebhookMessageRevoked extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE_REVOKED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE_REVOKED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").WAMessageRevokedBody } };
    }
}
exports.WAHAWebhookMessageRevoked = WAHAWebhookMessageRevoked;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a user, whether it be you or any other participant, ' +
            'revokes a previously sent message.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookMessageRevoked.prototype, "event", void 0);
class WAHAWebhookMessageEdited extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.MESSAGE_EDITED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.MESSAGE_EDITED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").WAMessageEditedBody } };
    }
}
exports.WAHAWebhookMessageEdited = WAHAWebhookMessageEdited;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a user edits a previously sent message.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookMessageEdited.prototype, "event", void 0);
class WAHAWebhookStateChange extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.STATE_CHANGE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.STATE_CHANGE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => Object } };
    }
}
exports.WAHAWebhookStateChange = WAHAWebhookStateChange;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'It’s an internal engine’s state, not session status.',
        deprecated: true,
    }),
    __metadata("design:type", Object)
], WAHAWebhookStateChange.prototype, "event", void 0);
class WAHAWebhookGroupJoin extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.GROUP_JOIN;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.GROUP_JOIN, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => Object } };
    }
}
exports.WAHAWebhookGroupJoin = WAHAWebhookGroupJoin;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Some one join a group.',
        deprecated: true,
    }),
    __metadata("design:type", Object)
], WAHAWebhookGroupJoin.prototype, "event", void 0);
class WAHAWebhookGroupLeave extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.GROUP_LEAVE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.GROUP_LEAVE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => Object } };
    }
}
exports.WAHAWebhookGroupLeave = WAHAWebhookGroupLeave;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Some one left a group.',
        deprecated: true,
    }),
    __metadata("design:type", Object)
], WAHAWebhookGroupLeave.prototype, "event", void 0);
class WAHAWebhookPresenceUpdate extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.PRESENCE_UPDATE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.PRESENCE_UPDATE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./presence.dto").WAHAChatPresences } };
    }
}
exports.WAHAWebhookPresenceUpdate = WAHAWebhookPresenceUpdate;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The most recent presence information for a chat.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookPresenceUpdate.prototype, "event", void 0);
class WAHAWebhookPollVote extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.POLL_VOTE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.POLL_VOTE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").PollVotePayload } };
    }
}
exports.WAHAWebhookPollVote = WAHAWebhookPollVote;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'With this event, you receive new votes for the poll sent.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookPollVote.prototype, "event", void 0);
class WAHAWebhookPollVoteFailed extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.POLL_VOTE_FAILED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.POLL_VOTE_FAILED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").PollVotePayload } };
    }
}
exports.WAHAWebhookPollVoteFailed = WAHAWebhookPollVoteFailed;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'There may be cases when it fails to decrypt a vote from the user. ' +
            'Read more about how to handle such events in the documentations.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookPollVoteFailed.prototype, "event", void 0);
class WAHAWebhookChatArchive extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.CHAT_ARCHIVE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.CHAT_ARCHIVE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./chats.dto").ChatArchiveEvent } };
    }
}
exports.WAHAWebhookChatArchive = WAHAWebhookChatArchive;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the chat is archived or unarchived',
    }),
    __metadata("design:type", Object)
], WAHAWebhookChatArchive.prototype, "event", void 0);
class WAHAWebhookCallReceived extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.CALL_RECEIVED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.CALL_RECEIVED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./calls.dto").CallData } };
    }
}
exports.WAHAWebhookCallReceived = WAHAWebhookCallReceived;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the call is received by the user.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookCallReceived.prototype, "event", void 0);
class WAHAWebhookCallAccepted extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.CALL_ACCEPTED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.CALL_ACCEPTED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./calls.dto").CallData } };
    }
}
exports.WAHAWebhookCallAccepted = WAHAWebhookCallAccepted;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the call is accepted by the user.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookCallAccepted.prototype, "event", void 0);
class WAHAWebhookCallRejected extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.CALL_REJECTED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.CALL_REJECTED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./calls.dto").CallData } };
    }
}
exports.WAHAWebhookCallRejected = WAHAWebhookCallRejected;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the call is rejected by the user.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookCallRejected.prototype, "event", void 0);
class WAHAWebhookLabelUpsert extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.LABEL_UPSERT;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.LABEL_UPSERT, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./labels.dto").Label } };
    }
}
exports.WAHAWebhookLabelUpsert = WAHAWebhookLabelUpsert;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a label is created or updated',
    }),
    __metadata("design:type", Object)
], WAHAWebhookLabelUpsert.prototype, "event", void 0);
class WAHAWebhookLabelDeleted extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.LABEL_DELETED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.LABEL_DELETED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./labels.dto").Label } };
    }
}
exports.WAHAWebhookLabelDeleted = WAHAWebhookLabelDeleted;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a label is deleted',
    }),
    __metadata("design:type", Object)
], WAHAWebhookLabelDeleted.prototype, "event", void 0);
class WAHAWebhookLabelChatAdded extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.LABEL_CHAT_ADDED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.LABEL_CHAT_ADDED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./labels.dto").LabelChatAssociation } };
    }
}
exports.WAHAWebhookLabelChatAdded = WAHAWebhookLabelChatAdded;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a label is added to a chat',
    }),
    __metadata("design:type", Object)
], WAHAWebhookLabelChatAdded.prototype, "event", void 0);
class WAHAWebhookLabelChatDeleted extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.LABEL_CHAT_DELETED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.LABEL_CHAT_DELETED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./labels.dto").LabelChatAssociation } };
    }
}
exports.WAHAWebhookLabelChatDeleted = WAHAWebhookLabelChatDeleted;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when a label is deleted from a chat',
    }),
    __metadata("design:type", Object)
], WAHAWebhookLabelChatDeleted.prototype, "event", void 0);
class EnginePayload {
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => String }, data: { required: true, type: () => Object } };
    }
}
exports.EnginePayload = EnginePayload;
class WAHAWebhookEventResponse extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.EVENT_RESPONSE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.EVENT_RESPONSE, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./events.dto").EventResponsePayload } };
    }
}
exports.WAHAWebhookEventResponse = WAHAWebhookEventResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the event response is received.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookEventResponse.prototype, "event", void 0);
class WAHAWebhookEventResponseFailed extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.EVENT_RESPONSE_FAILED;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.EVENT_RESPONSE_FAILED, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./events.dto").EventResponsePayload } };
    }
}
exports.WAHAWebhookEventResponseFailed = WAHAWebhookEventResponseFailed;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The event is triggered when the event response is failed to decrypt.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookEventResponseFailed.prototype, "event", void 0);
class WAHAWebhookEngineEvent extends WAHAWebhook {
    constructor() {
        super(...arguments);
        this.event = enums_dto_1.WAHAEvents.ENGINE_EVENT;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { event: { required: true, type: () => Object, default: enums_dto_1.WAHAEvents.ENGINE_EVENT, enum: require("./enums.dto").WAHAEvents }, payload: { required: true, type: () => require("./webhooks.dto").EnginePayload } };
    }
}
exports.WAHAWebhookEngineEvent = WAHAWebhookEngineEvent;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Internal engine event.',
    }),
    __metadata("design:type", Object)
], WAHAWebhookEngineEvent.prototype, "event", void 0);
//# sourceMappingURL=webhooks.dto.js.map