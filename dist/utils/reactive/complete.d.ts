interface WithValues<T> {
    values(): IterableIterator<T>;
}
interface Completable {
    complete(): void;
}
export declare function complete(collection: WithValues<Completable>): void;
export {};
