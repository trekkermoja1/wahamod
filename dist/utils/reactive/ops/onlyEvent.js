"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyEvent = onlyEvent;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function onlyEvent(event) {
    return (0, rxjs_1.pipe)((0, rxjs_1.filter)((obj) => obj.event === event), (0, operators_1.map)((event) => event.data));
}
//# sourceMappingURL=onlyEvent.js.map