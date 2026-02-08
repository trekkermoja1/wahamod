import type { proto } from '@adiwajshing/baileys';
import type { BinaryNode } from '@adiwajshing/baileys';
export interface ReceiptEvent {
    key: proto.IMessageKey;
    participant?: string;
    messageIds: string[];
    status: number;
    _node: any;
}
interface Me {
    id: string;
    lid?: string;
}
export declare function jid(field: any): any;
export declare function TagReceiptNodeToReceiptEvent(node: BinaryNode, me: Me): ReceiptEvent[];
export {};
