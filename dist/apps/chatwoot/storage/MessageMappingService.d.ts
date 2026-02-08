import { Knex } from 'knex';
import { ChatwootMessageRepository } from './ChatwootMessageRepository';
import { MessageMappingRepository } from './MessageMappingRepository';
import { ChatWootCombinedKey, ChatwootMessage, MessageMapping, WhatsAppMessage } from './types';
import { WhatsAppMessageRepository } from './WhatsAppMessageRepository';
export declare class MessageMappingService {
    private readonly knex;
    private whatsAppMessageRepository;
    private chatwootMessageRepository;
    private messageMappingRepository;
    constructor(knex: Knex, whatsAppMessageRepository: WhatsAppMessageRepository, chatwootMessageRepository: ChatwootMessageRepository, messageMappingRepository: MessageMappingRepository);
    cleanup(removeAfter: Date): Promise<number>;
    map(chatwoot: ChatwootMessage, whatsapp: WhatsAppMessage, part?: number): Promise<MessageMapping>;
    getChatWootMessage(whatsapp: Pick<WhatsAppMessage, 'chat_id' | 'message_id'>): Promise<ChatwootMessage | null>;
    getWhatsAppMessage(chatwoot: ChatWootCombinedKey): Promise<WhatsAppMessage[]>;
    getMappingByChatwootCombinedKeyAndPart(chatwoot: ChatWootCombinedKey, part: number): Promise<MessageMapping | null>;
}
