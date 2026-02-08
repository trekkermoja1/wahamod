import { BinaryFile, RemoteFile, VideoBinaryFile, VideoRemoteFile, VoiceBinaryFile, VoiceRemoteFile } from './files.dto';
export declare const BROADCAST_ID = "status@broadcast";
export declare class StatusRequest {
    id?: string;
    contacts?: string[];
}
export declare class TextStatus extends StatusRequest {
    text: string;
    backgroundColor: string;
    font: number;
    linkPreview?: boolean;
    linkPreviewHighQuality?: boolean;
}
export declare class ImageStatus extends StatusRequest {
    file: RemoteFile | BinaryFile;
    caption?: string;
}
export declare class VoiceStatus extends StatusRequest {
    file: VoiceRemoteFile | VoiceBinaryFile;
    backgroundColor: string;
    convert: boolean;
}
export declare class VideoStatus extends StatusRequest {
    file: VideoRemoteFile | VideoBinaryFile;
    caption?: string;
    convert: boolean;
}
export declare class DeleteStatusRequest extends StatusRequest {
    id: string;
    contacts?: string[];
}
