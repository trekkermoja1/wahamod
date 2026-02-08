import { ConfigService } from '@nestjs/config';
import { WhatsappConfigService } from '@waha/config.service';
import { BootstrapConfig } from '@waha/core/engines/gows/GowsBootstrap';
import { GowsConfig } from '@waha/core/engines/gows/session.gows.core';
export declare class GowsEngineConfigService {
    protected configService: ConfigService;
    protected whatsappConfigService: WhatsappConfigService;
    constructor(configService: ConfigService, whatsappConfigService: WhatsappConfigService);
    getBootstrapConfig(): BootstrapConfig;
    getSocket(): any;
    getConfig(): GowsConfig;
}
