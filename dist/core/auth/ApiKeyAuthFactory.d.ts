import { LoggerService } from '@nestjs/common';
import { WhatsappConfigService } from '@waha/config.service';
import { IApiKeyAuth } from '@waha/core/auth/auth';
export declare function ApiKeyAuthFactory(config: WhatsappConfigService, logger: LoggerService): IApiKeyAuth;
