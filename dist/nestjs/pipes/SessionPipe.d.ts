import { PipeTransform } from '@nestjs/common';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { WAHASessionStatus } from '@waha/structures/enums.dto';
export declare class SessionPipe implements PipeTransform<WhatsappSession> {
    private manager;
    constructor(manager: SessionManager);
    transform(value: any): Promise<WhatsappSession>;
}
declare class StatusSessionPipe implements PipeTransform<WhatsappSession> {
    private manager;
    STATUSES: WAHASessionStatus[];
    constructor(manager: SessionManager);
    transform(value: any): Promise<WhatsappSession>;
}
export declare class WorkingSessionPipe extends StatusSessionPipe {
    STATUSES: WAHASessionStatus[];
}
export declare class QRCodeSessionPipe extends StatusSessionPipe {
    STATUSES: WAHASessionStatus[];
}
export {};
