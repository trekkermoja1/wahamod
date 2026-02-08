import { CountResponse, Result } from '@waha/structures/base.dto';
import { ChatPictureQuery, ChatPictureResponse } from '@waha/structures/chats.dto';
import { ProfilePictureRequest } from '@waha/structures/profile.dto';
import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
import { CreateGroupRequest, DescriptionRequest, GroupParticipant, GroupsListFields, GroupsPaginationParams, JoinGroupRequest, JoinGroupResponse, ParticipantsRequest, SettingsSecurityChangeInfo, SubjectRequest } from '../structures/groups.dto';
export declare class GroupsController {
    private manager;
    constructor(manager: SessionManager);
    createGroup(session: WhatsappSession, request: CreateGroupRequest): void;
    joinInfoGroup(session: WhatsappSession, query: JoinGroupRequest): Promise<any>;
    joinGroup(session: WhatsappSession, request: JoinGroupRequest): Promise<JoinGroupResponse>;
    getGroups(session: WhatsappSession, pagination: GroupsPaginationParams, fields: GroupsListFields): Promise<any>;
    getGroupsCount(session: WhatsappSession): Promise<CountResponse>;
    refreshGroups(session: WhatsappSession): Promise<{
        success: boolean;
    }>;
    getGroup(session: WhatsappSession, id: string): void;
    deleteGroup(session: WhatsappSession, id: string): void;
    leaveGroup(session: WhatsappSession, id: string): void;
    getChatPicture(session: WhatsappSession, id: string, query: ChatPictureQuery): Promise<ChatPictureResponse>;
    setPicture(id: string, session: WhatsappSession, request: ProfilePictureRequest): Promise<Result>;
    deletePicture(id: string, session: WhatsappSession): Promise<Result>;
    setDescription(session: WhatsappSession, id: string, request: DescriptionRequest): void;
    setSubject(session: WhatsappSession, id: string, request: SubjectRequest): void;
    setInfoAdminOnly(session: WhatsappSession, id: string, request: SettingsSecurityChangeInfo): void;
    getInfoAdminOnly(session: WhatsappSession, id: string): Promise<SettingsSecurityChangeInfo>;
    setMessagesAdminOnly(session: WhatsappSession, id: string, request: SettingsSecurityChangeInfo): void;
    getMessagesAdminOnly(session: WhatsappSession, id: string): Promise<SettingsSecurityChangeInfo>;
    getInviteCode(session: WhatsappSession, id: string): Promise<string>;
    revokeInviteCode(session: WhatsappSession, id: string): Promise<string>;
    getParticipants(session: WhatsappSession, id: string): void;
    getGroupParticipants(session: WhatsappSession, id: string): Promise<GroupParticipant[]>;
    addParticipants(session: WhatsappSession, id: string, request: ParticipantsRequest): void;
    removeParticipants(session: WhatsappSession, id: string, request: ParticipantsRequest): void;
    promoteToAdmin(session: WhatsappSession, id: string, request: ParticipantsRequest): void;
    demoteToAdmin(session: WhatsappSession, id: string, request: ParticipantsRequest): void;
}
