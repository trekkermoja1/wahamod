import { WhatsappConfigService } from '@waha/config.service';
export declare class MediaLocalStorageConfig {
    private config;
    filesUri: string;
    constructor(config: WhatsappConfigService);
    get filesURL(): string;
    get filesFolder(): string;
    get filesLifetime(): number;
}
