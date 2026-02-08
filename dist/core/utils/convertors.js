"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractMessageKeysForRead = ExtractMessageKeysForRead;
exports.MessagesForRead = MessagesForRead;
const ids_1 = require("./ids");
const jids_1 = require("./jids");
const enums_dto_1 = require("../../structures/enums.dto");
function ExtractMessageKeysForRead(request) {
    const jid = (0, jids_1.toJID)(request.chatId);
    const defaults = {
        remoteJid: jid,
        participant: request.participant,
    };
    const ids = request.messageIds || [];
    if (request.messageId) {
        ids.push(request.messageId);
    }
    const keys = [];
    for (const messageId of ids) {
        const parsed = (0, ids_1.parseMessageIdSerialized)(messageId, false);
        if (parsed.fromMe) {
            continue;
        }
        const key = {
            id: parsed.id,
            remoteJid: parsed.remoteJid
                ? (0, jids_1.toJID)(parsed.remoteJid)
                : defaults.remoteJid,
            participant: parsed.participant
                ? (0, jids_1.toJID)(parsed.participant)
                : defaults.participant,
        };
        keys.push(key);
    }
    return keys;
}
function daysToMs(days) {
    return days * 24 * 60 * 60 * 1000;
}
function MessagesForRead(chatId, request) {
    const limit = request.messages || (0, jids_1.isJidGroup)(chatId) ? 100 : 30;
    const query = {
        offset: 0,
        limit: limit,
        downloadMedia: false,
    };
    const afterMs = Date.now() - daysToMs(request.days);
    const after = Math.floor(afterMs / 1000);
    const filter = {
        'filter.ack': enums_dto_1.WAMessageAck.DEVICE,
        'filter.fromMe': false,
        'filter.timestamp.gte': after,
    };
    return {
        query: query,
        filter: filter,
    };
}
//# sourceMappingURL=convertors.js.map