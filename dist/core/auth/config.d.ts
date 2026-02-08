export interface SValue {
    param: string;
    value: string | null;
    generated: boolean;
}
export declare function rand(): string;
interface UserPassword {
    username: SValue;
    password: SValue;
}
export declare class AuthConfig {
    key: SValue;
    keyplain: SValue;
    dashboard: UserPassword;
    swagger: UserPassword;
    constructor();
    private getDashboard;
    private getSwagger;
}
export declare const Auth: AuthConfig;
export declare function ReportGeneratedValue(): void;
export {};
