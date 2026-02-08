"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlMessagesMethods = void 0;
const session_noweb_core_1 = require("../../session.noweb.core");
const acks_1 = require("../../../../utils/acks");
class SqlMessagesMethods {
    constructor(repository) {
        this.repository = repository;
    }
    upsert(messages) {
        return this.repository.upsertMany(messages);
    }
    async getAllByJid(jid, filter, pagination) {
        let query = this.repository.select();
        if (jid !== session_noweb_core_1.ALL_JID) {
            query = this.repository.select().where({ jid: jid });
        }
        if (filter['filter.timestamp.lte'] != null) {
            query = query.where('messageTimestamp', '<=', filter['filter.timestamp.lte']);
        }
        if (filter['filter.timestamp.gte'] != null) {
            query = query.where('messageTimestamp', '>=', filter['filter.timestamp.gte']);
        }
        if (filter['filter.fromMe'] != null) {
            const [sql, value] = this.repository.filterJson('data', 'key.fromMe', filter['filter.fromMe']);
            query = query.whereRaw(sql, [value]);
        }
        if (filter['filter.ack'] != null) {
            const status = (0, acks_1.AckToStatus)(filter['filter.ack']);
            const [sql, value] = this.repository.filterJson('data', 'status', status);
            query = query.whereRaw(sql, [value]);
        }
        query = this.repository.pagination(query, pagination);
        return this.repository.all(query);
    }
    async getByJidById(jid, id) {
        if (jid === session_noweb_core_1.ALL_JID) {
            return this.repository.getBy({ id: id });
        }
        return this.repository.getBy({ jid: jid, id: id });
    }
    async updateByJidAndId(jid, id, update) {
        const entity = await this.getByJidById(jid, id);
        if (!entity) {
            return false;
        }
        Object.assign(entity, update);
        await this.repository.upsertOne(entity);
    }
    async deleteByJidByIds(jid, ids) {
        const query = `DELETE
                   FROM "${this.repository.table}"
                   WHERE jid = ?
                     AND id IN (${ids.map(() => '?').join(', ')})`;
        await this.repository.raw(query, [jid, ...ids]);
    }
    deleteAllByJid(jid) {
        return this.repository.deleteBy({ jid: jid });
    }
}
exports.SqlMessagesMethods = SqlMessagesMethods;
//# sourceMappingURL=SqlMessagesMethods.js.map