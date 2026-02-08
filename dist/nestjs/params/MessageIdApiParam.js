"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageIdApiParam = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.MessageIdApiParam = (0, swagger_1.ApiParam)({
    name: 'messageId',
    required: true,
    type: 'string',
    description: 'Message ID in format <code>{fromMe}_{chat}_{message_id}[_{participant}]</code>',
    example: 'true_123456789@c.us_BAE6A33293978B16',
});
//# sourceMappingURL=MessageIdApiParam.js.map