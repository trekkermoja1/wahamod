"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3GroupRepository = void 0;
const schemas_1 = require("../schemas");
const Paginator_1 = require("../../../../../utils/Paginator");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class Paginator extends Paginator_1.KnexPaginator {
    constructor() {
        super(...arguments);
        this.indexes = ['id'];
    }
}
class Sqlite3GroupRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    constructor() {
        super(...arguments);
        this.Paginator = Paginator;
    }
    get schema() {
        return schemas_1.NowebGroupsSchema;
    }
}
exports.Sqlite3GroupRepository = Sqlite3GroupRepository;
//# sourceMappingURL=Sqlite3GroupRepository.js.map