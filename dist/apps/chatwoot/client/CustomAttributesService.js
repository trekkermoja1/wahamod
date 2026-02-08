"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAttributesService = void 0;
const types_1 = require("./types");
class CustomAttributesService {
    constructor(config, accountAPI) {
        this.config = config;
        this.accountAPI = accountAPI;
    }
    async upsert(attributes) {
        const current = {
            [types_1.CustomAttributeModel.CONVERSATION]: [],
            [types_1.CustomAttributeModel.CONTACT]: [],
        };
        const models = [
            types_1.CustomAttributeModel.CONVERSATION,
            types_1.CustomAttributeModel.CONTACT,
        ];
        for (const model of models) {
            current[model] = await this.accountAPI.customAttributes.list({
                accountId: this.config.accountId,
                attributeModel: String(model),
            });
        }
        for (const attribute of attributes) {
            const existing = current[attribute.model].find((a) => a.attribute_key === attribute.key);
            if (existing) {
                await this.accountAPI.customAttributes.update({
                    accountId: this.config.accountId,
                    id: existing.id,
                    data: {
                        attribute_key: attribute.key,
                        attribute_display_name: attribute.name,
                        attribute_display_type: attribute.type,
                        attribute_description: attribute.description,
                    },
                });
            }
            else {
                await this.accountAPI.customAttributes.create({
                    accountId: this.config.accountId,
                    data: {
                        attribute_key: attribute.key,
                        attribute_display_name: attribute.name,
                        attribute_display_type: attribute.type,
                        attribute_description: attribute.description,
                        attribute_model: attribute.model,
                    },
                });
            }
        }
    }
}
exports.CustomAttributesService = CustomAttributesService;
//# sourceMappingURL=CustomAttributesService.js.map