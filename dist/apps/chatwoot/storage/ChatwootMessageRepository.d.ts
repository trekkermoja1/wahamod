import { Knex } from 'knex';
import { ChatWootCombinedKey, ChatwootMessage } from './types';
export declare class ChatwootMessageRepository {
    private readonly knex;
    private readonly appPk;
    static tableName: string;
    constructor(knex: Knex, appPk: number);
    get tableName(): string;
    upsertWithTrx(trx: Knex.Transaction, message: Omit<ChatwootMessage, 'id'>): Promise<ChatwootMessage>;
    getById(id: number): Promise<ChatwootMessage | null>;
    getByCombinedKey(key: ChatWootCombinedKey): Promise<ChatwootMessage[]>;
    deleteMessagesOlderThan(trx: Knex.Transaction, date: Date): Promise<number>;
}
