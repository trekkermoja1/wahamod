export interface RMutexClient {
    acquireLock(key: string, lockId: string, ttl: number): Promise<boolean>;
    releaseLock(key: string, lockId: string): Promise<boolean>;
    extendLock(key: string, lockId: string, ttl: number): Promise<boolean>;
}
export interface RMutexLocked {
    release(): Promise<boolean>;
    extend(ttl?: number): Promise<boolean>;
}
export interface RMutex {
    withKey(key: string): RMutex;
    lock(): Promise<RMutexLocked | null>;
}
