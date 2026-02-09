import { AppsController } from '@waha/apps/app_sdk/api/apps.controller';
import { AppsEnabledService } from '@waha/apps/app_sdk/services/AppsEnabledService';
export declare const AppsEnabled: {
    imports: any[];
    controllers: (typeof AppsController)[];
    providers: {
        provide: symbol;
        useClass: typeof AppsEnabledService;
    }[];
};
