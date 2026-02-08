import { WAMedia } from '@waha/structures/media.dto';
import { ReplyToMessage } from '@waha/structures/message.dto';
import { WAMessageAck } from './enums.dto';
export declare class WALocation {
    latitude: string;
    longitude: string;
    live: boolean;
    name?: string;
    address?: string;
    url?: string;
    description?: string;
    thumbnail?: string;
}
export declare enum MessageSource {
    API = "api",
    APP = "app"
}
export declare class WAMessageBase {
    id: string;
    timestamp: number;
    from: string;
    fromMe: boolean;
    source: MessageSource;
    to: string;
    participant: string;
}
export declare class WAMessage extends WAMessageBase {
    body: string;
    hasMedia: boolean;
    media?: WAMedia;
    mediaUrl: string;
    ack: WAMessageAck;
    ackName: string;
    author?: string;
    location?: WALocation;
    vCards?: string[];
    replyTo?: ReplyToMessage;
    _data?: any;
}
export declare class WAReaction {
    text: string;
    messageId: string;
}
export declare class WAMessageReaction extends WAMessageBase {
    reaction: WAReaction;
}
