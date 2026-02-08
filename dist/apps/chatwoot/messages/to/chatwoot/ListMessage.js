"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const text_1 = require("./utils/text");
const markdown_1 = require("./utils/markdown");
const lodash = require("lodash");
class ListMessage {
    constructor(locale) {
        this.locale = locale;
    }
    convert(payload, protoMessage) {
        const listMessage = protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.listMessage;
        if (lodash.isEmpty(listMessage)) {
            return null;
        }
        const content = this.locale
            .key(templates_1.TKey.WA_TO_CW_MESSAGE_LIST)
            .r({ payload, message: protoMessage });
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
exports.ListMessage = ListMessage;
//# sourceMappingURL=ListMessage.js.map