import { AppsDisabledService } from '@waha/apps/app_sdk/services/AppsDisabledService';
import { AppsController } from '@waha/apps/app_sdk/api/apps.controller';
import { ChatwootLocalesController } from '@waha/apps/chatwoot/api/chatwoot.locales.controller';
export declare const AppsDisabled: {
    providers: {
        provide: symbol;
        useClass: typeof AppsDisabledService;
    }[];
    imports: any[];
    controllers: (typeof ChatwootLocalesController | typeof AppsController)[];
};
