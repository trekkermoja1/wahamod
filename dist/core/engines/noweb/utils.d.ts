import type { proto } from '@adiwajshing/baileys';
export declare function extractMediaContent(content: any | proto.IMessage | null | undefined): any;
interface Long {
    low: number;
    high: number;
    unsigned: boolean;
    toNumber?(): number;
}
type AnyObject = {
    [key: string]: any;
};
export declare const replaceLongsWithNumber: (obj: AnyObject) => void;
export declare function convertProtobufToPlainObject(obj: any): any;
export declare function ensureNumber(value: number | Long | string | null): number;
export {};
