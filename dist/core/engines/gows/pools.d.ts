export declare class Pool<Client> {
    private factory;
    private instances;
    constructor(factory: () => Client);
    protected key(name: string): any;
    get(name: string): Client;
}
export declare class SizedPool<Client> extends Pool<Client> {
    protected size: number;
    constructor(size: number, factory: () => Client);
    protected key(name: string): any;
}
