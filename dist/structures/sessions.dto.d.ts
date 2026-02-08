import { App } from '@waha/apps/app_sdk/dto/app.dto';
import { WAHAPresenceStatus, WAHASessionStatus } from './enums.dto';
import { WebhookConfig } from './webhooks.config.dto';
export declare enum SessionExpand {
    apps = "apps"
}
export declare class SessionExpandQuery {
    expand?: SessionExpand[];
}
export declare class ListSessionsQuery extends SessionExpandQuery {
    all?: boolean;
}
export declare class SessionInfoQuery extends SessionExpandQuery {
}
export declare class ProxyConfig {
    server: string;
    username?: string;
    password?: string;
}
export declare class NowebStoreConfig {
    enabled: boolean;
    fullSync: boolean;
}
export declare class NowebConfig {
    store?: NowebStoreConfig;
    markOnline: boolean;
}
export declare class WebjsConfig {
    tagsEventsOn?: boolean;
}
export declare class IgnoreConfig {
    status?: boolean;
    groups?: boolean;
    channels?: boolean;
    broadcast?: boolean;
}
export declare class ClientSessionConfig {
    deviceName?: string;
    browserName?: string;
}
export declare class SessionConfig {
    webhooks?: WebhookConfig[];
    metadata?: Record<string, string>;
    proxy?: ProxyConfig;
    debug?: boolean;
    ignore?: IgnoreConfig;
    client?: ClientSessionConfig;
    noweb?: NowebConfig;
    webjs?: WebjsConfig;
}
export declare class SessionDTO {
    name: string;
    status: WAHASessionStatus;
    config?: SessionConfig;
}
export declare class MeInfo {
    id: string;
    lid?: string;
    jid?: string;
    pushName: string;
}
export declare class SessionInfo extends SessionDTO {
    me?: MeInfo;
    assignedWorker?: string;
    presence: WAHAPresenceStatus.ONLINE | WAHAPresenceStatus.OFFLINE | null;
    timestamps: {
        activity: number | null;
    };
    apps?: App[];
}
export declare class SessionDetailedInfo extends SessionInfo {
    engine?: any;
}
export declare class SessionCreateRequest {
    name: string | undefined;
    config?: SessionConfig;
    apps?: App[] | null;
    start?: boolean;
}
export declare class SessionUpdateRequest {
    config?: SessionConfig;
    apps?: App[] | null;
}
