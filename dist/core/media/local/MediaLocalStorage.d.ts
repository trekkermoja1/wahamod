import { IMediaStorage, MediaData } from '@waha/core/media/IMediaStorage';
import { Logger } from 'pino';
export declare class MediaLocalStorage implements IMediaStorage {
    protected log: Logger;
    private filesFolder;
    private baseUrl;
    private readonly lifetimeMs;
    constructor(log: Logger, filesFolder: string, baseUrl: string, lifetimeSeconds: number);
    init(): Promise<void>;
    exists(data: MediaData): Promise<boolean>;
    save(buffer: Buffer, data: MediaData): Promise<boolean>;
    getStorageData(data: MediaData): Promise<{
        url: string;
    }>;
    purge(): Promise<void>;
    private getKey;
    private getFullPath;
    private postponeRemoval;
    close(): Promise<void>;
}
