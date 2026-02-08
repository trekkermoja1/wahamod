"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootInboxNewAPI = void 0;
const axios_1 = require("axios");
class ChatWootInboxNewAPI {
    constructor(base, inboxIdentifier) {
        this.base = base;
        this.inboxIdentifier = inboxIdentifier;
    }
    async updateLastSeen(sourceId, conversationId) {
        const path = `/public/api/v1/inboxes/${this.inboxIdentifier}/contacts/${sourceId}/conversations/${conversationId}/update_last_seen`;
        const url = new URL(path, this.base).toString();
        await axios_1.default.post(url, {}, {
            headers: {
                api_access_token: this.inboxIdentifier,
                'Content-Type': 'application/json',
            },
        });
    }
}
exports.ChatWootInboxNewAPI = ChatWootInboxNewAPI;
//# sourceMappingURL=ChatWootInboxNewAPI.js.map