import { PaginationParams } from './pagination.dto';
export declare class Participant {
    id: string;
}
export declare class SettingsSecurityChangeInfo {
    adminsOnly: boolean;
}
export declare class ParticipantsRequest {
    participants: Array<Participant>;
}
export declare class DescriptionRequest {
    description: string;
}
export declare class SubjectRequest {
    subject: string;
}
export declare class CreateGroupRequest {
    name: string;
    participants: Array<Participant>;
}
export declare class JoinGroupRequest {
    code: string;
}
export declare class JoinGroupResponse {
    id: string;
}
export declare enum GroupField {
    NONE = "",
    PARTICIPANTS = "participants"
}
export declare class GroupsListFields {
    exclude: string[];
}
export declare enum GroupSortField {
    ID = "id",
    SUBJECT = "subject"
}
export declare class GroupsPaginationParams extends PaginationParams {
    sortBy?: string;
}
export declare enum GroupParticipantRole {
    LEFT = "left",
    PARTICIPANT = "participant",
    ADMIN = "admin",
    SUPERADMIN = "superadmin"
}
export declare class GroupParticipant {
    id: string;
    pn?: string;
    role: GroupParticipantRole;
}
export declare class GroupId {
    id: string;
}
export declare class GroupInfo {
    id: string;
    subject: string;
    description: string;
    participants: GroupParticipant[];
    invite?: string;
    membersCanAddNewMember: boolean;
    membersCanSendMessages: boolean;
    newMembersApprovalRequired: boolean;
}
