"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessageIdSerialized = parseMessageIdSerialized;
exports.SerializeMessageKey = SerializeMessageKey;
const jids_1 = require("./jids");
function parseMessageIdSerialized(messageId, soft = false) {
    if (!messageId.includes('_') && soft) {
        return { id: messageId };
    }
    const parts = messageId.split('_');
    if (parts.length != 3 && parts.length != 4) {
        throw new Error('Message id be in format false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA[_participant]');
    }
    const fromMe = parts[0] == 'true';
    const chatId = parts[1];
    const remoteJid = (0, jids_1.toJID)(chatId);
    const id = parts[2];
    const participant = parts[3] ? (0, jids_1.toJID)(parts[3]) : undefined;
    return {
        fromMe: fromMe,
        id: id,
        remoteJid: remoteJid,
        participant: participant,
    };
}
function SerializeMessageKey(key) {
    const { fromMe, id, remoteJid, participant } = key;
    const participantStr = participant ? `_${participant}` : '';
    return `${fromMe ? 'true' : 'false'}_${remoteJid}_${id}${participantStr}`;
}
//# sourceMappingURL=ids.js.map