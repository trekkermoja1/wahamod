import { ChannelsInfoServiceCore } from '@waha/core/services/ChannelsInfoServiceCore';
import { Channel, ChannelCategory, ChannelCountry, ChannelListResult, ChannelMessage, ChannelSearchByText, ChannelSearchByView, ChannelView, CreateChannelRequest, ListChannelsQuery, PreviewChannelMessages } from '@waha/structures/channels.dto';
import { SessionManager } from '../core/abc/manager.abc';
import { WhatsappSession } from '../core/abc/session.abc';
export declare class ChannelsController {
    private manager;
    private channelsInfoService;
    constructor(manager: SessionManager, channelsInfoService: ChannelsInfoServiceCore);
    list(session: WhatsappSession, query: ListChannelsQuery): Promise<Channel[]>;
    create(session: WhatsappSession, request: CreateChannelRequest): Promise<Channel>;
    delete(session: WhatsappSession, id: string): Promise<void>;
    get(session: WhatsappSession, id: string): Promise<Channel>;
    previewChannelMessages(session: WhatsappSession, code: string, query: PreviewChannelMessages): Promise<ChannelMessage[]>;
    follow(session: WhatsappSession, id: string): Promise<void>;
    unfollow(session: WhatsappSession, id: string): Promise<void>;
    mute(session: WhatsappSession, id: string): Promise<void>;
    unmute(session: WhatsappSession, id: string): Promise<void>;
    searchByView(session: WhatsappSession, request: ChannelSearchByView): Promise<ChannelListResult>;
    searchByText(session: WhatsappSession, request: ChannelSearchByText): Promise<ChannelListResult>;
    getSearchViews(): Promise<ChannelView[]>;
    getSearchCountries(): Promise<ChannelCountry[]>;
    getSearchCategories(): Promise<ChannelCategory[]>;
}
