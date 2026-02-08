import { BinaryFile, RemoteFile } from '@waha/structures/files.dto';
export declare class MyProfile {
    id: string;
    name: string;
    picture: string | null;
}
export declare class ProfileNameRequest {
    name: string;
}
export declare class ProfileStatusRequest {
    status: string;
}
export declare class ProfilePictureRequest {
    file: BinaryFile | RemoteFile;
}
