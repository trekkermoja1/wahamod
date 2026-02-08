"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsFromObservable = void 0;
const events_1 = require("events");
class EventsFromObservable extends events_1.EventEmitter {
    constructor(observable) {
        super();
        this.observable = observable;
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    start() {
        this.subscription = this.observable.subscribe({
            next: (data) => this.emit(data.event, data.data),
            complete: () => this.removeAllListeners(),
            error: (err) => null,
        });
    }
    stop() {
        this.subscription.unsubscribe();
    }
}
exports.EventsFromObservable = EventsFromObservable;
//# sourceMappingURL=EventsFromObservable.js.map