"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSelector = exports.ConversationSort = void 0;
const lodash = require("lodash");
var ConversationSort;
(function (ConversationSort) {
    ConversationSort["activity_newest"] = "activity_newest";
    ConversationSort["created_newest"] = "created_newest";
    ConversationSort["created_oldest"] = "created_oldest";
    ConversationSort["activity_oldest"] = "activity_oldest";
})(ConversationSort || (exports.ConversationSort = ConversationSort = {}));
class ConversationSelector {
    constructor(config) {
        this.config = config;
    }
    hasStatusFilter() {
        return this.config.status;
    }
    select(conversations) {
        conversations = this.filter(conversations);
        conversations = this.sort(conversations);
        return conversations[0] || null;
    }
    filter(conversations) {
        conversations = lodash.filter(conversations, {
            inbox_id: this.config.inboxId,
        });
        if (this.config.status && this.config.status.length > 0) {
            conversations = lodash.filter(conversations, (conversation) => {
                return this.config.status.includes(conversation.status);
            });
        }
        return conversations;
    }
    sort(conversations) {
        let field = null;
        let dir = null;
        switch (this.config.sort) {
            case ConversationSort.activity_newest:
                [field, dir] = ['last_activity_at', 'desc'];
                break;
            case ConversationSort.created_newest:
                [field, dir] = ['created_at', 'desc'];
                break;
            case ConversationSort.created_oldest:
                [field, dir] = ['created_at', 'asc'];
                break;
            case ConversationSort.activity_oldest:
                [field, dir] = ['last_activity_at', 'asc'];
        }
        if (!field || !dir) {
            return conversations;
        }
        return lodash.orderBy(conversations, [field], [dir]);
    }
}
exports.ConversationSelector = ConversationSelector;
//# sourceMappingURL=ConversationSelector.js.map