"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowProducerName = exports.QueueName = void 0;
var QueueName;
(function (QueueName) {
    QueueName["SCHEDULED_MESSAGE_CLEANUP"] = "chatwoot.scheduled | message.cleanup";
    QueueName["SCHEDULED_CHECK_VERSION"] = "chatwoot.scheduled | check.version";
    QueueName["TASK_CONTACTS_PULL"] = "chatwoot.task | contacts.pull";
    QueueName["TASK_MESSAGES_PULL"] = "chatwoot.task | messages.pull";
    QueueName["WAHA_SESSION_STATUS"] = "chatwoot.waha | session.status";
    QueueName["WAHA_MESSAGE_ANY"] = "chatwoot.waha | message.any";
    QueueName["WAHA_MESSAGE_REACTION"] = "chatwoot.waha | message.reaction";
    QueueName["WAHA_MESSAGE_EDITED"] = "chatwoot.waha | message.edited";
    QueueName["WAHA_MESSAGE_REVOKED"] = "chatwoot.waha | message.revoked";
    QueueName["WAHA_MESSAGE_ACK"] = "chatwoot.waha | message.ack";
    QueueName["WAHA_CALL_RECEIVED"] = "chatwoot.waha | call.received";
    QueueName["WAHA_CALL_ACCEPTED"] = "chatwoot.waha | call.accepted";
    QueueName["WAHA_CALL_REJECTED"] = "chatwoot.waha | call.rejected";
    QueueName["INBOX_MESSAGE_CREATED"] = "chatwoot.inbox | message_created";
    QueueName["INBOX_MESSAGE_UPDATED"] = "chatwoot.inbox | message_updated";
    QueueName["INBOX_CONVERSATION_CREATED"] = "chatwoot.inbox | conversation_created";
    QueueName["INBOX_CONVERSATION_STATUS_CHANGED"] = "chatwoot.inbox | conversation_status_changed";
    QueueName["INBOX_MESSAGE_DELETED"] = "chatwoot.inbox | message_deleted";
    QueueName["INBOX_COMMANDS"] = "chatwoot.inbox | commands";
})(QueueName || (exports.QueueName = QueueName = {}));
var FlowProducerName;
(function (FlowProducerName) {
    FlowProducerName["MESSAGES_PULL_FLOW"] = "messages.pull.flow";
})(FlowProducerName || (exports.FlowProducerName = FlowProducerName = {}));
//# sourceMappingURL=QueueName.js.map