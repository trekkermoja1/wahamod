import { App } from '@waha/apps/app_sdk/dto/app.dto';
import { IAppService } from '@waha/apps/app_sdk/services/IAppService';
import { CallsAppConfig } from '@waha/apps/calls/dto/config.dto';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { PinoLogger } from 'nestjs-pino';
export declare class CallsAppService implements IAppService {
    private readonly logger;
    constructor(logger: PinoLogger);
    validate(app: App<CallsAppConfig>): void;
    beforeCreated(app: App<CallsAppConfig>): Promise<void>;
    beforeEnabled(savedApp: App<CallsAppConfig>, newApp: App<CallsAppConfig>): Promise<void>;
    beforeDisabled(savedApp: App<CallsAppConfig>, newApp: App<CallsAppConfig>): Promise<void>;
    beforeUpdated(savedApp: App<CallsAppConfig>, newApp: App<CallsAppConfig>): Promise<void>;
    beforeDeleted(app: App<CallsAppConfig>): Promise<void>;
    beforeSessionStart(app: App<CallsAppConfig>, session: WhatsappSession): void;
    afterSessionStart(app: App<CallsAppConfig>, session: WhatsappSession): void;
}
