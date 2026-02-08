import { MessageDestination } from '@waha/structures/chatting.dto';
import { WAMessageBase } from '@waha/structures/responses.dto';
export declare class EventLocation {
    name: string;
}
export declare class EventMessage {
    name: string;
    description?: string;
    startTime: number;
    endTime?: number;
    location?: EventLocation;
    extraGuestsAllowed?: boolean;
}
export declare class EventMessageRequest {
    chatId: string;
    event: EventMessage;
    reply_to?: string;
}
export declare class EventCancelRequest {
    id: string;
}
export declare enum EventResponseType {
    UNKNOWN = "UNKNOWN",
    GOING = "GOING",
    NOT_GOING = "NOT_GOING",
    MAYBE = "MAYBE"
}
export declare class EventResponse {
    response: EventResponseType;
    timestampMs: number;
    extraGuestCount: number;
}
export declare class EventResponsePayload extends WAMessageBase {
    eventCreationKey: MessageDestination;
    eventResponse?: EventResponse;
    _data?: any;
}
