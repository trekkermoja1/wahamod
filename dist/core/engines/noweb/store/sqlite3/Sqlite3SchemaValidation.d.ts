import { Schema } from '@waha/core/storage/Schema';
import Knex from 'knex';
export declare class Sqlite3SchemaValidation {
    private table;
    private knex;
    constructor(table: Schema, knex: Knex.Knex);
    validate(): Promise<void>;
}
