import { LimitOffsetParams } from '@waha/structures/pagination.dto';
export declare class LidToPhoneNumber {
    lid?: string;
    pn?: string;
}
export declare class LidsListQueryParams extends LimitOffsetParams {
    limit?: number;
    offset?: number;
}
