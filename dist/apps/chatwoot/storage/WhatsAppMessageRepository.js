"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMessageRepository = void 0;
class WhatsAppMessageRepository {
    constructor(knex, appPk) {
        this.knex = knex;
        this.appPk = appPk;
    }
    get tableName() {
        return WhatsAppMessageRepository.tableName;
    }
    async upsertWithTrx(trx, message) {
        const [id] = await trx(this.tableName)
            .insert(Object.assign(Object.assign({}, message), { app_pk: this.appPk }))
            .onConflict(['app_pk', 'chat_id', 'message_id'])
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
    async getByMessageId(messageId) {
        return this.knex(this.tableName)
            .where({
            app_pk: this.appPk,
            message_id: messageId,
        })
            .orderBy('id', 'desc')
            .first();
    }
    async deleteMessagesOlderThan(trx, date) {
        const result = await trx(this.tableName)
            .where('app_pk', this.appPk)
            .andWhere('timestamp', '<', date)
            .del();
        return result;
    }
}
exports.WhatsAppMessageRepository = WhatsAppMessageRepository;
WhatsAppMessageRepository.tableName = 'app_chatwoot_whatsapp_messages';
//# sourceMappingURL=WhatsAppMessageRepository.js.map