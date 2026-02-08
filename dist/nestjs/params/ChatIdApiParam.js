"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupIdApiParam = exports.ChatIdApiParam = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.ChatIdApiParam = (0, swagger_1.ApiParam)({
    name: 'chatId',
    required: true,
    type: 'string',
    description: 'Chat ID',
    example: '123456789@c.us',
});
exports.GroupIdApiParam = (0, swagger_1.ApiParam)({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Group ID',
    example: '123123123@g.us',
});
//# sourceMappingURL=ChatIdApiParam.js.map