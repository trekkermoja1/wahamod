import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { QRCodeQuery, QRCodeValue, RequestCodeRequest } from '../structures/auth.dto';
declare class AuthController {
    private manager;
    constructor(manager: SessionManager);
    getQR(session: WhatsappSession, query: QRCodeQuery): Promise<Buffer | QRCodeValue>;
    requestCode(session: WhatsappSession, request: RequestCodeRequest): void;
}
export { AuthController };
