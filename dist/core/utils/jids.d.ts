import type { WAMessageKey } from '@adiwajshing/baileys';
export declare function isJidNewsletter(jid: string): boolean;
export declare function isJidCus(jid: string): boolean;
export declare function isJidGroup(jid: string): boolean;
export declare function isJidStatusBroadcast(jid: string): jid is "status@broadcast";
export declare function isJidBroadcast(jid: string): boolean;
export declare function isJidMetaAI(jid: string): boolean;
export declare function isLidUser(jid: string): boolean;
export declare function isNullJid(jid: string): boolean;
export declare function isPnUser(jid: string): boolean;
export declare function normalizeJid(jid: string): string;
export declare function toJID(chatId: any): any;
export interface IgnoreJidConfig {
    dm?: boolean;
    status: boolean;
    groups: boolean;
    channels: boolean;
    broadcast: boolean;
}
export declare class JidFilter {
    ignore: IgnoreJidConfig;
    constructor(ignore: IgnoreJidConfig);
    include(jid: string): boolean;
}
export interface Jids {
    lid?: string;
    pn?: string;
}
export declare function jidsFromKey(key: WAMessageKey): Jids | null;
export declare function toCusFormat(remoteJid: any): any;
