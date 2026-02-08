"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToGroupInfo = ToGroupInfo;
exports.ToGroupV2JoinEvent = ToGroupV2JoinEvent;
exports.ToGroupParticipant = ToGroupParticipant;
exports.ToGroupV2Participants = ToGroupV2Participants;
exports.ToGroupV2UpdateEvent = ToGroupV2UpdateEvent;
exports.ToGroupV2LeaveEvent = ToGroupV2LeaveEvent;
const session_abc_1 = require("../../abc/session.abc");
const groups_dto_1 = require("../../../structures/groups.dto");
const groups_events_dto_1 = require("../../../structures/groups.events.dto");
const jids_1 = require("../../utils/jids");
const esm_1 = require("../../../vendor/esm");
function ToGroupInfo(group) {
    let participants = undefined;
    if (group.participants && group.participants.length > 0) {
        participants = group.participants.map(ToGroupParticipant);
    }
    return {
        id: group.id,
        subject: group.subject,
        description: group.desc,
        invite: group.inviteCode ? (0, session_abc_1.getGroupInviteLink)(group.inviteCode) : undefined,
        participants: participants,
        membersCanAddNewMember: group.memberAddMode,
        membersCanSendMessages: group.announce,
        newMembersApprovalRequired: group.joinApprovalMode,
    };
}
function ToGroupV2JoinEvent(group) {
    return {
        timestamp: Date.now(),
        group: ToGroupInfo(group),
        _data: group,
    };
}
function ToGroupParticipant(participant) {
    let role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
    if (participant.admin === 'admin') {
        role = groups_dto_1.GroupParticipantRole.ADMIN;
    }
    else if (participant.admin === 'superadmin') {
        role = groups_dto_1.GroupParticipantRole.SUPERADMIN;
    }
    return {
        id: (0, jids_1.toCusFormat)(participant.id),
        pn: (0, jids_1.toCusFormat)(participant.phoneNumber),
        role: role,
    };
}
function ToGroupV2Participants(update) {
    let role;
    let type;
    switch (update.action) {
        case 'add':
            role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
            type = groups_events_dto_1.GroupParticipantType.JOIN;
            break;
        case 'remove':
            role = groups_dto_1.GroupParticipantRole.LEFT;
            type = groups_events_dto_1.GroupParticipantType.LEAVE;
            break;
        case 'promote':
            role = groups_dto_1.GroupParticipantRole.ADMIN;
            type = groups_events_dto_1.GroupParticipantType.PROMOTE;
            break;
        case 'demote':
            role = groups_dto_1.GroupParticipantRole.ADMIN;
            type = groups_events_dto_1.GroupParticipantType.DEMOTE;
            break;
    }
    const participants = update.participants.map((id) => {
        return {
            id: (0, jids_1.toCusFormat)(id),
            role: role,
        };
    });
    return {
        group: {
            id: (0, jids_1.toCusFormat)(update.id),
        },
        type: type,
        timestamp: Date.now(),
        participants: participants,
        _data: update,
    };
}
function ToGroupV2UpdateEvent(group) {
    return {
        timestamp: Date.now(),
        group: ToGroupInfo(group),
        _data: group,
    };
}
function ToGroupV2LeaveEvent(me, update) {
    if (update.action !== 'remove') {
        return null;
    }
    if (!me) {
        return null;
    }
    const meId = esm_1.default.b.jidNormalizedUser(me.id);
    if (!update.participants.includes(meId)) {
        return null;
    }
    return {
        timestamp: Date.now(),
        group: {
            id: (0, jids_1.toCusFormat)(update.id),
        },
        _data: update,
    };
}
//# sourceMappingURL=groups.noweb.js.map