export declare class Base64File {
    mimetype: string;
    data: string;
}
export declare class RemoteFile {
    mimetype: string;
    filename?: string;
    url: string;
}
export declare class BinaryFile {
    mimetype: string;
    filename?: string;
    data: string;
}
export declare class VoiceBinaryFile {
    mimetype: string;
    filename: string;
    data: string;
}
export declare class VoiceRemoteFile {
    mimetype: string;
    url: string;
}
export declare class VideoBinaryFile {
    mimetype: string;
    filename: string;
    data: string;
}
export declare class VideoRemoteFile {
    mimetype: string;
    filename: string;
    url: string;
}
export declare class FileURL {
    url?: string;
}
export declare class FileContent {
    data?: string;
}
export type FileType = FileURL | FileContent;
