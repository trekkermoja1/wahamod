import type { LabelAssociation } from '@adiwajshing/baileys/lib/Types/LabelAssociation';
import { SqlKVRepository } from '@waha/core/storage/sql/SqlKVRepository';
import { LabelAssociationType } from '@waha/core/engines/noweb/labels/LabelAssociationType';
export declare class SqlLabelAssociationsMethods {
    private repository;
    constructor(repository: SqlKVRepository<any>);
    deleteOne(association: LabelAssociation): Promise<void>;
    deleteByLabelId(labelId: string): Promise<void>;
    getAssociationsByLabelId(labelId: string, type: LabelAssociationType): Promise<LabelAssociation[]>;
    getAssociationsByChatId(chatId: string): Promise<LabelAssociation[]>;
}
