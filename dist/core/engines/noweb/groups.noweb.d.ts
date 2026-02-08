import type { GroupMetadata } from '@adiwajshing/baileys';
import type { Contact } from '@adiwajshing/baileys/lib/Types/Contact';
import type { GroupParticipant as NOWEBGroupParticipant, ParticipantAction } from '@adiwajshing/baileys/lib/Types/GroupMetadata';
import { GroupInfo, GroupParticipant } from '@waha/structures/groups.dto';
import { GroupV2JoinEvent, GroupV2LeaveEvent, GroupV2ParticipantsEvent, GroupV2UpdateEvent } from '@waha/structures/groups.events.dto';
export declare function ToGroupInfo(group: Partial<GroupMetadata>): GroupInfo;
export declare function ToGroupV2JoinEvent(group: GroupMetadata): GroupV2JoinEvent;
export declare function ToGroupParticipant(participant: NOWEBGroupParticipant): GroupParticipant;
interface GroupParticipantUpdate {
    id: string;
    author: string;
    participants: string[];
    action: ParticipantAction;
}
export declare function ToGroupV2Participants(update: GroupParticipantUpdate): GroupV2ParticipantsEvent;
export declare function ToGroupV2UpdateEvent(group: Partial<GroupMetadata>): GroupV2UpdateEvent;
export declare function ToGroupV2LeaveEvent(me: Contact, update: GroupParticipantUpdate): GroupV2LeaveEvent | null;
export {};
