import { SessionManager } from '@waha/core/abc/manager.abc';
import { VideoFileDTO, VoiceFileDTO } from '@waha/structures/media.dto';
import { WhatsappSession } from '../core/abc/session.abc';
declare class MediaController {
    private manager;
    constructor(manager: SessionManager);
    convertVoice(session: WhatsappSession, file: VoiceFileDTO): Promise<Buffer>;
    convertVideo(session: WhatsappSession, file: VideoFileDTO): Promise<Buffer>;
    private buffer;
}
export { MediaController };
