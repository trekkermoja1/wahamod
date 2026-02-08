import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
export declare class SwaggerConfigServiceCore {
    protected configService: ConfigService;
    protected logger: PinoLogger;
    constructor(configService: ConfigService, logger: PinoLogger);
    get advancedConfigEnabled(): boolean;
    get enabled(): boolean;
    get credentials(): [string, string] | undefined;
    get title(): any;
    get description(): any;
    get externalDocUrl(): any;
}
