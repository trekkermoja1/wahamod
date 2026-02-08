type JID = string;
interface GroupName {
    Name: string;
    NameSetAt: string;
    NameSetBy: JID;
}
interface GroupTopic {
    Topic: string;
    TopicID: string;
    TopicSetAt: string;
    TopicSetBy: JID;
    TopicDeleted: boolean;
}
interface GroupLocked {
    IsLocked: boolean;
}
interface GroupAnnounce {
    IsAnnounce: boolean;
    AnnounceVersionID: string;
}
interface GroupEphemeral {
    IsEphemeral: boolean;
    DisappearingTimer: number;
}
interface GroupMembershipApprovalMode {
    IsJoinApprovalRequired: boolean;
}
interface GroupDelete {
    Deleted: boolean;
    DeleteReason: string;
}
interface GroupLinkTarget {
    JID: JID;
    GroupName: GroupName;
    GroupIsDefaultSub: GroupIsDefaultSub;
}
interface GroupLinkChange {
    Type: string;
    UnlinkReason: string;
    Group: GroupLinkTarget;
}
interface GroupIsDefaultSub {
    IsDefaultSubGroup: boolean;
}
export interface GroupInfoEvent {
    JID: JID;
    Notify: string;
    Sender?: JID;
    Timestamp: string;
    Name?: GroupName;
    Topic?: GroupTopic;
    Locked?: GroupLocked;
    Announce?: GroupAnnounce;
    Ephemeral?: GroupEphemeral;
    MembershipApprovalMode?: GroupMembershipApprovalMode;
    Delete?: GroupDelete;
    Link?: GroupLinkChange;
    Unlink?: GroupLinkChange;
    NewInviteLink?: string;
    PrevParticipantVersionID: string;
    ParticipantVersionID: string;
    JoinReason: string;
    Join: JID[];
    Leave: JID[];
    Promote: JID[];
    Demote: JID[];
}
export interface GOWSGroupParticipant {
    JID: JID;
    PhoneNumber: JID;
    IsAdmin: boolean;
    IsSuperAdmin: boolean;
}
export interface GroupInfoFull {
    JID: JID;
    OwnerJID: JID;
    Name: string;
    Topic: string;
    IsLocked: boolean;
    IsAnnounce: boolean;
    Participants: GOWSGroupParticipant[];
    MemberAddMode: string;
    IsJoinApprovalRequired: boolean;
}
export interface JoinedGroupEvent extends GroupInfoFull {
    Reason: string;
    Type: string;
}
export {};
