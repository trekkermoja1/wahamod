import { GowsAuth } from '@waha/core/engines/gows/store/GowsAuth';
export declare class GowsAuthSimple implements GowsAuth {
    private _address;
    private _dialect;
    constructor(address: string, dialect: string);
    address(): string;
    dialect(): string;
}
