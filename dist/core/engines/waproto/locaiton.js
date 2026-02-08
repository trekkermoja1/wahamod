"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWALocation = extractWALocation;
const lodash = require("lodash");
const bytes_1 = require("../../../utils/bytes");
function extractWALocation(waproto) {
    var _a, _b, _c, _d;
    if (!waproto) {
        return null;
    }
    if (!lodash.isEmpty(waproto.locationMessage)) {
        const location = waproto.locationMessage;
        return {
            live: false,
            latitude: (_a = location.degreesLatitude) === null || _a === void 0 ? void 0 : _a.toString(),
            longitude: (_b = location.degreesLongitude) === null || _b === void 0 ? void 0 : _b.toString(),
            name: location.name,
            address: location.address,
            url: location.url,
            description: location.comment,
            thumbnail: (0, bytes_1.ensureBase64)(location.jpegThumbnail),
        };
    }
    if (!lodash.isEmpty(waproto.liveLocationMessage)) {
        const location = waproto.liveLocationMessage;
        return {
            live: true,
            latitude: (_c = location.degreesLatitude) === null || _c === void 0 ? void 0 : _c.toString(),
            longitude: (_d = location.degreesLongitude) === null || _d === void 0 ? void 0 : _d.toString(),
            description: location.caption,
            thumbnail: (0, bytes_1.ensureBase64)(location.jpegThumbnail),
        };
    }
    return null;
}
//# sourceMappingURL=locaiton.js.map