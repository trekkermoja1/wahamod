"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOWEBSqlite3KVRepository = void 0;
const utils_1 = require("../../utils");
const Sqlite3KVRepository_1 = require("../../../../storage/sqlite3/Sqlite3KVRepository");
const esm_1 = require("../../../../../vendor/esm");
class NOWEBSqlite3KVRepository extends Sqlite3KVRepository_1.Sqlite3KVRepository {
    stringify(data) {
        return JSON.stringify(data, esm_1.default.b.BufferJSON.replacer);
    }
    parse(row) {
        return JSON.parse(row.data, esm_1.default.b.BufferJSON.reviver);
    }
    dump(entity) {
        const raw = (0, utils_1.convertProtobufToPlainObject)(entity);
        (0, utils_1.replaceLongsWithNumber)(raw);
        return super.dump(raw);
    }
}
exports.NOWEBSqlite3KVRepository = NOWEBSqlite3KVRepository;
//# sourceMappingURL=NOWEBSqlite3KVRepository.js.map