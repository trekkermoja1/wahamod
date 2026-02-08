import { NewMessageIDResponse } from '@waha/structures/chatting.dto';
import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { DeleteStatusRequest, ImageStatus, TextStatus, VideoStatus, VoiceStatus } from '../structures/status.dto';
declare class StatusController {
    private manager;
    constructor(manager: SessionManager);
    sendTextStatus(session: WhatsappSession, status: TextStatus): void;
    sendImageStatus(session: WhatsappSession, status: ImageStatus): void;
    sendVoiceStatus(session: WhatsappSession, status: VoiceStatus): void;
    sendVideoStatus(session: WhatsappSession, status: VideoStatus): void;
    deleteStatus(session: WhatsappSession, status: DeleteStatusRequest): void;
    getNewMessageId(session: WhatsappSession): Promise<NewMessageIDResponse>;
}
export { StatusController };
