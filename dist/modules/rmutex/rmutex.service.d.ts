import Redis from 'ioredis';
import { Logger } from 'pino';
import { RMutex } from './types';
export declare class RMutexService {
    private readonly redis;
    private readonly logger;
    private readonly ttl;
    private readonly client;
    constructor(redis: Redis, logger: Logger, ttl?: number);
    get(key: string, ttl?: number): RMutex;
}
