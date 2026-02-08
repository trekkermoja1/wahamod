"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasMediaWithNoMediaMessage = void 0;
const JobUtils_1 = require("../../../../app_sdk/JobUtils");
class HasMediaWithNoMediaMessage {
    constructor(locale, job) {
        this.locale = locale;
        this.job = job;
    }
    convert(payload, protoMessage) {
        void protoMessage;
        if (!payload.hasMedia) {
            return null;
        }
        const content = this.locale.r('whatsapp.to.chatwoot.message.has.media.no.media', {
            content: null,
            details: (0, JobUtils_1.JobLink)(this.job),
        });
        return {
            content,
            attachments: [],
            private: true,
        };
    }
}
exports.HasMediaWithNoMediaMessage = HasMediaWithNoMediaMessage;
//# sourceMappingURL=HasMediaWithNoMediaMessage.js.map