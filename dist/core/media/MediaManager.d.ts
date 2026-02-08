import { IMediaEngineProcessor } from '@waha/core/media/IMediaEngineProcessor';
import { IMediaManager } from '@waha/core/media/IMediaManager';
import { IMediaStorage } from '@waha/core/media/IMediaStorage';
import { WAMedia } from '@waha/structures/media.dto';
import { Logger } from 'pino';
export declare class MediaManager implements IMediaManager {
    private storage;
    private mimetypes;
    protected log: Logger;
    RETRY_OPTIONS: {
        retries: number;
        minTimeout: number;
        maxTimeout: number;
    };
    constructor(storage: IMediaStorage, mimetypes: string[], log: Logger);
    private shouldProcessMimetype;
    private processMediaInternal;
    processMedia<Message>(processor: IMediaEngineProcessor<Message>, message: Message, session: string): Promise<WAMedia | null>;
    private fetchMedia;
    private saveMedia;
    private getStorageData;
    private exists;
    private withRetry;
    close(): void;
}
