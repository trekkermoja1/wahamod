import { SessionConfig } from '@waha/structures/sessions.dto';
export declare class SessionStartDeprecatedRequest {
    name: string;
    config?: SessionConfig;
}
export declare class SessionStopDeprecatedRequest {
    name: string;
    logout: boolean | undefined;
}
export declare class SessionLogoutDeprecatedRequest {
    name: string;
}
