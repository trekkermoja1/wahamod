"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlLabelAssociationsMethods = void 0;
const LabelAssociationType_1 = require("../../labels/LabelAssociationType");
class SqlLabelAssociationsMethods {
    constructor(repository) {
        this.repository = repository;
    }
    async deleteOne(association) {
        await this.repository.deleteBy({
            type: association.type,
            chatId: association.chatId,
            labelId: association.labelId,
            messageId: association.messageId || null,
        });
    }
    async deleteByLabelId(labelId) {
        await this.repository.deleteBy({ labelId: labelId });
    }
    getAssociationsByLabelId(labelId, type) {
        return this.repository.getAllBy({
            type: type,
            labelId: labelId,
        });
    }
    getAssociationsByChatId(chatId) {
        return this.repository.getAllBy({
            chatId: chatId,
            type: LabelAssociationType_1.LabelAssociationType.Chat,
        });
    }
}
exports.SqlLabelAssociationsMethods = SqlLabelAssociationsMethods;
//# sourceMappingURL=SqlLabelAssociationsMethods.js.map