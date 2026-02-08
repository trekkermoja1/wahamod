"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const text_1 = require("./utils/text");
const markdown_1 = require("./utils/markdown");
const JobUtils_1 = require("../../../../app_sdk/JobUtils");
const mime = require('mime-types');
class TextMessage {
    constructor(locale, logger, waha, job) {
        this.locale = locale;
        this.logger = logger;
        this.waha = waha;
        this.job = job;
    }
    async convert(payload, protoMessage) {
        void protoMessage;
        const attachments = await this.getAttachments(payload);
        let content = this.locale.key(templates_1.TKey.WA_TO_CW_MESSAGE).render({ payload });
        if ((0, text_1.isEmptyString)(content) && attachments.length === 0) {
            return null;
        }
        if ((0, text_1.isEmptyString)(content)) {
            content = null;
        }
        if (attachments.length == 0 && payload.hasMedia) {
            content = this.locale.r('whatsapp.to.chatwoot.message.has.media.no.media', {
                content: content,
                details: (0, JobUtils_1.JobLink)(this.job),
            });
        }
        return {
            content: (0, markdown_1.WhatsappToMarkdown)(content),
            attachments,
            private: undefined,
        };
    }
    async getAttachments(payload) {
        var _a;
        const hasMedia = (_a = payload.media) === null || _a === void 0 ? void 0 : _a.url;
        if (!hasMedia) {
            return [];
        }
        const media = payload.media;
        this.logger.debug(`Downloading media from '${media.url}'...`);
        const buffer = await this.waha.fetch(media.url);
        const fileContent = buffer.toString('base64');
        let filename = media.filename;
        if (!filename) {
            const extension = mime.extension(media.mimetype);
            filename = `no-filename.${extension}`;
        }
        const attachment = {
            content: fileContent,
            filename,
            encoding: 'base64',
        };
        this.logger.info(`Downloaded media from '${media.url}' as '${filename}'`);
        return [attachment];
    }
}
exports.TextMessage = TextMessage;
//# sourceMappingURL=TextMessage.js.map