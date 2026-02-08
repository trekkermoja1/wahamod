import { IAppsService } from '@waha/apps/app_sdk/services/IAppsService';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { App } from '../dto/app.dto';
import { ListAppsQuery } from '../dto/query.dto';
export declare class AppsController {
    private appsService;
    private manager;
    constructor(appsService: IAppsService, manager: SessionManager);
    list(query: ListAppsQuery): Promise<App[]>;
    create(app: App): Promise<App>;
    get(id: string): Promise<App>;
    update(id: string, app: App): Promise<App>;
    delete(id: string): Promise<void>;
}
