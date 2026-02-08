"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentFromBuffer = AttachmentFromBuffer;
function AttachmentFromBuffer(buffer, filename) {
    const content = buffer.toString('base64');
    const attachments = [
        {
            content: content,
            filename: filename,
            encoding: 'base64',
        },
    ];
    const message = {
        content: '',
        attachments: attachments,
    };
    return message;
}
//# sourceMappingURL=messages.js.map