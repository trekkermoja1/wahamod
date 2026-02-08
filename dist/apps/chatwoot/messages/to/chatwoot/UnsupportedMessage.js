"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedMessage = void 0;
const JobUtils_1 = require("../../../../app_sdk/JobUtils");
const templates_1 = require("../../../i18n/templates");
class UnsupportedMessage {
    constructor(locale, job) {
        this.locale = locale;
        this.job = job;
    }
    convert(payload, protoMessage) {
        void payload;
        void protoMessage;
        const content = this.locale
            .key(templates_1.TKey.WA_TO_CW_MESSAGE_UNSUPPORTED)
            .render({ details: (0, JobUtils_1.JobLink)(this.job) });
        return {
            content,
            attachments: [],
            private: true,
        };
    }
}
exports.UnsupportedMessage = UnsupportedMessage;
//# sourceMappingURL=UnsupportedMessage.js.map