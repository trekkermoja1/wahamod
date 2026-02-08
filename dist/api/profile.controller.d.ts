import { SessionManager } from '@waha/core/abc/manager.abc';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { Result } from '@waha/structures/base.dto';
import { MyProfile, ProfileNameRequest, ProfilePictureRequest, ProfileStatusRequest } from '@waha/structures/profile.dto';
export declare class ProfileController {
    private manager;
    constructor(manager: SessionManager);
    getMyProfile(session: WhatsappSession): Promise<MyProfile>;
    setProfileName(session: WhatsappSession, request: ProfileNameRequest): Promise<Result>;
    setProfileStatus(session: WhatsappSession, request: ProfileStatusRequest): Promise<Result>;
    setProfilePicture(session: WhatsappSession, request: ProfilePictureRequest): Promise<Result>;
    deleteProfilePicture(session: WhatsappSession): Promise<Result>;
}
