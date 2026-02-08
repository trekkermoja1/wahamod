import { UnprocessableEntityException } from '@nestjs/common';
import { IAppsService } from '@waha/apps/app_sdk/services/IAppsService';
import { ChatWootAppService } from '@waha/apps/chatwoot/services/ChatWootAppService';
import { CallsAppService } from '@waha/apps/calls/services/CallsAppService';
import { DataStore } from '@waha/core/abc/DataStore';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { Knex } from 'knex';
import { PinoLogger } from 'nestjs-pino';
import { App } from '../dto/app.dto';
export declare class AppDisableError extends UnprocessableEntityException {
    constructor(app: string);
}
export declare class AppsEnabledService implements IAppsService {
    protected logger: PinoLogger;
    protected readonly chatwootService: ChatWootAppService;
    protected readonly callsAppService: CallsAppService;
    constructor(logger: PinoLogger, chatwootService: ChatWootAppService, callsAppService: CallsAppService);
    list(manager: SessionManager, session: string): Promise<App[]>;
    create(manager: SessionManager, app: App): Promise<App>;
    get(manager: SessionManager, appId: string): Promise<App>;
    upsert(manager: SessionManager, app: App): Promise<App<any>>;
    update(manager: SessionManager, app: App, upsert?: boolean): Promise<App>;
    delete(manager: SessionManager, appId: string): Promise<App>;
    removeBySession(manager: SessionManager, session: string): Promise<void>;
    beforeSessionStart(session: WhatsappSession, store: DataStore): Promise<void>;
    afterSessionStart(session: WhatsappSession, store: DataStore): Promise<void>;
    syncSessionApps(manager: SessionManager, session: string, apps: App[]): Promise<void>;
    migrate(knex: Knex): Promise<void>;
    private getAppService;
    private checkSessionExists;
}
