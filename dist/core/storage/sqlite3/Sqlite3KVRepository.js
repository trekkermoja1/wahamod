"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3KVRepository = void 0;
const SqlKVRepository_1 = require("../sql/SqlKVRepository");
const Sqlite3JsonQuery_1 = require("./Sqlite3JsonQuery");
const promiseTimeout_1 = require("../../../utils/promiseTimeout");
class Sqlite3KVRepository extends SqlKVRepository_1.SqlKVRepository {
    constructor(knex) {
        super(knex);
        this.jsonQuery = new Sqlite3JsonQuery_1.Sqlite3JsonQuery();
    }
    async upsertBatch(entities) {
        await super.upsertBatch(entities);
        if (entities.length >= this.UPSERT_BATCH_SIZE) {
            await (0, promiseTimeout_1.sleep)(1);
        }
    }
}
exports.Sqlite3KVRepository = Sqlite3KVRepository;
//# sourceMappingURL=Sqlite3KVRepository.js.map