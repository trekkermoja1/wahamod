"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const text_1 = require("./utils/text");
const markdown_1 = require("./utils/markdown");
class EventMessage {
    constructor(l) {
        this.l = l;
    }
    convert(payload, protoMessage) {
        const eventMessage = protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.eventMessage;
        if (!eventMessage) {
            return null;
        }
        const formattedEventMessage = Object.assign(Object.assign({}, eventMessage), { startTime: this.l.FormatTimestamp(eventMessage.startTime), endTime: this.l.FormatTimestamp(eventMessage.endTime) });
        const content = this.l.key(templates_1.TKey.WA_TO_CW_MESSAGE_EVENT).r({
            payload,
            message: {
                eventMessage: formattedEventMessage,
            },
        });
        if ((0, text_1.isEmptyString)(content)) {
            return null;
        }
        return {
            content: (0, markdown_1.WhatsappToMarkdown)(content),
            attachments: [],
            private: undefined,
        };
    }
}
exports.EventMessage = EventMessage;
//# sourceMappingURL=EventMessage.js.map