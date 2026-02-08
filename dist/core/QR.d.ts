export declare class QR {
    raw?: string;
    save(raw?: string): void;
    get(): Promise<Buffer>;
}
