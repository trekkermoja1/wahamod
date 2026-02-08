"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFileAcceptHeader = ApiFileAcceptHeader;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const files_dto_1 = require("../structures/files.dto");
function getRefSchemaPaths(models) {
    return models.map((model) => {
        return { $ref: (0, swagger_1.getSchemaPath)(model) };
    });
}
function ApiFileAcceptHeader(mimetype, ...models) {
    models = models.length ? models : [files_dto_1.Base64File];
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(...models), (0, swagger_1.ApiResponse)({
        status: 200,
        content: {
            [mimetype]: {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
            'application/json': {
                schema: {
                    oneOf: getRefSchemaPaths(models),
                },
            },
        },
    }));
}
//# sourceMappingURL=ApiFileAcceptHeader.js.map