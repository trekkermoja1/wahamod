export declare abstract class IApiKeyAuth {
    abstract isValid(plain: string): boolean;
    abstract skipAuth(): boolean;
}
export declare class NoAuth implements IApiKeyAuth {
    isValid(plain: string): boolean;
    skipAuth(): boolean;
}
export declare class PlainApiKeyAuth implements IApiKeyAuth {
    private key;
    constructor(key: string);
    isValid(plain: string): boolean;
    skipAuth(): boolean;
}
export declare class HashAuth implements IApiKeyAuth {
    private hash;
    private algorithm;
    constructor(hash: string, algorithm: string);
    isValid(plain: string): boolean;
    skipAuth(): boolean;
}
export declare function compare(provided: string, stored: string | undefined): boolean;
