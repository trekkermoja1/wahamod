import { S3MediaData } from '@waha/structures/media.s3.dto';
interface Message {
    id: string;
    chatId: string;
}
interface File {
    extension: string;
    filename?: string;
}
export interface MediaData {
    session: string;
    message: Message;
    file: File;
}
export interface MediaStorageData {
    url: string;
    s3?: S3MediaData;
}
declare abstract class IMediaStorage {
    abstract init(): Promise<void>;
    abstract save(buffer: Buffer, data: MediaData): Promise<boolean>;
    abstract exists(data: MediaData): Promise<boolean>;
    abstract getStorageData(data: MediaData): Promise<MediaStorageData>;
    abstract purge(): Promise<void>;
    abstract close(): Promise<void>;
}
export declare function getMetadata(data: MediaData): any;
export { IMediaStorage };
