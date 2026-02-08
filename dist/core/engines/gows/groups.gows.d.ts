import { GOWSGroupParticipant, GroupInfoEvent, JoinedGroupEvent } from '@waha/core/engines/gows/types.group';
import { GroupParticipant } from '@waha/structures/groups.dto';
import { GroupV2JoinEvent, GroupV2LeaveEvent, GroupV2ParticipantsEvent, GroupV2UpdateEvent } from '@waha/structures/groups.events.dto';
import { MeInfo } from '@waha/structures/sessions.dto';
export declare function ToGroupV2JoinEvent(event: JoinedGroupEvent): GroupV2JoinEvent;
export declare function ToGroupV2LeaveEvent(me: MeInfo | null, event: GroupInfoEvent): GroupV2LeaveEvent | null;
export declare function ToGroupV2UpdateEvent(event: GroupInfoEvent): GroupV2UpdateEvent | null;
export declare function ToGroupV2ParticipantsEvents(event: GroupInfoEvent): GroupV2ParticipantsEvent[];
export declare function ToGroupParticipants(participants: GOWSGroupParticipant[]): GroupParticipant[];
