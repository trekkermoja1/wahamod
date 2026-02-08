"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3LabelsRepository = void 0;
const schemas_1 = require("../schemas");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class Sqlite3LabelsRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    get schema() {
        return schemas_1.NowebLabelsSchema;
    }
}
exports.Sqlite3LabelsRepository = Sqlite3LabelsRepository;
//# sourceMappingURL=Sqlite3LabelsRepository.js.map