export interface IMediaConverter {
    voice(content: Buffer): Promise<Buffer>;
    video(content: Buffer): Promise<Buffer>;
}
export declare class CoreMediaConverter implements IMediaConverter {
    video(content: Buffer): Promise<Buffer>;
    voice(content: Buffer): Promise<Buffer>;
}
