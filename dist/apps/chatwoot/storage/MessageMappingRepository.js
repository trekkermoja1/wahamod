"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMappingRepository = void 0;
class MessageMappingRepository {
    constructor(knex, appPk) {
        this.knex = knex;
        this.appPk = appPk;
    }
    get tableName() {
        return MessageMappingRepository.tableName;
    }
    upsertMapping(chatwoot, whatsapp, part) {
        return this.knex.transaction((trx) => this.upsertMappingWithTrx(trx, chatwoot, whatsapp, part));
    }
    async upsertMappingWithTrx(trx, chatwoot, whatsapp, part) {
        const [id] = await trx(this.tableName)
            .insert({
            app_pk: this.appPk,
            chatwoot_message_id: chatwoot.id,
            whatsapp_message_id: whatsapp.id,
            part,
        })
            .onConflict([
            'app_pk',
            'chatwoot_message_id',
            'whatsapp_message_id',
            'part',
        ])
            .merge()
            .returning('id');
        return {
            id,
            chatwoot_message_id: chatwoot.id,
            whatsapp_message_id: whatsapp.id,
            part: part,
        };
    }
    async getByWhatsAppMessageId(id) {
        return this.knex(this.tableName)
            .where({
            app_pk: this.appPk,
            whatsapp_message_id: id,
        })
            .orderBy('id', 'desc')
            .first();
    }
    async getByChatwootMessageId(id) {
        return this.knex(this.tableName)
            .where({
            app_pk: this.appPk,
            chatwoot_message_id: id,
        })
            .orderBy('id', 'desc')
            .first();
    }
    async getByChatwootMessageIdAndPart(id, part) {
        return this.knex(this.tableName)
            .where({
            app_pk: this.appPk,
            chatwoot_message_id: id,
            part: part,
        })
            .orderBy('id', 'desc')
            .first();
    }
}
exports.MessageMappingRepository = MessageMappingRepository;
MessageMappingRepository.tableName = 'app_chatwoot_message_mappings';
//# sourceMappingURL=MessageMappingRepository.js.map