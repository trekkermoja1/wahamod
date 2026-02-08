"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const text_1 = require("./utils/text");
const markdown_1 = require("./utils/markdown");
const lodash = require("lodash");
class PollMessage {
    constructor(locale) {
        this.locale = locale;
    }
    convert(payload, protoMessage) {
        let poll = null;
        if (!lodash.isEmpty(protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.pollCreationMessage)) {
            poll = protoMessage.pollCreationMessage;
        }
        if (!lodash.isEmpty(protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.pollCreationMessageV2)) {
            poll = protoMessage.pollCreationMessageV2;
        }
        if (!lodash.isEmpty(protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.pollCreationMessageV3)) {
            poll = protoMessage.pollCreationMessageV3;
        }
        if (!poll) {
            return null;
        }
        const content = this.locale
            .key(templates_1.TKey.WA_TO_CW_MESSAGE_POLL)
            .r({ payload: payload, poll: poll, message: protoMessage });
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
exports.PollMessage = PollMessage;
//# sourceMappingURL=PollMessage.js.map