"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventStreamClient = exports.GetMessageServiceClient = void 0;
const gows_1 = require("./grpc/gows");
const GetMessageServiceClient = (session, address, credentials) => {
    return new gows_1.messages.MessageServiceClient(address, credentials, {
        'grpc.max_send_message_length': 128 * 1024 * 1024,
        'grpc.max_receive_message_length': 128 * 1024 * 1024,
    });
};
exports.GetMessageServiceClient = GetMessageServiceClient;
const GetEventStreamClient = (session, address, credentials) => {
    return new gows_1.messages.EventStreamClient(address, credentials, {
        'grpc.max_send_message_length': 128 * 1024 * 1024,
        'grpc.max_receive_message_length': 128 * 1024 * 1024,
    });
};
exports.GetEventStreamClient = GetEventStreamClient;
//# sourceMappingURL=clients.js.map