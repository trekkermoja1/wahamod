import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { WAHAChatPresences, WAHASessionPresence } from '../structures/presence.dto';
export declare class PresenceController {
    private manager;
    constructor(manager: SessionManager);
    setPresence(session: WhatsappSession, request: WAHASessionPresence): Promise<void>;
    getPresenceAll(session: WhatsappSession): Promise<WAHAChatPresences[]>;
    getPresence(session: WhatsappSession, chatId: string): Promise<WAHAChatPresences>;
    subscribe(session: WhatsappSession, chatId: string): Promise<void>;
}
