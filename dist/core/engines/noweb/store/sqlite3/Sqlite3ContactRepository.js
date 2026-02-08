"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3ContactRepository = void 0;
const schemas_1 = require("../schemas");
const Paginator_1 = require("../../../../../utils/Paginator");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class ContactPaginator extends Paginator_1.KnexPaginator {
    constructor() {
        super(...arguments);
        this.indexes = ['id'];
    }
}
class Sqlite3ContactRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    constructor() {
        super(...arguments);
        this.Paginator = ContactPaginator;
    }
    get schema() {
        return schemas_1.NowebContactSchema;
    }
}
exports.Sqlite3ContactRepository = Sqlite3ContactRepository;
//# sourceMappingURL=Sqlite3ContactRepository.js.map