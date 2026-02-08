import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { RejectCallRequest } from '../structures/calls.dto';
export declare class CallsController {
    private manager;
    constructor(manager: SessionManager);
    rejectCall(session: WhatsappSession, request: RejectCallRequest): Promise<void>;
}
