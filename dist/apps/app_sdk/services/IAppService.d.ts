import { App } from '@waha/apps/app_sdk/dto/app.dto';
import { WhatsappSession } from '@waha/core/abc/session.abc';
export interface IAppService {
    validate(app: App): void;
    beforeCreated(app: App): Promise<void>;
    beforeEnabled(savedApp: App, newApp: App): Promise<void>;
    beforeDisabled(savedApp: App, newApp: App): Promise<void>;
    beforeUpdated(savedApp: App, newApp: App): Promise<void>;
    beforeDeleted(app: App): Promise<void>;
    beforeSessionStart(app: App, session: WhatsappSession): void;
    afterSessionStart(app: App, session: WhatsappSession): void;
}
