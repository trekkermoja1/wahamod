"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusToAck = StatusToAck;
exports.AckToStatus = AckToStatus;
function StatusToAck(status) {
    return status - 1;
}
function AckToStatus(ack) {
    return ack + 1;
}
//# sourceMappingURL=acks.js.map