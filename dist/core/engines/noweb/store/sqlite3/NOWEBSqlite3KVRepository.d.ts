import { Sqlite3KVRepository } from '@waha/core/storage/sqlite3/Sqlite3KVRepository';
export declare class NOWEBSqlite3KVRepository<Entity> extends Sqlite3KVRepository<Entity> {
    protected stringify(data: any): string;
    protected parse(row: any): any;
    protected dump(entity: Entity): {};
}
