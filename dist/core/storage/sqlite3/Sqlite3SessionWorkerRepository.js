"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3SessionWorkerRepository = void 0;
const Sqlite3SchemaValidation_1 = require("../../engines/noweb/store/sqlite3/Sqlite3SchemaValidation");
const schemas_1 = require("../sql/schemas");
const Sqlite3KVRepository_1 = require("./Sqlite3KVRepository");
class Sqlite3SessionWorkerRepository extends Sqlite3KVRepository_1.Sqlite3KVRepository {
    get schema() {
        return schemas_1.SQLSessionWorkerSchema;
    }
    get migrations() {
        return schemas_1.SQLSessionWorkerMigrations;
    }
    constructor(store) {
        const knex = store.getWAHADatabase();
        super(knex);
    }
    assign(session, worker) {
        return this.upsertOne({ id: session, worker: worker });
    }
    unassign(session, worker) {
        return this.deleteBy({ id: session, worker: worker });
    }
    remove(session) {
        return this.deleteById(session);
    }
    async getSessionsByWorker(worker) {
        const data = await this.getAllBy({ worker: worker });
        return data.map((d) => d.id);
    }
    async validateSchema() {
        const validation = new Sqlite3SchemaValidation_1.Sqlite3SchemaValidation(this.schema, this.knex);
        await validation.validate();
    }
}
exports.Sqlite3SessionWorkerRepository = Sqlite3SessionWorkerRepository;
//# sourceMappingURL=Sqlite3SessionWorkerRepository.js.map