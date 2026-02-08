"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentionsAll = mentionsAll;
exports.validateRequestMentions = validateRequestMentions;
const jids_1 = require("./jids");
const common_1 = require("@nestjs/common");
const ALL = 'all';
function mentionsAll(request) {
    return request.mentions && request.mentions.includes(ALL);
}
function validateRequestMentions(request) {
    if (!(0, jids_1.isJidGroup)(request.chatId)) {
        throw new common_1.UnprocessableEntityException(`"mentions":["all"] can be used only in group chats, not in '${request.chatId}'`);
    }
    if (request.mentions.length > 1) {
        throw new common_1.UnprocessableEntityException(`"mentions":["all"] cannot be used with other mentions`);
    }
}
//# sourceMappingURL=mentions.all.js.map