import { LimitOffsetParams } from '@waha/structures/pagination.dto';
export declare class LidToPN {
    id: string;
    pn: string;
}
export interface INowebLidPNRepository {
    saveLids(lids: LidToPN[]): Promise<void>;
    getAllLids(pagination?: LimitOffsetParams): Promise<LidToPN[]>;
    getLidsCount(): Promise<number>;
    findPNByLid(lid: string): Promise<string | null>;
    findLidByPN(pn: string): Promise<string | null>;
}
