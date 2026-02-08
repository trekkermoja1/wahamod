import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
interface EventValue<T> {
    event: string;
    data: T;
}
export declare class EventsFromObservable<Events extends string> extends EventEmitter {
    private observable;
    private subscription;
    constructor(observable: Observable<EventValue<any>>);
    on(event: Events, listener: (...args: any[]) => void): this;
    start(): void;
    stop(): void;
}
export {};
