import { ILabelAssociationRepository } from '@waha/core/engines/noweb/store/ILabelAssociationsRepository';
import { ILabelsRepository } from '@waha/core/engines/noweb/store/ILabelsRepository';
import { INowebLidPNRepository } from '@waha/core/engines/noweb/store/INowebLidPNRepository';
import { Sqlite3GroupRepository } from '@waha/core/engines/noweb/store/sqlite3/Sqlite3GroupRepository';
import { INowebStorage } from '../INowebStorage';
import { Sqlite3ChatRepository } from './Sqlite3ChatRepository';
import { Sqlite3ContactRepository } from './Sqlite3ContactRepository';
import { Sqlite3MessagesRepository } from './Sqlite3MessagesRepository';
export declare class Sqlite3Storage extends INowebStorage {
    private readonly tables;
    private readonly knex;
    constructor(filePath: string);
    init(): Promise<void>;
    private migrate;
    private validateSchema;
    private migration0001init;
    close(): Promise<void>;
    getContactsRepository(): Sqlite3ContactRepository;
    getChatRepository(): Sqlite3ChatRepository;
    getGroupRepository(): Sqlite3GroupRepository;
    getLabelsRepository(): ILabelsRepository;
    getLabelAssociationRepository(): ILabelAssociationRepository;
    getMessagesRepository(): Sqlite3MessagesRepository;
    getLidPNRepository(): INowebLidPNRepository;
}
