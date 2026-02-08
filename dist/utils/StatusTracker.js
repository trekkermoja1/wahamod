"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTracker = void 0;
const enums_dto_1 = require("../structures/enums.dto");
const STUCK_IN_STARTING_THRESHOLD = 60;
class StatusTracker {
    constructor() {
        this.numberOfStarting = 0;
    }
    track(status) {
        if (status == enums_dto_1.WAHASessionStatus.STARTING) {
            this.numberOfStarting += 1;
        }
        else {
            this.numberOfStarting = 0;
        }
    }
    isStuckInStarting() {
        return this.numberOfStarting >= STUCK_IN_STARTING_THRESHOLD;
    }
}
exports.StatusTracker = StatusTracker;
//# sourceMappingURL=StatusTracker.js.map