import { ChannelCategory, ChannelCountry, ChannelView } from '@waha/structures/channels.dto';
export declare class ChannelsInfoServiceCore {
    getCountries(): Promise<ChannelCountry[]>;
    getCategories(): Promise<ChannelCategory[]>;
    getViews(): Promise<ChannelView[]>;
}
