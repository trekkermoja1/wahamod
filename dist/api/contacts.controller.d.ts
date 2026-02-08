import { SessionManager } from '../core/abc/manager.abc';
import { SessionQuery } from '../structures/base.dto';
import { CheckNumberStatusQuery, WANumberExistResult } from '../structures/chatting.dto';
import { ContactProfilePictureQuery, ContactQuery, ContactRequest, ContactsPaginationParams } from '../structures/contacts.dto';
export declare class ContactsController {
    private manager;
    constructor(manager: SessionManager);
    getAll(query: SessionQuery, pagination: ContactsPaginationParams): Promise<void>;
    get(query: ContactQuery): Promise<void>;
    checkExists(request: CheckNumberStatusQuery): Promise<WANumberExistResult>;
    getAbout(query: ContactQuery): Promise<{
        about: string;
    }>;
    getProfilePicture(query: ContactProfilePictureQuery): Promise<{
        profilePictureURL: string;
    }>;
    block(request: ContactRequest): Promise<void>;
    unblock(request: ContactRequest): Promise<void>;
}
