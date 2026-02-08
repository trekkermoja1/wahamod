"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeSessionParam = exports.WorkingSessionParam = exports.SessionParam = exports.SessionApiParam = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const SessionPipe_1 = require("../pipes/SessionPipe");
exports.SessionApiParam = (0, swagger_1.ApiParam)({
    name: 'session',
    required: true,
    type: 'string',
    schema: {
        default: 'default',
    },
    description: 'Session name',
});
exports.SessionParam = (0, common_1.Param)('session', SessionPipe_1.SessionPipe);
exports.WorkingSessionParam = (0, common_1.Param)('session', SessionPipe_1.WorkingSessionPipe);
exports.QRCodeSessionParam = (0, common_1.Param)('session', SessionPipe_1.QRCodeSessionPipe);
//# sourceMappingURL=SessionApiParam.js.map