import { WAMessageAck } from '@waha/structures/enums.dto';
import { LimitOffsetParams, PaginationParams } from '@waha/structures/pagination.dto';
export declare class GetChatMessagesFilter {
    'filter.timestamp.lte'?: number;
    'filter.timestamp.gte'?: number;
    'filter.fromMe'?: boolean;
    'filter.ack'?: WAMessageAck;
}
export declare function transformAck(filter: GetChatMessagesFilter): GetChatMessagesFilter;
export declare class ChatPictureQuery {
    refresh?: boolean;
}
export declare class ChatPictureResponse {
    url: string;
}
export declare enum MessageSortField {
    TIMESTAMP = "timestamp",
    MESSAGE_TIMESTAMP = "messageTimestamp"
}
export declare class GetChatMessagesQuery extends PaginationParams {
    limit: number;
    sortBy?: string;
    downloadMedia: boolean;
}
export declare class ReadChatMessagesQuery {
    messages: number;
    days: number;
}
export declare class ReadChatMessagesResponse {
    ids?: string[];
}
export declare class GetChatMessageQuery {
    downloadMedia: boolean;
}
export declare enum ChatSortField {
    CONVERSATION_TIMESTAMP = "conversationTimestamp",
    ID = "id",
    NAME = "name"
}
export declare class ChatsPaginationParams extends PaginationParams {
    sortBy?: string;
}
export declare enum PinDuration {
    DAY = 86400,
    WEEK = 604800,
    MONTH = 2592000
}
export declare class PinMessageRequest {
    duration: number;
}
export declare class OverviewPaginationParams extends LimitOffsetParams {
    limit?: number;
}
export declare class OverviewFilter {
    ids?: string[];
}
export declare class OverviewBodyRequest {
    pagination: OverviewPaginationParams;
    filter: OverviewFilter;
}
export declare class ChatSummary {
    id: string;
    name: string | null;
    picture: string | null;
    lastMessage: any;
    _chat: any;
}
export declare class ChatArchiveEvent {
    id: string;
    archived: boolean;
    timestamp: number;
}
