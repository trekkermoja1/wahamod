import { BinaryFile, RemoteFile } from '@waha/structures/files.dto';
export declare enum ButtonType {
    REPLY = "reply",
    URL = "url",
    CALL = "call",
    COPY = "copy"
}
export declare class Button {
    type: ButtonType;
    text: string;
    id?: string;
    url?: string;
    phoneNumber?: string;
    copyCode?: string;
}
export declare class SendButtonsRequest {
    session: string;
    chatId: string;
    header: string;
    headerImage?: RemoteFile | BinaryFile;
    body: string;
    footer: string;
    buttons: Button[];
}
