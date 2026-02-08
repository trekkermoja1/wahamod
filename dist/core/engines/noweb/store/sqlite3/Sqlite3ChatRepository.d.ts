import type { Chat } from '@adiwajshing/baileys';
import { SqlChatMethods } from '@waha/core/engines/noweb/store/sql/SqlChatMethods';
import { OverviewFilter } from '@waha/structures/chats.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';
import { KnexPaginator } from '@waha/utils/Paginator';
import { IChatRepository } from '../IChatRepository';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';
declare class ChatPaginator extends KnexPaginator {
    indexes: string[];
}
export declare class Sqlite3ChatRepository extends NOWEBSqlite3KVRepository<Chat> implements IChatRepository {
    protected Paginator: typeof ChatPaginator;
    get schema(): import("../../../../storage/Schema").Schema;
    get methods(): SqlChatMethods;
    getAllWithMessages(pagination: PaginationParams, broadcast: boolean, filter?: OverviewFilter): Promise<Chat[]>;
}
export {};
