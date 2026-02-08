import { WhatsappSession } from '@waha/core/abc/session.abc';
import { SessionManager } from '../core/abc/manager.abc';
import { EventMessageRequest } from '../structures/events.dto';
import { WAMessage } from '../structures/responses.dto';
export declare class EventsController {
    private manager;
    constructor(manager: SessionManager);
    sendEvent(session: WhatsappSession, request: EventMessageRequest): Promise<WAMessage>;
}
