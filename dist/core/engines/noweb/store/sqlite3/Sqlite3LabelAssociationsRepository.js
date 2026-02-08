"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3LabelAssociationsRepository = void 0;
const metadata_1 = require("../metadata");
const schemas_1 = require("../schemas");
const SqlLabelAssociationsMethods_1 = require("../sql/SqlLabelAssociationsMethods");
const NOWEBSqlite3KVRepository_1 = require("./NOWEBSqlite3KVRepository");
class Sqlite3LabelAssociationsRepository extends NOWEBSqlite3KVRepository_1.NOWEBSqlite3KVRepository {
    get schema() {
        return schemas_1.NowebLabelAssociationsSchema;
    }
    get metadata() {
        return metadata_1.NowebLabelAssociationsMetadata;
    }
    get methods() {
        return new SqlLabelAssociationsMethods_1.SqlLabelAssociationsMethods(this);
    }
    async deleteOne(association) {
        return this.methods.deleteOne(association);
    }
    async deleteByLabelId(labelId) {
        return this.methods.deleteByLabelId(labelId);
    }
    getAssociationsByLabelId(labelId, type) {
        return this.methods.getAssociationsByLabelId(labelId, type);
    }
    getAssociationsByChatId(chatId) {
        return this.methods.getAssociationsByChatId(chatId);
    }
}
exports.Sqlite3LabelAssociationsRepository = Sqlite3LabelAssociationsRepository;
//# sourceMappingURL=Sqlite3LabelAssociationsRepository.js.map