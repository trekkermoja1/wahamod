import type { Contact } from '@adiwajshing/baileys';
import { KnexPaginator } from '@waha/utils/Paginator';
import { IContactRepository } from '../IContactRepository';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';
declare class ContactPaginator extends KnexPaginator {
    indexes: string[];
}
export declare class Sqlite3ContactRepository extends NOWEBSqlite3KVRepository<Contact> implements IContactRepository {
    protected Paginator: typeof ContactPaginator;
    get schema(): import("../../../../storage/Schema").Schema;
}
export {};
