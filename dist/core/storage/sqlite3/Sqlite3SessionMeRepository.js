"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3SessionMeRepository = void 0;
const Sqlite3SchemaValidation_1 = require("../../engines/noweb/store/sqlite3/Sqlite3SchemaValidation");
const schemas_1 = require("../sql/schemas");
const Sqlite3KVRepository_1 = require("./Sqlite3KVRepository");
class SessionMeInfo {
}
class Sqlite3SessionMeRepository extends Sqlite3KVRepository_1.Sqlite3KVRepository {
    get schema() {
        return schemas_1.SQLMeSchema;
    }
    get migrations() {
        return schemas_1.SQLMeMigrations;
    }
    constructor(store) {
        const knex = store.getWAHADatabase();
        super(knex);
    }
    upsertMe(sessionName, me) {
        return this.upsertOne({ id: sessionName, me: me });
    }
    async getMe(sessionName) {
        const data = await this.getById(sessionName);
        return data === null || data === void 0 ? void 0 : data.me;
    }
    removeMe(sessionName) {
        return this.deleteById(sessionName);
    }
    async validateSchema() {
        const validation = new Sqlite3SchemaValidation_1.Sqlite3SchemaValidation(this.schema, this.knex);
        await validation.validate();
    }
}
exports.Sqlite3SessionMeRepository = Sqlite3SessionMeRepository;
//# sourceMappingURL=Sqlite3SessionMeRepository.js.map