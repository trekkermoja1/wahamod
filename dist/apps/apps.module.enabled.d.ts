import { RMutexModule } from '@waha/modules/rmutex';
import { AppsController } from '@waha/apps/app_sdk/api/apps.controller';
import { AppsEnabledService } from '@waha/apps/app_sdk/services/AppsEnabledService';
export declare const AppsEnabled: {
    imports: (import("@nestjs/common").DynamicModule | typeof RMutexModule)[];
    controllers: (typeof AppsController)[];
    providers: {
        provide: symbol;
        useClass: typeof AppsEnabledService;
    }[];
};
