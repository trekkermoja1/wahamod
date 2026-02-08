"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3MessagesRepository = void 0;
const metadata_1 = require("../metadata");
const schemas_1 = require("../schemas");
const SqlMessagesMethods_1 = require("../sql/SqlMessagesMethods");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class Sqlite3MessagesRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    get schema() {
        return schemas_1.NowebMessagesSchema;
    }
    get methods() {
        return new SqlMessagesMethods_1.SqlMessagesMethods(this);
    }
    get metadata() {
        return metadata_1.NowebMessagesMetadata;
    }
    upsert(messages) {
        return this.methods.upsert(messages);
    }
    async getAllByJid(jid, filter, pagination) {
        return this.methods.getAllByJid(jid, filter, pagination);
    }
    async getByJidById(jid, id) {
        return this.methods.getByJidById(jid, id);
    }
    async updateByJidAndId(jid, id, update) {
        return this.methods.updateByJidAndId(jid, id, update);
    }
    async deleteByJidByIds(jid, ids) {
        return this.methods.deleteByJidByIds(jid, ids);
    }
    deleteAllByJid(jid) {
        return this.methods.deleteAllByJid(jid);
    }
}
exports.Sqlite3MessagesRepository = Sqlite3MessagesRepository;
//# sourceMappingURL=Sqlite3MessagesRepository.js.map