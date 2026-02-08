import { CallData } from '@waha/structures/calls.dto';
import { EventResponsePayload } from '@waha/structures/events.dto';
import { Label, LabelChatAssociation } from '@waha/structures/labels.dto';
import { ChatArchiveEvent } from './chats.dto';
import { MessageDestination } from './chatting.dto';
import { WAHAEngine, WAHAEvents, WAHASessionStatus, WAMessageAck } from './enums.dto';
import { WAHAEnvironment } from './environment.dto';
import { WAHAChatPresences } from './presence.dto';
import { WAMessage, WAMessageReaction } from './responses.dto';
import { MeInfo } from './sessions.dto';
export declare class WAMessageAckBody {
    id: string;
    from: string;
    to: string;
    participant: string;
    fromMe: boolean;
    ack: WAMessageAck;
    ackName: string;
    _data?: any;
}
export declare class WAGroupPayload {
    id: any;
    timestamp: number;
    chatId: string;
    author: string;
    body: string;
    recipientIds: string[];
}
export declare class PollVote extends MessageDestination {
    selectedOptions: string[];
    timestamp: number;
}
export declare class PollVotePayload {
    vote: PollVote;
    poll: MessageDestination;
    _data?: any;
}
export declare class WAMessageRevokedBody {
    after?: WAMessage;
    before?: WAMessage;
    revokedMessageId?: string;
    _data?: any;
}
export declare class WAMessageEditedBody extends WAMessage {
    editedMessageId?: string;
}
export declare class SessionStatusPoint {
    status: WAHASessionStatus;
    timestamp: number;
}
export declare class WASessionStatusBody {
    name: string;
    status: WAHASessionStatus;
    statuses: SessionStatusPoint[];
}
export declare class WAHAWebhook<Payload = any> {
    id: string;
    timestamp: number;
    session: string;
    metadata?: Record<string, string>;
    engine: WAHAEngine;
    me?: MeInfo;
    environment: WAHAEnvironment;
    event: WAHAEvents;
    payload: Payload;
}
export declare class WAHAWebhookSessionStatus extends WAHAWebhook {
    event: WAHAEvents;
    payload: WASessionStatusBody;
}
export declare class WAHAWebhookMessage extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessage;
}
export declare class WAHAWebhookMessageReaction extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessageReaction;
}
export declare class WAHAWebhookMessageAny extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessage;
}
export declare class WAHAWebhookMessageAck extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessageAckBody;
}
export declare class WAHAWebhookMessageAckGroup extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessageAckBody;
}
export declare class WAHAWebhookMessageRevoked extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessageRevokedBody;
}
export declare class WAHAWebhookMessageEdited extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAMessageEditedBody;
}
export declare class WAHAWebhookStateChange extends WAHAWebhook {
    event: WAHAEvents;
    payload: any;
}
export declare class WAHAWebhookGroupJoin extends WAHAWebhook {
    event: WAHAEvents;
    payload: any;
}
export declare class WAHAWebhookGroupLeave extends WAHAWebhook {
    event: WAHAEvents;
    payload: any;
}
export declare class WAHAWebhookPresenceUpdate extends WAHAWebhook {
    event: WAHAEvents;
    payload: WAHAChatPresences;
}
export declare class WAHAWebhookPollVote extends WAHAWebhook {
    event: WAHAEvents;
    payload: PollVotePayload;
}
export declare class WAHAWebhookPollVoteFailed extends WAHAWebhook {
    event: WAHAEvents;
    payload: PollVotePayload;
}
export declare class WAHAWebhookChatArchive extends WAHAWebhook {
    event: WAHAEvents;
    payload: ChatArchiveEvent;
}
export declare class WAHAWebhookCallReceived extends WAHAWebhook {
    event: WAHAEvents;
    payload: CallData;
}
export declare class WAHAWebhookCallAccepted extends WAHAWebhook {
    event: WAHAEvents;
    payload: CallData;
}
export declare class WAHAWebhookCallRejected extends WAHAWebhook {
    event: WAHAEvents;
    payload: CallData;
}
export declare class WAHAWebhookLabelUpsert extends WAHAWebhook {
    event: WAHAEvents;
    payload: Label;
}
export declare class WAHAWebhookLabelDeleted extends WAHAWebhook {
    event: WAHAEvents;
    payload: Label;
}
export declare class WAHAWebhookLabelChatAdded extends WAHAWebhook {
    event: WAHAEvents;
    payload: LabelChatAssociation;
}
export declare class WAHAWebhookLabelChatDeleted extends WAHAWebhook {
    event: WAHAEvents;
    payload: LabelChatAssociation;
}
export declare class EnginePayload {
    event: string;
    data: any;
}
export declare class WAHAWebhookEventResponse extends WAHAWebhook {
    event: WAHAEvents;
    payload: EventResponsePayload;
}
export declare class WAHAWebhookEventResponseFailed extends WAHAWebhook {
    event: WAHAEvents;
    payload: EventResponsePayload;
}
export declare class WAHAWebhookEngineEvent extends WAHAWebhook {
    event: WAHAEvents;
    payload: EnginePayload;
}
