import { INestApplication, MiddlewareConsumer } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Logger } from 'pino';
import { WhatsappConfigService } from '../config.service';
import { DashboardConfigServiceCore } from './config/DashboardConfigServiceCore';
export declare const IMPORTS_CORE: any[];
export declare const CONTROLLERS: any[];
export declare const PROVIDERS_BASE: Provider[];
export declare class AppModuleCore {
    protected config: WhatsappConfigService;
    private dashboardConfig;
    startTimestamp: number;
    constructor(config: WhatsappConfigService, dashboardConfig: DashboardConfigServiceCore);
    static getHttpsOptions(logger: Logger): {
        key: NonSharedBuffer;
        cert: NonSharedBuffer;
        ca: NonSharedBuffer;
    };
    static appReady(app: INestApplication, logger: Logger): void;
    configure(consumer: MiddlewareConsumer): void;
}
