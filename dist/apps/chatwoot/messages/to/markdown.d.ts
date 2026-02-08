export declare class UrlProtection {
    private readonly placeholder;
    constructor(placeholder?: string);
    protect(text: string): ProtectedUrlText;
}
export declare class ProtectedUrlText {
    text: string;
    private readonly urls;
    private readonly placeholder;
    constructor(text: string, urls: string[], placeholder: string);
    restore(text?: string): string;
}
