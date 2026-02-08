import { SqlMessagesMethods } from '@waha/core/engines/noweb/store/sql/SqlMessagesMethods';
import { GetChatMessagesFilter } from '@waha/structures/chats.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';
import { IMessagesRepository } from '../IMessagesRepository';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';
export declare class Sqlite3MessagesRepository extends NOWEBSqlite3KVRepository<any> implements IMessagesRepository {
    get schema(): import("../../../../storage/Schema").Schema;
    get methods(): SqlMessagesMethods;
    get metadata(): Map<any, any>;
    upsert(messages: any[]): Promise<void>;
    getAllByJid(jid: string, filter: GetChatMessagesFilter, pagination: PaginationParams): Promise<any[]>;
    getByJidById(jid: string, id: string): Promise<any>;
    updateByJidAndId(jid: string, id: string, update: any): Promise<boolean>;
    deleteByJidByIds(jid: string, ids: string[]): Promise<void>;
    deleteAllByJid(jid: string): Promise<void>;
}
