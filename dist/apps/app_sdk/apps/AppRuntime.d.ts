import { AppEnv } from '@waha/apps/app_sdk/env';
import { AppDefinition } from '@waha/apps/app_sdk/apps/definition';
import { AppName } from '@waha/apps/app_sdk/apps/name';
declare class AppRuntimeConfigC {
    private apps;
    private constructor();
    static FromEnv(env: typeof AppEnv): AppRuntimeConfigC;
    Enabled(): boolean;
    GetApps(): AppDefinition[];
    GetAppsWithMigration(): AppDefinition[];
    GetAppsRequiringPlainKey(): AppDefinition[];
    GetAppsRequiringQueue(): AppDefinition[];
    HasApp(name: AppName): boolean;
    HasAppsRequiringPlainKey(): boolean;
    HasAppsRequiringQueue(): boolean;
}
export declare const AppRuntimeConfig: AppRuntimeConfigC;
export {};
