export declare enum WAJSPresenceChatStateType {
    AVAILABLE = "available",
    UNAVAILABLE = "unavailable",
    TYPING = "typing",
    RECORDING_AUDIO = "recording_audio"
}
export interface WebJSPresence {
    participant: string;
    lastSeen?: number;
    state: WAJSPresenceChatStateType;
}
