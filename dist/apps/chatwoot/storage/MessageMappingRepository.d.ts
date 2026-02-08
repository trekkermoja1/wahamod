import { Knex } from 'knex';
import { ChatwootMessage, MessageMapping, WhatsAppMessage } from './types';
export declare class MessageMappingRepository {
    private readonly knex;
    private readonly appPk;
    static tableName: string;
    constructor(knex: Knex, appPk: number);
    get tableName(): string;
    upsertMapping(chatwoot: Pick<ChatwootMessage, 'id'>, whatsapp: Pick<WhatsAppMessage, 'id'>, part: number): Promise<MessageMapping>;
    upsertMappingWithTrx(trx: Knex.Transaction, chatwoot: Pick<ChatwootMessage, 'id'>, whatsapp: Pick<WhatsAppMessage, 'id'>, part: number): Promise<MessageMapping>;
    getByWhatsAppMessageId(id: number): Promise<MessageMapping | null>;
    getByChatwootMessageId(id: number): Promise<MessageMapping | null>;
    getByChatwootMessageIdAndPart(id: number, part: number): Promise<MessageMapping | null>;
}
