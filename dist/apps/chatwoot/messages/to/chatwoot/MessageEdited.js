"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEdited = void 0;
const templates_1 = require("../../../i18n/templates");
const markdown_1 = require("./utils/markdown");
class MessageEdited {
    constructor(locale) {
        this.locale = locale;
    }
    convert(payload, protoMessage) {
        void protoMessage;
        const formatted = (0, markdown_1.WhatsappToMarkdown)(payload.body);
        const content = this.locale
            .key(templates_1.TKey.MESSAGE_EDITED_IN_WHATSAPP)
            .render({ text: formatted });
        return {
            content,
            attachments: [],
            private: undefined,
        };
    }
}
exports.MessageEdited = MessageEdited;
//# sourceMappingURL=MessageEdited.js.map