import { GroupId, GroupInfo, GroupParticipant } from './groups.dto';
export declare class GroupV2JoinEvent {
    timestamp: number;
    group: GroupInfo;
    _data: any;
}
export declare class GroupV2LeaveEvent {
    timestamp: number;
    group: GroupId;
    _data: any;
}
export declare class GroupV2UpdateEvent {
    timestamp: number;
    group: Partial<GroupInfo>;
    _data: any;
}
export declare enum GroupParticipantType {
    JOIN = "join",
    LEAVE = "leave",
    PROMOTE = "promote",
    DEMOTE = "demote"
}
export declare class GroupV2ParticipantsEvent {
    group: GroupId;
    type: GroupParticipantType;
    timestamp: number;
    participants: GroupParticipant[];
    _data: any;
}
