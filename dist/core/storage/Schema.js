"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.Index = exports.Field = void 0;
class Field {
    constructor(fieldName, type) {
        this.fieldName = fieldName;
        this.type = type;
    }
}
exports.Field = Field;
class Index {
    constructor(name, columns) {
        this.name = name;
        this.columns = columns;
    }
}
exports.Index = Index;
class Schema {
    constructor(name, columns, indexes) {
        this.name = name;
        this.columns = columns;
        this.indexes = indexes;
    }
}
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map