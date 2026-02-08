import type { Chat } from '@adiwajshing/baileys';
import { SqlKVRepository } from '@waha/core/storage/sql/SqlKVRepository';
import { OverviewFilter } from '@waha/structures/chats.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';
export declare class SqlChatMethods {
    private repository;
    constructor(repository: SqlKVRepository<any>);
    getAllWithMessages(pagination: PaginationParams, broadcast: boolean, filter?: OverviewFilter): Promise<Chat[]>;
}
