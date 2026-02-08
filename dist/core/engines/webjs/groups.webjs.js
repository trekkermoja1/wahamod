"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToGroupV2JoinEvent = ToGroupV2JoinEvent;
exports.getParticipants = getParticipants;
exports.ToGroupV2LeaveEvent = ToGroupV2LeaveEvent;
exports.ToGroupV2UpdateEvent = ToGroupV2UpdateEvent;
exports.ToGroupV2ParticipantsEvent = ToGroupV2ParticipantsEvent;
const groups_dto_1 = require("../../../structures/groups.dto");
const groups_events_dto_1 = require("../../../structures/groups.events.dto");
const jids_1 = require("../../utils/jids");
function ToGroupInfo(group, invite, participants = []) {
    const groupMetadata = group.groupMetadata;
    const info = {
        id: group.id._serialized,
        subject: group.name,
        description: group.description,
        invite: invite,
        membersCanAddNewMember: groupMetadata.restrict,
        membersCanSendMessages: groupMetadata.announce,
        newMembersApprovalRequired: groupMetadata.membershipApprovalMode,
        participants: participants,
    };
    return info;
}
async function ToGroupV2JoinEvent(client, me, notification) {
    if (!notification.recipientIds.includes(me)) {
        return null;
    }
    const group = await client.getChatById(notification.id.remote);
    const invite = await group.getInviteCode();
    const participants = getParticipants(group.participants);
    const info = ToGroupInfo(group, invite, participants);
    return {
        timestamp: notification.timestamp,
        group: info,
        _data: notification,
    };
}
function getParticipants(participants) {
    return participants.map((participant) => {
        let role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
        if (participant.isSuperAdmin) {
            role = groups_dto_1.GroupParticipantRole.SUPERADMIN;
        }
        else if (participant.isAdmin) {
            role = groups_dto_1.GroupParticipantRole.ADMIN;
        }
        return {
            id: participant.id._serialized,
            pn: (0, jids_1.isPnUser)(participant.id._serialized)
                ? participant.id._serialized
                : null,
            role: role,
        };
    });
}
function ToGroupV2LeaveEvent(me, notification) {
    if (!notification.recipientIds.includes(me)) {
        return null;
    }
    const group = {
        id: notification.id.remote,
    };
    return {
        timestamp: notification.timestamp,
        group: group,
        _data: notification,
    };
}
async function ToGroupV2UpdateEvent(client, notification) {
    const group = await client.getChatById(notification.id.remote);
    const invite = await group.getInviteCode();
    const info = ToGroupInfo(group, invite, undefined);
    return {
        group: info,
        timestamp: notification.timestamp,
        _data: notification,
    };
}
function ToGroupV2ParticipantsEvent(notification) {
    let type;
    let role;
    if (['add', 'invite', 'linked_group_join'].includes(notification.type)) {
        type = groups_events_dto_1.GroupParticipantType.JOIN;
        role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
    }
    else if (['remove', 'leave'].includes(notification.type)) {
        type = groups_events_dto_1.GroupParticipantType.LEAVE;
        role = groups_dto_1.GroupParticipantRole.LEFT;
    }
    else if (['promote'].includes(notification.type)) {
        type = groups_events_dto_1.GroupParticipantType.PROMOTE;
        role = groups_dto_1.GroupParticipantRole.ADMIN;
    }
    else if (['demote'].includes(notification.type)) {
        type = groups_events_dto_1.GroupParticipantType.DEMOTE;
        role = groups_dto_1.GroupParticipantRole.PARTICIPANT;
    }
    else {
        return null;
    }
    const participants = notification.recipientIds.map((id) => {
        return {
            id: id,
            role: role,
        };
    });
    const group = {
        id: notification.id.remote,
    };
    return {
        group: group,
        type: type,
        timestamp: notification.timestamp,
        participants: participants,
        _data: notification,
    };
}
//# sourceMappingURL=groups.webjs.js.map