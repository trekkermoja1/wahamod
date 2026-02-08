"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStatusEmoji = SessionStatusEmoji;
exports.MessageAckEmoji = MessageAckEmoji;
const enums_dto_1 = require("../../structures/enums.dto");
function SessionStatusEmoji(status) {
    switch (status) {
        case enums_dto_1.WAHASessionStatus.STOPPED:
            return '⚠️';
        case enums_dto_1.WAHASessionStatus.STARTING:
            return '⏳';
        case enums_dto_1.WAHASessionStatus.SCAN_QR_CODE:
            return '⚠️';
        case enums_dto_1.WAHASessionStatus.WORKING:
            return '🟢';
        case enums_dto_1.WAHASessionStatus.FAILED:
            return '🛑';
        default:
            return '❓';
    }
}
function MessageAckEmoji(ack) {
    switch (ack) {
        case enums_dto_1.WAMessageAck.ERROR:
            return '❌';
        case enums_dto_1.WAMessageAck.PENDING:
            return '⏳';
        case enums_dto_1.WAMessageAck.SERVER:
            return '✔️';
        case enums_dto_1.WAMessageAck.DEVICE:
            return '✔️';
        case enums_dto_1.WAMessageAck.READ:
            return '✅';
        case enums_dto_1.WAMessageAck.PLAYED:
            return '✅';
        default:
            return '❔';
    }
}
//# sourceMappingURL=emoji.js.map