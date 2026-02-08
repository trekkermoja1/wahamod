import { IAppsService } from '@waha/apps/app_sdk/services/IAppsService';
import { DataStore } from '@waha/core/abc/DataStore';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { Knex } from 'knex';
import { App } from '../dto/app.dto';
export declare class AppsDisabledService implements IAppsService {
    list(manager: SessionManager, session: string): Promise<App[]>;
    get(manager: SessionManager, appId: string): Promise<App>;
    create(manager: SessionManager, app: App): Promise<App>;
    upsert(manager: SessionManager, app: App): Promise<App>;
    update(manager: SessionManager, app: App): Promise<App>;
    delete(manager: SessionManager, appId: string): Promise<App>;
    removeBySession(manager: SessionManager, session: string): Promise<void>;
    migrate(knex: Knex<any, any[]>): Promise<void>;
    beforeSessionStart(session: WhatsappSession, store: DataStore): Promise<void>;
    afterSessionStart(session: WhatsappSession, store: DataStore): Promise<void>;
    syncSessionApps(manager: SessionManager, sessionName: string, apps?: App[] | null): Promise<void>;
}
