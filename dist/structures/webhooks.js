"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAHA_WEBHOOKS = void 0;
const groups_webhooks_dto_1 = require("./groups.webhooks.dto");
const webhooks_dto_1 = require("./webhooks.dto");
const WAHA_WEBHOOKS = [
    webhooks_dto_1.WAHAWebhookSessionStatus,
    webhooks_dto_1.WAHAWebhookMessage,
    webhooks_dto_1.WAHAWebhookMessageReaction,
    webhooks_dto_1.WAHAWebhookMessageAny,
    webhooks_dto_1.WAHAWebhookMessageAck,
    webhooks_dto_1.WAHAWebhookMessageAckGroup,
    webhooks_dto_1.WAHAWebhookMessageRevoked,
    webhooks_dto_1.WAHAWebhookMessageEdited,
    groups_webhooks_dto_1.WebhookGroupV2Join,
    groups_webhooks_dto_1.WebhookGroupV2Leave,
    groups_webhooks_dto_1.WebhookGroupV2Update,
    groups_webhooks_dto_1.WebhookGroupV2Participants,
    webhooks_dto_1.WAHAWebhookPresenceUpdate,
    webhooks_dto_1.WAHAWebhookPollVote,
    webhooks_dto_1.WAHAWebhookPollVoteFailed,
    webhooks_dto_1.WAHAWebhookChatArchive,
    webhooks_dto_1.WAHAWebhookCallReceived,
    webhooks_dto_1.WAHAWebhookCallAccepted,
    webhooks_dto_1.WAHAWebhookCallRejected,
    webhooks_dto_1.WAHAWebhookLabelUpsert,
    webhooks_dto_1.WAHAWebhookLabelDeleted,
    webhooks_dto_1.WAHAWebhookLabelChatAdded,
    webhooks_dto_1.WAHAWebhookLabelChatDeleted,
    webhooks_dto_1.WAHAWebhookEventResponse,
    webhooks_dto_1.WAHAWebhookEventResponseFailed,
    webhooks_dto_1.WAHAWebhookEngineEvent,
    webhooks_dto_1.WAHAWebhookGroupJoin,
    webhooks_dto_1.WAHAWebhookGroupLeave,
    webhooks_dto_1.WAHAWebhookStateChange,
];
exports.WAHA_WEBHOOKS = WAHA_WEBHOOKS;
//# sourceMappingURL=webhooks.js.map