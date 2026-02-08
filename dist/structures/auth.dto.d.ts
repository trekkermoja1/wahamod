export declare enum QRCodeFormat {
    IMAGE = "image",
    RAW = "raw"
}
export declare class QRCodeQuery {
    format: QRCodeFormat;
}
export declare class QRCodeValue {
    value: string;
}
export declare class RequestCodeRequest {
    phoneNumber: string;
    method: string;
    localeLanguage: string;
    localeCountry: string;
}
export declare class PairingCodeResponse {
    code: string;
}
