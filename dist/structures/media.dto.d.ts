import { S3MediaData } from '@waha/structures/media.s3.dto';
export declare class WAMedia {
    url?: string;
    mimetype?: string;
    filename?: string;
    s3?: S3MediaData;
    error?: object;
}
export declare class FileDTO {
    url?: string;
    data?: string;
}
export declare class VoiceFileDTO extends FileDTO {
    url?: string;
}
export declare class VideoFileDTO extends FileDTO {
    url?: string;
}
