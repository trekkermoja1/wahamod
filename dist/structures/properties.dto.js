"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertApiProperty = ConvertApiProperty;
exports.ChatIdProperty = ChatIdProperty;
exports.MessageIdOnlyProperty = MessageIdOnlyProperty;
exports.MessageIdProperty = MessageIdProperty;
exports.ReplyToProperty = ReplyToProperty;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
function ChatIdProperty(options = null) {
    options = options || {};
    if (!options.example) {
        options.example = '11111111111@c.us';
    }
    return (0, swagger_1.ApiProperty)(options);
}
function MessageIdProperty() {
    return (0, swagger_1.ApiProperty)({
        description: 'Message ID',
        example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
    });
}
function MessageIdOnlyProperty() {
    return (0, swagger_1.ApiProperty)({
        description: 'Message ID',
        example: 'AAAAAAAAAAAAAAAAAAAA',
    });
}
function ReplyToProperty() {
    return (0, swagger_1.ApiProperty)({
        description: 'The ID of the message to reply to - false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
        example: null,
    });
}
function ConvertApiProperty() {
    return (0, swagger_1.ApiProperty)({
        description: 'Convert the input file to the required format using ffmpeg before sending',
        example: true,
    });
}
//# sourceMappingURL=properties.dto.js.map