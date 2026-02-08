"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootExports = void 0;
const BullUtils_1 = require("../app_sdk/BullUtils");
const constants_1 = require("../app_sdk/constants");
const message_cleanup_1 = require("./consumers/scheduled/message.cleanup");
const ChatWootAppService_1 = require("./services/ChatWootAppService");
const lodash = require("lodash");
const chatwoot_locales_controller_1 = require("./api/chatwoot.locales.controller");
const chatwoot_webhook_controller_1 = require("./api/chatwoot.webhook.controller");
const commands_1 = require("./consumers/inbox/commands");
const message_created_1 = require("./consumers/inbox/message_created");
const message_deleted_1 = require("./consumers/inbox/message_deleted");
const message_updated_1 = require("./consumers/inbox/message_updated");
const QueueName_1 = require("./consumers/QueueName");
const check_version_1 = require("./consumers/scheduled/check.version");
const message_any_1 = require("./consumers/waha/message.any");
const message_edited_1 = require("./consumers/waha/message.edited");
const message_reaction_1 = require("./consumers/waha/message.reaction");
const message_revoked_1 = require("./consumers/waha/message.revoked");
const message_ack_1 = require("./consumers/waha/message.ack");
const session_status_1 = require("./consumers/waha/session.status");
const call_accepted_1 = require("./consumers/waha/call.accepted");
const call_received_1 = require("./consumers/waha/call.received");
const call_rejected_1 = require("./consumers/waha/call.rejected");
const ChatWootQueueService_1 = require("./services/ChatWootQueueService");
const ChatWootScheduleService_1 = require("./services/ChatWootScheduleService");
const ChatWootWAHAQueueService_1 = require("./services/ChatWootWAHAQueueService");
const QueueRegistry_1 = require("./services/QueueRegistry");
const conversation_created_1 = require("./consumers/inbox/conversation_created");
const conversation_status_changed_1 = require("./consumers/inbox/conversation_status_changed");
const contacts_pull_1 = require("./consumers/task/contacts.pull");
const messages_pull_1 = require("./consumers/task/messages.pull");
const bullmq_1 = require("@nestjs/bullmq");
const QueueManager_1 = require("./services/QueueManager");
const CONTROLLERS = [chatwoot_webhook_controller_1.ChatwootWebhookController, chatwoot_locales_controller_1.ChatwootLocalesController];
const IMPORTS = lodash.flatten([
    bullmq_1.BullModule.registerFlowProducer({
        name: QueueName_1.FlowProducerName.MESSAGES_PULL_FLOW,
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.SCHEDULED_MESSAGE_CLEANUP,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.SCHEDULED_CHECK_VERSION,
        defaultJobOptions: (0, constants_1.merge)(constants_1.NoRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.TASK_CONTACTS_PULL,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.TASK_MESSAGES_PULL,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_MESSAGE_ANY,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_MESSAGE_REACTION,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_MESSAGE_EDITED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_MESSAGE_REVOKED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_MESSAGE_ACK,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_CALL_RECEIVED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_CALL_ACCEPTED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_CALL_REJECTED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.WAHA_SESSION_STATUS,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.INBOX_MESSAGE_CREATED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.INBOX_MESSAGE_UPDATED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.INBOX_CONVERSATION_CREATED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.NoRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.INBOX_CONVERSATION_STATUS_CHANGED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.NoRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.INBOX_MESSAGE_DELETED,
        defaultJobOptions: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
    (0, BullUtils_1.RegisterAppQueue)({
        name: QueueName_1.QueueName.INBOX_COMMANDS,
        defaultJobOptions: (0, constants_1.merge)(constants_1.NoRetriesJobOptions, constants_1.JobRemoveOptions),
    }),
]);
const PROVIDERS = [
    message_created_1.ChatWootInboxMessageCreatedConsumer,
    message_updated_1.ChatWootInboxMessageUpdatedConsumer,
    message_deleted_1.ChatWootInboxMessageDeletedConsumer,
    conversation_created_1.ChatWootConversationCreatedConsumer,
    conversation_status_changed_1.ChatWootConversationStatusChangedConsumer,
    commands_1.ChatWootInboxCommandsConsumer,
    contacts_pull_1.TaskContactsPullConsumer,
    messages_pull_1.TaskMessagesPullConsumer,
    session_status_1.WAHASessionStatusConsumer,
    message_any_1.WAHAMessageAnyConsumer,
    message_reaction_1.WAHAMessageReactionConsumer,
    message_edited_1.WAHAMessageEditedConsumer,
    message_revoked_1.WAHAMessageRevokedConsumer,
    message_ack_1.WAHAMessageAckConsumer,
    call_received_1.WAHACallReceivedConsumer,
    call_accepted_1.WAHACallAcceptedConsumer,
    call_rejected_1.WAHACallRejectedConsumer,
    message_cleanup_1.MessageCleanupConsumer,
    check_version_1.CheckVersionConsumer,
    ChatWootWAHAQueueService_1.ChatWootWAHAQueueService,
    ChatWootQueueService_1.ChatWootQueueService,
    ChatWootScheduleService_1.ChatWootScheduleService,
    ChatWootAppService_1.ChatWootAppService,
    QueueRegistry_1.QueueRegistry,
    QueueManager_1.QueueManager,
];
exports.ChatWootExports = {
    providers: PROVIDERS,
    imports: IMPORTS,
    controllers: CONTROLLERS,
};
//# sourceMappingURL=chatwoot.module.js.map