"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookAdMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const markdown_1 = require("./utils/markdown");
const lodash = require("lodash");
const fetch_1 = require("../../../../../utils/fetch");
class FacebookAdMessage {
    constructor(locale, logger) {
        this.locale = locale;
        this.logger = logger;
    }
    async convert(payload, protoMessage) {
        const adData = this.extractAdData(protoMessage);
        if (!adData) {
            return null;
        }
        const content = this.locale.key(templates_1.TKey.WA_TO_CW_MESSAGE_FACEBOOK_AD).render({
            payload,
            adData,
        });
        const attachments = await this.getAttachments(adData);
        return {
            content: (0, markdown_1.WhatsappToMarkdown)(content),
            attachments,
            private: undefined,
        };
    }
    extractAdData(protoMessage) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (lodash.isEmpty((_b = (_a = protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.extendedTextMessage) === null || _a === void 0 ? void 0 : _a.contextInfo) === null || _b === void 0 ? void 0 : _b.externalAdReply)) {
            return null;
        }
        const adReply = (_d = (_c = protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.extendedTextMessage) === null || _c === void 0 ? void 0 : _c.contextInfo) === null || _d === void 0 ? void 0 : _d.externalAdReply;
        return {
            title: (_e = adReply.title) !== null && _e !== void 0 ? _e : '',
            body: (_f = adReply.body) !== null && _f !== void 0 ? _f : '',
            thumbnailUrl: (_g = adReply.thumbnailUrl) !== null && _g !== void 0 ? _g : '',
            originalImageUrl: (_h = adReply.originalImageUrl) !== null && _h !== void 0 ? _h : '',
            sourceUrl: (_j = adReply.sourceUrl) !== null && _j !== void 0 ? _j : '',
            sourceId: (_k = adReply.sourceId) !== null && _k !== void 0 ? _k : '',
        };
    }
    async getAttachments(adData) {
        const imageUrl = adData.originalImageUrl || adData.thumbnailUrl;
        if (!imageUrl) {
            return [];
        }
        try {
            this.logger.info(`Downloading Facebook Ad image from '${imageUrl}'...`);
            const buffer = await (0, fetch_1.fetchBuffer)(imageUrl);
            const attachment = {
                content: buffer.toString('base64'),
                filename: 'facebook-ad-image.jpg',
                encoding: 'base64',
            };
            this.logger.info(`Downloaded Facebook Ad image from '${imageUrl}' as '${attachment.filename}'`);
            return [attachment];
        }
        catch (error) {
            const reason = error instanceof Error ? error.message : `${error}`;
            this.logger.error(`Failed to download Facebook Ad image from '${imageUrl}': ${reason}`);
            return [];
        }
    }
}
exports.FacebookAdMessage = FacebookAdMessage;
//# sourceMappingURL=FacebookAdMessage.js.map