import { IAppsService } from '@waha/apps/app_sdk/services/IAppsService';
import { SessionLogoutDeprecatedRequest, SessionStartDeprecatedRequest, SessionStopDeprecatedRequest } from '@waha/structures/sessions.deprecated.dto';
import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { ListSessionsQuery, MeInfo, SessionInfoQuery, SessionCreateRequest, SessionDTO, SessionInfo, SessionUpdateRequest } from '../structures/sessions.dto';
declare class SessionsController {
    private manager;
    private appsService;
    constructor(manager: SessionManager, appsService: IAppsService);
    private withLock;
    list(query: ListSessionsQuery): Promise<SessionInfo[]>;
    get(name: string, query: SessionInfoQuery): Promise<SessionInfo>;
    getMe(session: WhatsappSession): MeInfo | null;
    create(request: SessionCreateRequest): Promise<SessionDTO>;
    update(name: string, request: SessionUpdateRequest): Promise<SessionDTO>;
    delete(name: string): Promise<void>;
    start(name: string): Promise<SessionDTO>;
    stop(name: string): Promise<SessionDTO>;
    logout(name: string): Promise<SessionDTO>;
    restart(name: string): Promise<SessionDTO>;
    DEPRACATED_start(request: SessionStartDeprecatedRequest): Promise<SessionDTO>;
    DEPRECATED_stop(request: SessionStopDeprecatedRequest): Promise<void>;
    DEPRECATED_logout(request: SessionLogoutDeprecatedRequest): Promise<void>;
}
export { SessionsController };
