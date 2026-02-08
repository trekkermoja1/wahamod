export declare const SECOND = 1000;
export declare enum WAHAEvents {
    SESSION_STATUS = "session.status",
    MESSAGE = "message",
    MESSAGE_REACTION = "message.reaction",
    MESSAGE_ANY = "message.any",
    MESSAGE_ACK = "message.ack",
    MESSAGE_ACK_GROUP = "message.ack.group",
    MESSAGE_WAITING = "message.waiting",
    MESSAGE_REVOKED = "message.revoked",
    MESSAGE_EDITED = "message.edited",
    STATE_CHANGE = "state.change",
    GROUP_JOIN = "group.join",
    GROUP_LEAVE = "group.leave",
    GROUP_V2_JOIN = "group.v2.join",
    GROUP_V2_LEAVE = "group.v2.leave",
    GROUP_V2_UPDATE = "group.v2.update",
    GROUP_V2_PARTICIPANTS = "group.v2.participants",
    PRESENCE_UPDATE = "presence.update",
    POLL_VOTE = "poll.vote",
    POLL_VOTE_FAILED = "poll.vote.failed",
    CHAT_ARCHIVE = "chat.archive",
    CALL_RECEIVED = "call.received",
    CALL_ACCEPTED = "call.accepted",
    CALL_REJECTED = "call.rejected",
    LABEL_UPSERT = "label.upsert",
    LABEL_DELETED = "label.deleted",
    LABEL_CHAT_ADDED = "label.chat.added",
    LABEL_CHAT_DELETED = "label.chat.deleted",
    EVENT_RESPONSE = "event.response",
    EVENT_RESPONSE_FAILED = "event.response.failed",
    ENGINE_EVENT = "engine.event"
}
export type AllEventType = WAHAEvents | '*';
export declare const AllEvents: string[];
export declare const WAHAEventsWild: (WAHAEvents.SESSION_STATUS | WAHAEvents.MESSAGE | WAHAEvents.MESSAGE_REACTION | WAHAEvents.MESSAGE_ANY | WAHAEvents.MESSAGE_ACK | WAHAEvents.MESSAGE_ACK_GROUP | WAHAEvents.MESSAGE_WAITING | WAHAEvents.MESSAGE_REVOKED | WAHAEvents.MESSAGE_EDITED | WAHAEvents.GROUP_JOIN | WAHAEvents.GROUP_LEAVE | WAHAEvents.GROUP_V2_JOIN | WAHAEvents.GROUP_V2_LEAVE | WAHAEvents.GROUP_V2_UPDATE | WAHAEvents.GROUP_V2_PARTICIPANTS | WAHAEvents.PRESENCE_UPDATE | WAHAEvents.POLL_VOTE | WAHAEvents.POLL_VOTE_FAILED | WAHAEvents.CHAT_ARCHIVE | WAHAEvents.CALL_RECEIVED | WAHAEvents.CALL_ACCEPTED | WAHAEvents.CALL_REJECTED | WAHAEvents.LABEL_UPSERT | WAHAEvents.LABEL_DELETED | WAHAEvents.LABEL_CHAT_ADDED | WAHAEvents.LABEL_CHAT_DELETED | WAHAEvents.EVENT_RESPONSE | WAHAEvents.EVENT_RESPONSE_FAILED)[];
export declare enum WAHASessionStatus {
    STOPPED = "STOPPED",
    STARTING = "STARTING",
    SCAN_QR_CODE = "SCAN_QR_CODE",
    WORKING = "WORKING",
    FAILED = "FAILED"
}
export declare enum WAHAEngine {
    WEBJS = "WEBJS",
    NOWEB = "NOWEB",
    GOWS = "GOWS"
}
export declare enum WAHAPresenceStatus {
    OFFLINE = "offline",
    ONLINE = "online",
    TYPING = "typing",
    RECORDING = "recording",
    PAUSED = "paused"
}
export declare enum WAMessageAck {
    ERROR = -1,
    PENDING = 0,
    SERVER = 1,
    DEVICE = 2,
    READ = 3,
    PLAYED = 4
}
export declare enum WAMessageAckName {
    ERROR = "ERROR",
    PENDING = "PENDING",
    SERVER = "SERVER",
    DEVICE = "DEVICE",
    READ = "READ",
    PLAYED = "PLAYED"
}
export declare const ACK_UNKNOWN = "UNKNOWN";
