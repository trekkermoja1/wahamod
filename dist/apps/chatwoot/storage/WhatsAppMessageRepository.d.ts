import { Knex } from 'knex';
import { WhatsAppMessage } from './types';
export declare class WhatsAppMessageRepository {
    private readonly knex;
    private readonly appPk;
    static tableName: string;
    constructor(knex: Knex, appPk: number);
    get tableName(): string;
    upsertWithTrx(trx: Knex.Transaction, message: Omit<WhatsAppMessage, 'id'>): Promise<WhatsAppMessage>;
    getById(id: number): Promise<WhatsAppMessage | null>;
    getByMessageId(messageId: string): Promise<WhatsAppMessage | null>;
    deleteMessagesOlderThan(trx: Knex.Transaction, date: Date): Promise<number>;
}
