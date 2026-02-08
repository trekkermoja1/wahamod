import { ConfigService } from '@nestjs/config';
import { WAHAEngine } from '../../structures/enums.dto';
export declare class EngineConfigService {
    protected configService: ConfigService;
    private logger;
    constructor(configService: ConfigService);
    getDefaultEngineName(): WAHAEngine;
    get shouldPrintQR(): boolean;
}
