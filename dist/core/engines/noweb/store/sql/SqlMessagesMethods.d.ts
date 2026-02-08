import { SqlKVRepository } from '@waha/core/storage/sql/SqlKVRepository';
import { GetChatMessagesFilter } from '@waha/structures/chats.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';
export declare class SqlMessagesMethods {
    private repository;
    constructor(repository: SqlKVRepository<any>);
    upsert(messages: any[]): Promise<void>;
    getAllByJid(jid: string, filter: GetChatMessagesFilter, pagination: PaginationParams): Promise<any[]>;
    getByJidById(jid: string, id: string): Promise<any>;
    updateByJidAndId(jid: string, id: string, update: any): Promise<boolean>;
    deleteByJidByIds(jid: string, ids: string[]): Promise<void>;
    deleteAllByJid(jid: string): Promise<void>;
}
