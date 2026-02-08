"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEngineName = getEngineName;
const enums_dto_1 = require("./structures/enums.dto");
function getEngineName() {
    return process.env.WHATSAPP_DEFAULT_ENGINE || enums_dto_1.WAHAEngine.WEBJS;
}
//# sourceMappingURL=config.js.map