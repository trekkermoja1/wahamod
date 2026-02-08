import { LimitOffsetParams } from '@waha/structures/pagination.dto';
import { KnexPaginator } from '@waha/utils/Paginator';
import { INowebLidPNRepository, LidToPN } from '../INowebLidPNRepository';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';
export declare class LidPaginator extends KnexPaginator {
    indexes: string[];
}
export declare class Sqlite3LidPNRepository extends NOWEBSqlite3KVRepository<LidToPN> implements INowebLidPNRepository {
    get schema(): import("../../../../storage/Schema").Schema;
    saveLids(lids: LidToPN[]): Promise<void>;
    getAllLids(pagination?: LimitOffsetParams): Promise<LidToPN[]>;
    getLidsCount(): Promise<number>;
    findLidByPN(pn: string): Promise<string | null>;
    findPNByLid(lid: string): Promise<string | null>;
}
