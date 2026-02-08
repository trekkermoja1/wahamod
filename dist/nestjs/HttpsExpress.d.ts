import { Logger } from 'pino';
export declare class HttpsExpress {
    private logger;
    private readonly keyPath;
    private readonly certPath;
    private readonly caPath;
    constructor(logger: Logger);
    readSync(): {
        key: NonSharedBuffer;
        cert: NonSharedBuffer;
        ca: NonSharedBuffer;
    };
    watchCertChanges(httpd: any): void;
}
