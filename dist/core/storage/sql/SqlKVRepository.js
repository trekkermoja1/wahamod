"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlKVRepository = void 0;
const Paginator_1 = require("../../../utils/Paginator");
const lodash = require("lodash");
class SqlKVRepository {
    get schema() {
        throw new Error('Not implemented');
    }
    get metadata() {
        return new Map();
    }
    get migrations() {
        return [];
    }
    constructor(knex) {
        this.knex = knex;
        this.UPSERT_BATCH_SIZE = 100;
        this.Paginator = Paginator_1.KnexPaginator;
    }
    get columns() {
        return this.schema.columns;
    }
    get table() {
        return this.schema.name;
    }
    async init() {
        await this.applyMigrations();
        await this.validateSchema();
    }
    async applyMigrations() {
        for (const migration of this.migrations) {
            await this.knex.raw(migration);
        }
    }
    async validateSchema() {
        return;
    }
    save(entity) {
        return this.upsertOne(entity);
    }
    async upsertOne(entity) {
        await this.upsertMany([entity]);
    }
    async upsertMany(entities) {
        if (entities.length === 0) {
            return;
        }
        const batchSize = this.UPSERT_BATCH_SIZE;
        for (let i = 0; i < entities.length; i += batchSize) {
            const batch = entities.slice(i, i + batchSize);
            await this.upsertBatch(batch);
        }
    }
    async upsertBatch(entities) {
        const all = entities.map((entity) => this.dump(entity));
        const data = lodash.uniqBy(all, (d) => d.id);
        if (data.length != all.length) {
            console.warn(`WARNING - Duplicated entities for upsert batch: all=${all.length}, data=${data.length}`);
        }
        const columns = this.columns.map((c) => `"${c.fieldName}"`);
        const values = data.map((d) => Object.values(d)).flat();
        const sql = `INSERT INTO "${this.table}" (${columns.join(', ')})
                 VALUES ${data
            .map(() => `(${columns.map(() => '?').join(', ')})`)
            .join(', ')} ON CONFLICT(id) DO
    UPDATE
      SET ${columns
            .map((column) => `${column} = excluded.${column}`)
            .join(', ')}`;
        try {
            await this.raw(sql, values);
        }
        catch (err) {
            console.error(`Error upserting data: ${err}, sql: ${sql}, values: ${values}`);
            throw err;
        }
    }
    getAll(pagination) {
        let query = this.select();
        query = this.pagination(query, pagination);
        return this.all(query);
    }
    async getCount() {
        const query = this.select().count({ count: 'id' });
        const row = await query.first();
        if (!row) {
            return 0;
        }
        return parseInt(row.count, 10);
    }
    async getAllByIds(ids) {
        const entitiesMap = await this.getEntitiesByIds(ids);
        return Array.from(entitiesMap.values()).filter((entity) => entity !== null);
    }
    async getEntitiesByIds(ids) {
        if (ids.length === 0) {
            return new Map();
        }
        const rows = await this.select().whereIn('id', ids);
        const entitiesMap = new Map();
        for (const id of ids) {
            entitiesMap.set(id, null);
        }
        for (const row of rows) {
            if (row && row.id) {
                entitiesMap.set(row.id, this.parse(row));
            }
        }
        return entitiesMap;
    }
    getById(id) {
        return this.getBy({ id: id });
    }
    getAllBy(filters) {
        const query = this.select().where(filters);
        return this.all(query);
    }
    async getBy(filters) {
        const query = this.select().where(filters).limit(1);
        return this.get(query);
    }
    async deleteAll() {
        const query = this.delete();
        await this.run(query);
    }
    async deleteById(id) {
        await this.deleteBy({ id: id });
    }
    async deleteBy(filters) {
        const query = this.delete().where(filters);
        await this.run(query);
    }
    async raw(sql, bindings) {
        await this.knex.raw(sql, bindings);
    }
    async run(query) {
        await query;
    }
    async get(query) {
        const row = await query.first();
        if (!row) {
            return null;
        }
        return this.parse(row);
    }
    async all(query) {
        const rows = await query;
        return rows.map((row) => this.parse(row));
    }
    select() {
        return this.knex.select().from(this.table);
    }
    delete() {
        return this.knex.delete().from(this.table);
    }
    pagination(query, pagination) {
        const paginator = new this.Paginator(pagination, this.jsonQuery);
        return paginator.apply(query);
    }
    filterJson(field, key, value) {
        return this.jsonQuery.filter(field, key, value);
    }
    stringify(data) {
        return JSON.stringify(data);
    }
    parse(row) {
        return JSON.parse(row.data);
    }
    dump(entity) {
        var _a;
        const data = {};
        const raw = entity;
        for (const field of this.columns) {
            const fn = this.metadata.get(field.fieldName);
            if (fn) {
                data[field.fieldName] = fn(raw);
            }
            else if (field.fieldName == 'data') {
                data['data'] = this.stringify(raw);
            }
            else {
                data[field.fieldName] = (_a = raw[field.fieldName]) !== null && _a !== void 0 ? _a : null;
            }
        }
        return data;
    }
}
exports.SqlKVRepository = SqlKVRepository;
//# sourceMappingURL=SqlKVRepository.js.map