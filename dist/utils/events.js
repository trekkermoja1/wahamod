"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWildUnmask = void 0;
class EventWildUnmask {
    constructor(events, all = null) {
        this.events = events;
        this.all = all;
        this.events = Object.values(events);
        this.all = all ? Object.values(all) : this.events;
    }
    unmask(events) {
        const rightEvents = [];
        if (events.includes('*')) {
            rightEvents.push(...this.all);
        }
        for (const event of events) {
            if (!this.events.includes(event)) {
                continue;
            }
            rightEvents.push(event);
        }
        return [...new Set(rightEvents)];
    }
}
exports.EventWildUnmask = EventWildUnmask;
//# sourceMappingURL=events.js.map