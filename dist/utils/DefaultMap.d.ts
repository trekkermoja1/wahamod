export declare class DefaultMap<K, T> extends Map<K, T> {
    private readonly factory;
    constructor(factory: (key: K) => T);
    get(key: K): T;
}
