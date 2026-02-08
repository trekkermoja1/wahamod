"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3SchemaValidation = void 0;
class Sqlite3SchemaValidation {
    constructor(table, knex) {
        this.table = table;
        this.knex = knex;
    }
    async validate() {
        const table = this.table;
        const columns = await this.knex.raw(`PRAGMA table_info(${table.name})`);
        if (columns.length !== table.columns.length) {
            throw new Error(`Table '${table.name}' does not have expected number of columns. Expected ${table.columns.length}, got ${columns.length}`);
        }
        for (const column of table.columns) {
            const columnInfo = columns.find((c) => c.name === column.fieldName);
            if (!columnInfo) {
                throw new Error(`Table '${table.name}' does not have column '${column.fieldName}'`);
            }
            if (columnInfo.type !== column.type) {
                throw new Error(`Table '${table.name}' column '${column.fieldName}' has type '${columnInfo.type}' but expected '${column.type}'`);
            }
        }
        const indexes = await this.knex.raw(`PRAGMA index_list(${table.name})`);
        const indexNames = indexes.map((index) => index.name);
        for (const index of table.indexes) {
            if (!indexNames.includes(index.name)) {
                throw new Error(`Table '${table.name}' does not have index '${index.name}'`);
            }
        }
    }
}
exports.Sqlite3SchemaValidation = Sqlite3SchemaValidation;
//# sourceMappingURL=Sqlite3SchemaValidation.js.map