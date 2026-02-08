import { WebjsClientCore } from '@waha/core/engines/webjs/WebjsClientCore';
import { GroupParticipant } from '@waha/structures/groups.dto';
import { GroupV2JoinEvent, GroupV2LeaveEvent, GroupV2ParticipantsEvent, GroupV2UpdateEvent } from '@waha/structures/groups.events.dto';
import { GroupNotification, GroupParticipant as WEBJSGroupParticipant } from 'whatsapp-web.js';
export declare function ToGroupV2JoinEvent(client: WebjsClientCore, me: string, notification: GroupNotification): Promise<GroupV2JoinEvent | null>;
export declare function getParticipants(participants: WEBJSGroupParticipant[]): GroupParticipant[];
export declare function ToGroupV2LeaveEvent(me: string, notification: GroupNotification): GroupV2LeaveEvent | null;
export declare function ToGroupV2UpdateEvent(client: WebjsClientCore, notification: GroupNotification): Promise<GroupV2UpdateEvent>;
export declare function ToGroupV2ParticipantsEvent(notification: GroupNotification): GroupV2ParticipantsEvent | null;
