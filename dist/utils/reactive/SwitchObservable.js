"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchObservable = void 0;
const rxjs_1 = require("rxjs");
const noop = (x) => x;
class SwitchObservable extends rxjs_1.Observable {
    constructor(fn = noop) {
        const subject$ = new rxjs_1.BehaviorSubject(rxjs_1.EMPTY);
        let observable$ = subject$.pipe((0, rxjs_1.switchMap)((stream$) => stream$));
        observable$ = fn(observable$);
        super((subscriber) => observable$.subscribe(subscriber));
        this.subject$ = subject$;
    }
    switch(newObservable$) {
        this.subject$.next(newObservable$ || rxjs_1.EMPTY);
    }
    complete() {
        this.switch(rxjs_1.EMPTY);
        this.subject$.complete();
    }
}
exports.SwitchObservable = SwitchObservable;
//# sourceMappingURL=SwitchObservable.js.map