import type { Label } from '@adiwajshing/baileys/lib/Types/Label';
import { ILabelsRepository } from '@waha/core/engines/noweb/store/ILabelsRepository';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';
export declare class Sqlite3LabelsRepository extends NOWEBSqlite3KVRepository<Label> implements ILabelsRepository {
    get schema(): import("../../../../storage/Schema").Schema;
}
