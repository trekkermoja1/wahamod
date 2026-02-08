import { WhatsappSession } from '@waha/core/abc/session.abc';
import { CountResponse } from '@waha/structures/base.dto';
import { LidsListQueryParams, LidToPhoneNumber } from '@waha/structures/lids.dto';
import { SessionManager } from '../core/abc/manager.abc';
export declare class LidsController {
    private manager;
    constructor(manager: SessionManager);
    getAll(session: WhatsappSession, params: LidsListQueryParams): Promise<Array<LidToPhoneNumber>>;
    getLidsCount(session: WhatsappSession): Promise<CountResponse>;
    findPNByLid(session: WhatsappSession, lid: string): Promise<LidToPhoneNumber>;
    findLIDByPhoneNumber(session: WhatsappSession, phoneNumber: string): Promise<LidToPhoneNumber>;
}
