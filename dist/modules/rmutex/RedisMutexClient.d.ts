import Redis from 'ioredis';
import { Logger } from 'pino';
import { RMutexClient } from './types';
export declare class RedisMutexClient implements RMutexClient {
    private readonly redis;
    private readonly logger;
    constructor(redis: Redis, logger: Logger);
    acquireLock(key: string, lockId: string, ttl: number): Promise<boolean>;
    releaseLock(key: string, lockId: string): Promise<boolean>;
    extendLock(key: string, lockId: string, ttl: number): Promise<boolean>;
}
