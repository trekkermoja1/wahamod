import { WhatsappSession } from '@waha/core/abc/session.abc';
import { SessionManager } from './core/abc/manager.abc';
import { Result } from './structures/base.dto';
import { ContactUpdateBody } from './structures/contacts.dto';
export declare class ContactsSessionController {
    private manager;
    constructor(manager: SessionManager);
    put(session: WhatsappSession, chatId: string, body: ContactUpdateBody): Promise<Result>;
}
