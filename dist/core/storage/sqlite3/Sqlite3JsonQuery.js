"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite3JsonQuery = void 0;
class Sqlite3JsonQuery {
    filter(field, key, value) {
        const jsonPath = `$.${key}`;
        return [`${field}->'${jsonPath}' = ?`, `${value}`];
    }
    sortBy(field, sortBy, direction) {
        const jsonPath = `$.${sortBy}`;
        return `${field}->'${jsonPath}' ${direction}`;
    }
}
exports.Sqlite3JsonQuery = Sqlite3JsonQuery;
//# sourceMappingURL=Sqlite3JsonQuery.js.map