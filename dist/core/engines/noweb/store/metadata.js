"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowebLabelAssociationsMetadata = exports.NowebMessagesMetadata = void 0;
exports.NowebMessagesMetadata = new Map()
    .set('jid', (msg) => msg.key.remoteJid)
    .set('id', (msg) => msg.key.id)
    .set('messageTimestamp', (msg) => msg.messageTimestamp);
exports.NowebLabelAssociationsMetadata = new Map().set('id', (a) => `${a.type}_${a.labelId}_${a.chatId}_${a.messageId}`);
//# sourceMappingURL=metadata.js.map