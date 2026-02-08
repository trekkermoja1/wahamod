import { WAHAEvents } from '@waha/structures/enums.dto';
import { GroupV2JoinEvent, GroupV2LeaveEvent, GroupV2ParticipantsEvent, GroupV2UpdateEvent } from '@waha/structures/groups.events.dto';
import { WAHAWebhook } from '@waha/structures/webhooks.dto';
export declare class WebhookGroupV2Join extends WAHAWebhook {
    event: WAHAEvents;
    payload: GroupV2JoinEvent;
}
export declare class WebhookGroupV2Leave extends WAHAWebhook {
    event: WAHAEvents;
    payload: GroupV2LeaveEvent;
}
export declare class WebhookGroupV2Update extends WAHAWebhook {
    event: WAHAEvents;
    payload: GroupV2UpdateEvent;
}
export declare class WebhookGroupV2Participants extends WAHAWebhook {
    event: WAHAEvents;
    payload: GroupV2ParticipantsEvent;
}
