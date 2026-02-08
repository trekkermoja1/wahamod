"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const types_1 = require("./types");
class Conversation {
    constructor(accountAPI, accountId, conversationId, sourceId = null) {
        this.accountAPI = accountAPI;
        this.accountId = accountId;
        this.conversationId = conversationId;
        this.sourceId = sourceId;
        this.overrideIncoming = null;
    }
    async send(data) {
        if (data.message_type === types_1.MessageType.INCOMING && this.overrideIncoming) {
            data = Object.assign(Object.assign({}, data), this.overrideIncoming);
        }
        try {
            const message = await this.accountAPI.messages.create({
                accountId: this.accountId,
                conversationId: this.conversationId,
                data: data,
            });
            return message;
        }
        catch (err) {
            if (this.onError) {
                this.onError(err);
            }
            throw err;
        }
    }
    async incoming(text) {
        let data = {
            content: text,
            message_type: types_1.MessageType.INCOMING,
        };
        if (this.overrideIncoming) {
            data = Object.assign(Object.assign({}, data), this.overrideIncoming);
        }
        return this.send(data);
    }
    async activity(text) {
        const data = {
            content: text,
            message_type: types_1.MessageType.ACTIVITY,
        };
        return this.send(data);
    }
    async note(text) {
        const data = {
            content: text,
            private: true,
            message_type: types_1.MessageType.OUTGOING,
        };
        return this.send(data);
    }
    forceNote() {
        this.overrideIncoming = {
            private: true,
            message_type: types_1.MessageType.OUTGOING,
        };
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map