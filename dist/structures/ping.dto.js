"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingResponse = void 0;
const openapi = require("@nestjs/swagger");
class PingResponse {
    constructor() {
        this.message = 'pong';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String, default: "pong" } };
    }
}
exports.PingResponse = PingResponse;
//# sourceMappingURL=ping.dto.js.map