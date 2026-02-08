interface EventValue<T> {
    event: string;
    data: T;
}
export declare function onlyEvent<T>(event: any): import("rxjs").UnaryFunction<import("rxjs").Observable<EventValue<T>>, import("rxjs").Observable<T>>;
export {};
