import { IApiKeyAuth } from '@waha/core/auth/auth';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
declare const ApiKeyStrategy_base: new (header: {
    header: string;
    prefix: string;
}, passReqToCallback: boolean) => HeaderAPIKeyStrategy & {
    validate(...args: any[]): unknown;
};
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private auth;
    constructor(auth: IApiKeyAuth);
    validate(apikey: string, done: (result: boolean) => void): void;
}
export {};
