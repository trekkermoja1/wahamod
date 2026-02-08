"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3ChatRepository = void 0;
const schemas_1 = require("../schemas");
const SqlChatMethods_1 = require("../sql/SqlChatMethods");
const Paginator_1 = require("../../../../../utils/Paginator");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class ChatPaginator extends Paginator_1.KnexPaginator {
    constructor() {
        super(...arguments);
        this.indexes = ['id', 'conversationTimestamp'];
    }
}
class Sqlite3ChatRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    constructor() {
        super(...arguments);
        this.Paginator = ChatPaginator;
    }
    get schema() {
        return schemas_1.NowebChatSchema;
    }
    get methods() {
        return new SqlChatMethods_1.SqlChatMethods(this);
    }
    getAllWithMessages(pagination, broadcast, filter) {
        return this.methods.getAllWithMessages(pagination, broadcast, filter);
    }
}
exports.Sqlite3ChatRepository = Sqlite3ChatRepository;
//# sourceMappingURL=Sqlite3ChatRepository.js.map