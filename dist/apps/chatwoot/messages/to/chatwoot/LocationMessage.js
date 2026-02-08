"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const text_1 = require("./utils/text");
const lodash = require("lodash");
class LocationMessage {
    constructor(locale) {
        this.locale = locale;
    }
    convert(payload, protoMessage) {
        const hasLocation = !lodash.isEmpty(protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.locationMessage);
        const hasLiveLocation = !lodash.isEmpty(protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.liveLocationMessage);
        if (!hasLocation && !hasLiveLocation) {
            return null;
        }
        const content = this.locale
            .key(templates_1.TKey.WA_TO_CW_MESSAGE_LOCATION)
            .r({ payload, message: protoMessage });
        if ((0, text_1.isEmptyString)(content)) {
            return null;
        }
        return {
            content,
            attachments: [],
            private: undefined,
        };
    }
}
exports.LocationMessage = LocationMessage;
//# sourceMappingURL=LocationMessage.js.map