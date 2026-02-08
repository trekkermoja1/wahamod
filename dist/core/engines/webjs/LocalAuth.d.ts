import { AuthStrategy, Client } from 'whatsapp-web.js';
export declare class LocalAuth implements AuthStrategy {
    private readonly logger;
    private client;
    private readonly clientId;
    private readonly dataPath;
    private readonly rmMaxRetries;
    private userDataDir;
    setup(client: Client): void;
    constructor({ clientId, dataPath, rmMaxRetries, logger }: {
        clientId: any;
        dataPath: any;
        rmMaxRetries: any;
        logger: any;
    });
    beforeBrowserInitialized(): Promise<void>;
    private removeSingletonFiles;
    logout(): Promise<void>;
    private removePathSilently;
    afterBrowserInitialized(): Promise<void>;
    onAuthenticationNeeded(): Promise<{
        failed: boolean;
        restart: boolean;
        failureEventPayload: any;
    }>;
    getAuthEventPayload(): Promise<void>;
    afterAuthReady(): Promise<void>;
    disconnect(): Promise<void>;
    destroy(): Promise<void>;
}
