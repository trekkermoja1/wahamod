"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoPaginator = exports.KnexPaginator = exports.PaginatorInMemory = exports.Paginator = void 0;
const pagination_dto_1 = require("../structures/pagination.dto");
const lodash = require("lodash");
class Paginator {
    constructor(pagination) {
        this.pagination = pagination;
    }
    apply(data) {
        if (lodash.isEmpty(this.pagination)) {
            return data;
        }
        return this.limit(this.sort(data));
    }
}
exports.Paginator = Paginator;
class PaginatorInMemory extends Paginator {
    sort(data) {
        var _a;
        if (!((_a = this.pagination) === null || _a === void 0 ? void 0 : _a.sortBy)) {
            return data;
        }
        return lodash.orderBy(data, [this.NullLast(this.pagination.sortBy)], [this.pagination.sortOrder || 'asc']);
    }
    limit(data) {
        var _a;
        if (!((_a = this.pagination) === null || _a === void 0 ? void 0 : _a.limit)) {
            return data;
        }
        const offset = this.pagination.offset || 0;
        const limit = this.pagination.limit || Infinity;
        return data.slice(offset, offset + limit);
    }
    NullLast(field) {
        return (item) => {
            const value = item === null || item === void 0 ? void 0 : item[field];
            if (value == null) {
                return -Infinity;
            }
            return value;
        };
    }
}
exports.PaginatorInMemory = PaginatorInMemory;
class KnexPaginator extends Paginator {
    constructor(pagination, jsonQuery) {
        super(pagination);
        this.jsonQuery = jsonQuery;
        this.indexes = [];
        this.dataField = 'data';
    }
    sort(query) {
        var _a;
        if (!((_a = this.pagination) === null || _a === void 0 ? void 0 : _a.sortBy)) {
            return query;
        }
        const sortBy = this.pagination.sortBy;
        const direction = this.pagination.sortOrder || pagination_dto_1.SortOrder.ASC;
        if (this.indexes.includes(sortBy)) {
            return query.orderBy(sortBy, direction);
        }
        const sql = this.jsonQuery.sortBy(this.dataField, sortBy, direction);
        return query.orderByRaw(sql);
    }
    limit(query) {
        const limit = this.pagination.limit;
        const offset = this.pagination.offset;
        if (limit != null) {
            query = query.limit(limit);
        }
        if (offset != null) {
            query = query.offset(offset);
        }
        return query;
    }
}
exports.KnexPaginator = KnexPaginator;
class MongoPaginator extends Paginator {
    sort(query) {
        var _a;
        if (!((_a = this.pagination) === null || _a === void 0 ? void 0 : _a.sortBy)) {
            return query;
        }
        const mongoDirection = this.pagination.sortOrder === 'asc' ? 1 : -1;
        return query.sort({ [this.pagination.sortBy]: mongoDirection });
    }
    limit(query) {
        const limit = this.pagination.limit;
        const offset = this.pagination.offset;
        if (limit != null) {
            query = query.limit(limit);
        }
        if (offset != null) {
            query = query.skip(offset);
        }
        return query;
    }
}
exports.MongoPaginator = MongoPaginator;
//# sourceMappingURL=Paginator.js.map