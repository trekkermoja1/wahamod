import { AppName } from '@waha/apps/app_sdk/apps/name';
export interface AppDefinition {
    name: AppName;
    plainkey: boolean;
    queue: boolean;
    migrations: boolean;
}
export declare const APPS: Record<AppName, AppDefinition>;
