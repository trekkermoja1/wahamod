"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMediaStorage = void 0;
exports.getMetadata = getMetadata;
class IMediaStorage {
}
exports.IMediaStorage = IMediaStorage;
function getMetadata(data) {
    const now = new Date();
    return {
        'waha-session': data.session,
        'waha-chat-id': data.message.chatId,
        'waha-message-id': data.message.id,
        'waha-media-filename': data.file.filename,
        'waha-created-at': now.getTime(),
    };
}
//# sourceMappingURL=IMediaStorage.js.map