export declare class ChatIDNotFoundForContactError extends Error {
    sender: any;
    constructor(sender: any);
}
export declare class PhoneNumberNotFoundInWhatsAppError extends Error {
    phone: any;
    constructor(phone: any);
}
export declare class UnknownJIDFormat extends Error {
    jid: string;
    constructor(jid: string);
}
