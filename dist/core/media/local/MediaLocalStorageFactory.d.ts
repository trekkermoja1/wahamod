import { IMediaStorage } from '@waha/core/media/IMediaStorage';
import { MediaLocalStorageConfig } from '@waha/core/media/local/MediaLocalStorageConfig';
import { MediaStorageFactory } from '@waha/core/media/MediaStorageFactory';
import { Logger } from 'pino';
export declare class MediaLocalStorageFactory extends MediaStorageFactory {
    private config;
    constructor(config: MediaLocalStorageConfig);
    build(name: string, logger: Logger): Promise<IMediaStorage>;
}
