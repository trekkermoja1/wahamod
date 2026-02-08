import { Logger } from 'pino';
export declare class TmpDir {
    private logger;
    private cleanupTimeout;
    private readonly prefix;
    constructor(logger: Logger, prefix: string, cleanupTimeout?: number);
    use<T>(callback: (dir: string) => Promise<T>): Promise<T>;
}
