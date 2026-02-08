"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistinctAck = DistinctAck;
exports.DistinctMessages = DistinctMessages;
const ids_1 = require("./ids");
const rxjs_1 = require("rxjs");
function DistinctAck(flushEvery = 60000) {
    return (0, rxjs_1.distinct)((msg) => `${msg.id}-${msg.ack}-${msg.participant}`, (0, rxjs_1.interval)(flushEvery));
}
function extractUniqueMessageId(messageId) {
    const key = (0, ids_1.parseMessageIdSerialized)(messageId, true);
    return key.id;
}
function DistinctMessages(flushEvery = 60000) {
    return (0, rxjs_1.distinct)((msg) => {
        const uniqueId = extractUniqueMessageId(msg.id);
        return `${msg.fromMe}_${uniqueId}`;
    }, (0, rxjs_1.interval)(flushEvery));
}
//# sourceMappingURL=reactive.js.map