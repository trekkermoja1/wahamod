"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatwootMessageRepository = void 0;
class ChatwootMessageRepository {
    constructor(knex, appPk) {
        this.knex = knex;
        this.appPk = appPk;
    }
    get tableName() {
        return ChatwootMessageRepository.tableName;
    }
    async upsertWithTrx(trx, message) {
        const [id] = await trx(this.tableName)
            .insert(Object.assign(Object.assign({}, message), { app_pk: this.appPk }))
            .onConflict(['app_pk', 'conversation_id', 'message_id'])
            .merge()
            .returning('id');
        return Object.assign(Object.assign({}, message), id);
    }
    async getById(id) {
        return this.knex(this.tableName)
            .where({
            app_pk: this.appPk,
            id: id,
        })
            .orderBy('id', 'desc')
            .first();
    }
    async getByCombinedKey(key) {
        return this.knex(this.tableName)
            .where({
            app_pk: this.appPk,
            conversation_id: key.conversation_id,
            message_id: key.message_id,
        })
            .select('*');
    }
    async deleteMessagesOlderThan(trx, date) {
        const result = await trx(this.tableName)
            .where('app_pk', this.appPk)
            .andWhere('timestamp', '<', date)
            .del();
        return result;
    }
}
exports.ChatwootMessageRepository = ChatwootMessageRepository;
ChatwootMessageRepository.tableName = 'app_chatwoot_chatwoot_messages';
//# sourceMappingURL=ChatwootMessageRepository.js.map