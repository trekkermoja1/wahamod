import type { LabelAssociation, LabelAssociationType } from '@adiwajshing/baileys/lib/Types/LabelAssociation';
import { ILabelAssociationRepository } from '@waha/core/engines/noweb/store/ILabelAssociationsRepository';
import { SqlLabelAssociationsMethods } from '@waha/core/engines/noweb/store/sql/SqlLabelAssociationsMethods';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';
export declare class Sqlite3LabelAssociationsRepository extends NOWEBSqlite3KVRepository<LabelAssociation> implements ILabelAssociationRepository {
    get schema(): import("../../../../storage/Schema").Schema;
    get metadata(): Map<any, any>;
    get methods(): SqlLabelAssociationsMethods;
    deleteOne(association: LabelAssociation): Promise<void>;
    deleteByLabelId(labelId: string): Promise<void>;
    getAssociationsByLabelId(labelId: string, type: LabelAssociationType): Promise<LabelAssociation[]>;
    getAssociationsByChatId(chatId: string): Promise<LabelAssociation[]>;
}
