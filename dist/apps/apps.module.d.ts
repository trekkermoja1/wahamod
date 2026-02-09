export declare const AppsModuleExports: {
    imports: (import("@nestjs/common").DynamicModule | typeof import("../modules/rmutex").RMutexModule)[];
    controllers: typeof import("./app_sdk/api/apps.controller").AppsController[];
    providers: {
        provide: symbol;
        useClass: typeof import("./app_sdk/services/AppsEnabledService").AppsEnabledService;
    }[];
} | {
    providers: {
        provide: symbol;
        useClass: typeof import("./app_sdk/services/AppsDisabledService").AppsDisabledService;
    }[];
    imports: any[];
    controllers: (typeof import("./app_sdk/api/apps.controller").AppsController | typeof import("./chatwoot/api/chatwoot.locales.controller").ChatwootLocalesController)[];
};
