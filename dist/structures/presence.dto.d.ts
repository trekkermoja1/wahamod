import { WAHAPresenceStatus } from './enums.dto';
export declare class WAHAPresenceData {
    participant: string;
    lastKnownPresence: WAHAPresenceStatus;
    lastSeen?: number;
}
export declare class WAHAChatPresences {
    id: string;
    presences: WAHAPresenceData[];
}
export declare class WAHASessionPresence {
    presence: WAHAPresenceStatus;
    chatId: string;
}
