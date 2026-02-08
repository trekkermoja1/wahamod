import { ConfigService } from '@nestjs/config';
import { WebJSConfig } from '../../core/engines/webjs/session.webjs.core';
export declare class WebJSEngineConfigService {
    protected configService: ConfigService;
    constructor(configService: ConfigService);
    getConfig(): WebJSConfig;
    getCacheType(): 'local' | 'none';
    getPuppeterArgs(): string[];
}
