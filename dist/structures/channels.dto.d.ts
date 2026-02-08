import { BinaryFile, RemoteFile } from '@waha/structures/files.dto';
import { WAMessage } from '@waha/structures/responses.dto';
export declare class CreateChannelRequest {
    name: string;
    description?: string;
    picture?: RemoteFile | BinaryFile;
}
export declare enum ChannelRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    SUBSCRIBER = "SUBSCRIBER",
    GUEST = "GUEST"
}
export declare enum ChannelRoleFilter {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    SUBSCRIBER = "SUBSCRIBER"
}
export declare class ListChannelsQuery {
    role?: ChannelRoleFilter;
}
declare class ChannelBase {
    id: string;
    name: string;
    description?: string;
    invite: string;
    preview?: string;
    picture?: string;
    verified: boolean;
    subscribersCount: number;
}
export declare class Channel extends ChannelBase {
    role: ChannelRole;
}
export declare class ChannelPublicInfo extends ChannelBase {
}
export declare const NewsletterIdApiParam: MethodDecorator & ClassDecorator;
export declare const NewsletterIdOrInviteCodeApiParam: MethodDecorator & ClassDecorator;
export declare class ChannelCountry {
    code: string;
    name: string;
}
export declare class ChannelCategory {
    value: string;
    name: string;
}
export declare class ChannelView {
    value: string;
    name: string;
}
export declare class ChannelSearch {
    limit: number;
    startCursor: string;
}
export declare class ChannelSearchByView extends ChannelSearch {
    view: string;
    countries: string[];
    categories: string[];
}
export declare class ChannelSearchByText extends ChannelSearch {
    text: string;
    categories: string[];
}
export declare class ChannelPagination {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class ChannelListResult {
    page: ChannelPagination;
    channels: ChannelPublicInfo[];
}
export declare class ChannelMessage {
    message: WAMessage;
    reactions: {
        [emoji: string]: number;
    };
    viewCount: number;
}
export declare class PreviewChannelMessages {
    downloadMedia: boolean;
    limit: number;
}
export {};
