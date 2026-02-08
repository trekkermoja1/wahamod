import { RMutex, RMutexClient, RMutexLocked } from './types';
export declare class RMutexImpl implements RMutex {
    private readonly client;
    private readonly ttl;
    private keys;
    constructor(client: RMutexClient, key: string, ttl: number);
    private key;
    withKey(key: string): RMutex;
    lock(): Promise<RMutexLocked | null>;
}
export declare class RMutexLockedImpl implements RMutexLocked {
    private readonly client;
    private readonly key;
    private readonly lockId;
    private readonly ttl;
    constructor(client: RMutexClient, key: string, lockId: string, ttl: number);
    release(): Promise<boolean>;
    extend(ttl?: number): Promise<boolean>;
}
