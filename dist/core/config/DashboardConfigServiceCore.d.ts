import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
export declare class DashboardConfigServiceCore {
    protected configService: ConfigService;
    protected logger: PinoLogger;
    dashboardUri: string;
    constructor(configService: ConfigService, logger: PinoLogger);
    get enabled(): boolean;
    get credentials(): [string, string] | null;
}
