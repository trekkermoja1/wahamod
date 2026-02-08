"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const lodash = require("lodash");
class AlbumMessage {
    constructor(locale) {
        this.locale = locale;
    }
    convert(payload, protoMessage) {
        var _a, _b;
        const isAlbumMessage = ((_b = (_a = payload._data) === null || _a === void 0 ? void 0 : _a.Info) === null || _b === void 0 ? void 0 : _b.MediaType) === 'collection' ||
            !lodash.isEmpty(protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.albumMessage);
        if (!isAlbumMessage) {
            return null;
        }
        const albumInfo = protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.albumMessage;
        const expectedImageCount = (albumInfo === null || albumInfo === void 0 ? void 0 : albumInfo.expectedImageCount) || 0;
        const expectedVideoCount = (albumInfo === null || albumInfo === void 0 ? void 0 : albumInfo.expectedVideoCount) || 0;
        const content = this.locale.key(templates_1.TKey.WA_TO_CW_MESSAGE_ALBUM).r({
            expectedImageCount,
            expectedVideoCount,
            totalCount: expectedImageCount + expectedVideoCount,
        });
        return {
            content,
            attachments: [],
            private: undefined,
        };
    }
}
exports.AlbumMessage = AlbumMessage;
//# sourceMappingURL=AlbumMessage.js.map