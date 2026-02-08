"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToGroupV2JoinEvent = ToGroupV2JoinEvent;
exports.ToGroupV2LeaveEvent = ToGroupV2LeaveEvent;
exports.ToGroupV2UpdateEvent = ToGroupV2UpdateEvent;
exports.ToGroupV2ParticipantsEvents = ToGroupV2ParticipantsEvents;
exports.ToGroupParticipants = ToGroupParticipants;
const jids_1 = require("../../utils/jids");
const groups_dto_1 = require("../../../structures/groups.dto");
const groups_events_dto_1 = require("../../../structures/groups.events.dto");
function ToGroupV2JoinEvent(event) {
    return {
        timestamp: Date.now(),
        group: ToGroupInfo(event),
        _data: event,
    };
}
function ToGroupV2LeaveEvent(me, event) {
    if (!event.Leave || event.Leave.length === 0) {
        return null;
    }
    if (!(me === null || me === void 0 ? void 0 : me.id)) {
        return null;
    }
    const jid = (0, jids_1.toJID)(me.id);
    const left = event.Leave;
    if (!left.includes(jid)) {
        return null;
    }
    return {
        timestamp: Date.now(),
        group: {
            id: event.JID,
        },
        _data: event,
    };
}
function ToGroupV2UpdateEvent(event) {
    const group = ToGroupInfoPartial(event);
    if (!group) {
        return null;
    }
    return {
        timestamp: Date.now(),
        group: group,
        _data: event,
    };
}
function ToGroupV2ParticipantsEvents(event) {
    const id = {
        id: event.JID,
    };
    const events = [];
    const maps = [
        { participants: event.Leave, type: groups_events_dto_1.GroupParticipantType.LEAVE },
        { participants: event.Join, type: groups_events_dto_1.GroupParticipantType.JOIN },
        { participants: event.Promote, type: groups_events_dto_1.GroupParticipantType.PROMOTE },
        { participants: event.Demote, type: groups_events_dto_1.GroupParticipantType.DEMOTE },
    ];
    for (const map of maps) {
        const participants = getParticipants(map.participants, map.type);
        if (participants) {
            events.push({
                group: id,
                type: map.type,
                timestamp: Date.now(),
                participants: participants,
                _data: event,
            });
        }
    }
    return events;
}
function getParticipants(jids, type) {
    if (!jids) {
        return;
    }
    let role;
    switch (type) {
        case groups_events_dto_1.GroupParticipantType.JOIN:
            role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
            break;
        case groups_events_dto_1.GroupParticipantType.LEAVE:
            role = groups_dto_1.GroupParticipantRole.LEFT;
            break;
        case groups_events_dto_1.GroupParticipantType.PROMOTE:
            role = groups_dto_1.GroupParticipantRole.ADMIN;
            break;
        case groups_events_dto_1.GroupParticipantType.DEMOTE:
            role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
            break;
    }
    const participants = [];
    for (const jid of jids) {
        participants.push({
            id: (0, jids_1.toCusFormat)(jid),
            role: role,
        });
    }
    return participants;
}
function ToGroupInfo(group) {
    const participants = ToGroupParticipants(group.Participants);
    return {
        id: group.JID,
        subject: group.Name,
        description: group.Topic,
        invite: undefined,
        participants: participants,
        membersCanAddNewMember: group.MemberAddMode === 'all_member_add',
        membersCanSendMessages: !!group.IsAnnounce,
        newMembersApprovalRequired: group.IsJoinApprovalRequired,
    };
}
function ToGroupInfoPartial(group) {
    var _a, _b, _c, _d;
    const announce = (_a = group.Announce) === null || _a === void 0 ? void 0 : _a.IsAnnounce;
    let membersCanSendMessages;
    if (announce === undefined) {
        membersCanSendMessages = undefined;
    }
    else {
        membersCanSendMessages = !announce;
    }
    const info = {
        id: group.JID,
        subject: (_b = group.Name) === null || _b === void 0 ? void 0 : _b.Name,
        description: (_c = group.Topic) === null || _c === void 0 ? void 0 : _c.Topic,
        invite: group.NewInviteLink || undefined,
        membersCanAddNewMember: undefined,
        membersCanSendMessages: membersCanSendMessages,
        newMembersApprovalRequired: (_d = group.MembershipApprovalMode) === null || _d === void 0 ? void 0 : _d.IsJoinApprovalRequired,
        participants: undefined,
    };
    for (const key in info) {
        if (key !== 'id' && info[key] !== undefined) {
            return info;
        }
    }
    return null;
}
function ToGroupParticipants(participants) {
    const result = [];
    for (const participant of participants) {
        let role;
        if (participant.IsSuperAdmin) {
            role = groups_dto_1.GroupParticipantRole.SUPERADMIN;
        }
        else if (participant.IsAdmin) {
            role = groups_dto_1.GroupParticipantRole.ADMIN;
        }
        else {
            role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
        }
        result.push({
            id: (0, jids_1.toCusFormat)(participant.JID),
            pn: (0, jids_1.toCusFormat)(participant.PhoneNumber),
            role: role,
        });
    }
    return result;
}
//# sourceMappingURL=groups.gows.js.map