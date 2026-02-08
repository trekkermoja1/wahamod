"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlChatMethods = void 0;
class SqlChatMethods {
    constructor(repository) {
        this.repository = repository;
    }
    async getAllWithMessages(pagination, broadcast, filter) {
        let query = this.repository.select().whereNotNull('conversationTimestamp');
        if (!broadcast) {
            query = query
                .andWhereNot('id', 'like', '%@broadcast')
                .andWhereNot('id', 'like', '%@newsletter');
        }
        if ((filter === null || filter === void 0 ? void 0 : filter.ids) && filter.ids.length > 0) {
            query = query.whereIn('id', filter.ids);
        }
        query = this.repository.pagination(query, pagination);
        return await this.repository.all(query);
    }
}
exports.SqlChatMethods = SqlChatMethods;
//# sourceMappingURL=SqlChatMethods.js.map