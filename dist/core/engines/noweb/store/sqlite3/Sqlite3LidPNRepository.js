"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3LidPNRepository = exports.LidPaginator = void 0;
const schemas_1 = require("../schemas");
const Paginator_1 = require("../../../../../utils/Paginator");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class LidPaginator extends Paginator_1.KnexPaginator {
    constructor() {
        super(...arguments);
        this.indexes = ['id', 'pn'];
    }
}
exports.LidPaginator = LidPaginator;
class Sqlite3LidPNRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    get schema() {
        return schemas_1.NowebLidMapSchema;
    }
    saveLids(lids) {
        return this.upsertMany(lids);
    }
    getAllLids(pagination) {
        return this.getAll(pagination);
    }
    getLidsCount() {
        return this.getCount();
    }
    async findLidByPN(pn) {
        const value = await this.getBy({ pn: pn });
        return (value === null || value === void 0 ? void 0 : value.id) || null;
    }
    async findPNByLid(lid) {
        const value = await this.getBy({ id: lid });
        return (value === null || value === void 0 ? void 0 : value.pn) || null;
    }
}
exports.Sqlite3LidPNRepository = Sqlite3LidPNRepository;
//# sourceMappingURL=Sqlite3LidPNRepository.js.map