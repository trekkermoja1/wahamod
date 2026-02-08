"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseEventResponseType = ParseEventResponseType;
const events_dto_1 = require("../../structures/events.dto");
function ParseEventResponseType(response) {
    switch (response) {
        case 0:
            return events_dto_1.EventResponseType.UNKNOWN;
        case 1:
            return events_dto_1.EventResponseType.GOING;
        case 2:
            return events_dto_1.EventResponseType.NOT_GOING;
        case 3:
            return events_dto_1.EventResponseType.MAYBE;
        default:
            return events_dto_1.EventResponseType.UNKNOWN;
    }
}
//# sourceMappingURL=events.js.map