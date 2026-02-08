"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreMediaConverter = void 0;
const exceptions_1 = require("../exceptions");
class CoreMediaConverter {
    video(content) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    voice(content) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
}
exports.CoreMediaConverter = CoreMediaConverter;
//# sourceMappingURL=IConverter.js.map