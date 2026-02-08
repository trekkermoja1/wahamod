import { SqlKVRepository } from '@waha/core/storage/sql/SqlKVRepository';
import { Sqlite3JsonQuery } from '@waha/core/storage/sqlite3/Sqlite3JsonQuery';
import Knex from 'knex';
export declare class Sqlite3KVRepository<Entity> extends SqlKVRepository<Entity> {
    protected knex: Knex.Knex;
    protected jsonQuery: Sqlite3JsonQuery;
    constructor(knex: Knex.Knex);
    protected upsertBatch(entities: Entity[]): Promise<void>;
}
