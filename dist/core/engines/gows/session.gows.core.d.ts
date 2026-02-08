import { WhatsappSession } from '@waha/core/abc/session.abc';
import { EventsFromObservable } from '@waha/core/engines/gows/EventsFromObservable';
import { GowsEventStreamObservable } from '@waha/core/engines/gows/GowsEventStreamObservable';
import { messages } from '@waha/core/engines/gows/grpc/gows';
import { GowsAuthFactoryCore } from '@waha/core/engines/gows/store/GowsAuthFactoryCore';
import { IMediaEngineProcessor } from '@waha/core/media/IMediaEngineProcessor';
import { QR } from '@waha/core/QR';
import { Channel, ChannelListResult, ChannelMessage, ChannelSearchByText, ChannelSearchByView, CreateChannelRequest, ListChannelsQuery, PreviewChannelMessages } from '@waha/structures/channels.dto';
import { ChatSummary, GetChatMessageQuery, GetChatMessagesFilter, GetChatMessagesQuery, OverviewFilter, ReadChatMessagesQuery, ReadChatMessagesResponse } from '@waha/structures/chats.dto';
import { ChatRequest, CheckNumberStatusQuery, EditMessageRequest, MessageContactVcardRequest, MessageFileRequest, MessageForwardRequest, MessageImageRequest, MessageLinkCustomPreviewRequest, MessageLocationRequest, MessagePollRequest, MessagePollVoteRequest, MessageReactionRequest, MessageReplyRequest, MessageTextRequest, MessageVoiceRequest, SendSeenRequest, WANumberExistResult } from '@waha/structures/chatting.dto';
import { SendListRequest } from '@waha/structures/chatting.list.dto';
import { ContactQuery, ContactUpdateBody } from '@waha/structures/contacts.dto';
import { WAHAPresenceStatus } from '@waha/structures/enums.dto';
import { EventMessageRequest } from '@waha/structures/events.dto';
import { BinaryFile, RemoteFile } from '@waha/structures/files.dto';
import { CreateGroupRequest, GroupParticipant, ParticipantsRequest, SettingsSecurityChangeInfo } from '@waha/structures/groups.dto';
import { ReplyToMessage } from '@waha/structures/message.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';
import { WAHAChatPresences, WAHAPresenceData } from '@waha/structures/presence.dto';
import { WAMessage } from '@waha/structures/responses.dto';
import { MeInfo, ProxyConfig } from '@waha/structures/sessions.dto';
import { DeleteStatusRequest, TextStatus } from '@waha/structures/status.dto';
import { EnginePayload, WAMessageAckBody } from '@waha/structures/webhooks.dto';
import { Observable } from 'rxjs';
import * as gows from './types';
import { Label, LabelDTO, LabelID } from '@waha/structures/labels.dto';
import { LidToPhoneNumber } from '@waha/structures/lids.dto';
import MessageServiceClient = messages.MessageServiceClient;
declare enum WhatsMeowEvent {
    CONNECTED = "gows.ConnectedEventData",
    DISCONNECTED = "events.Disconnected",
    KEEP_ALIVE_TIMEOUT = "events.KeepAliveTimeout",
    KEEP_ALIVE_RESTORED = "events.KeepAliveRestored",
    QR_CHANNEL_ITEM = "whatsmeow.QRChannelItem",
    MESSAGE = "events.Message",
    RECEIPT = "events.Receipt",
    PRESENCE = "events.Presence",
    CHAT_PRESENCE = "events.ChatPresence",
    PUSH_NAME_SETTING = "events.PushNameSetting",
    LOGGED_OUT = "events.LoggedOut",
    GROUP_INFO = "events.GroupInfo",
    JOINED_GROUP = "events.JoinedGroup",
    LABEL_EDIT = "events.LabelEdit",
    LABEL_ASSOCIATION_CHAT = "events.LabelAssociationChat",
    EVENT_MESSAGE_RESPONSE = "gows.EventMessageResponse",
    POLL_VOTE_EVENT = "gows.PollVoteEvent",
    CALL_OFFER = "events.CallOffer",
    CALL_ACCEPT = "events.CallAccept",
    CALL_REJECT = "events.CallReject",
    CALL_TERMINATE = "events.CallTerminate",
    CALL_OFFER_NOTICE = "events.CallOfferNotice"
}
export interface GowsConfig {
    connection: string;
}
export declare class WhatsappSessionGoWSCore extends WhatsappSession {
    protected authFactory: GowsAuthFactoryCore;
    protected qr: QR;
    client: MessageServiceClient;
    protected stream$: GowsEventStreamObservable;
    protected all$: Observable<EnginePayload>;
    protected events: EventsFromObservable<WhatsMeowEvent>;
    protected me: MeInfo | null;
    session: messages.Session;
    protected presences: any;
    private local$;
    constructor(config: any);
    start(): Promise<void>;
    protected getProxyUrl(config: ProxyConfig): string;
    buildStreams(): void;
    subscribeEvents(): void;
    subscribeEngineEvents2(): void;
    fetchContactProfilePicture(id: string): Promise<string>;
    protected listenEngineEventsInDebugMode(): void;
    stop(): Promise<void>;
    requestCode(phoneNumber: string, method: string, params?: any): Promise<{
        code: string;
    }>;
    unpair(): Promise<void>;
    getSessionMeInfo(): MeInfo | null;
    getQR(): QR;
    getScreenshot(): Promise<Buffer>;
    setProfileName(name: string): Promise<boolean>;
    setProfileStatus(status: string): Promise<boolean>;
    protected setProfilePicture(file: BinaryFile | RemoteFile): Promise<boolean>;
    protected deleteProfilePicture(): Promise<boolean>;
    generateNewMessageId(): Promise<string>;
    rejectCall(from: string, id: string): Promise<void>;
    sendText(request: MessageTextRequest): Promise<{
        id: string;
        _data: any;
    }>;
    editMessage(chatId: string, messageId: string, request: EditMessageRequest): Promise<{
        id: string;
        _data: any;
    }>;
    sendContactVCard(request: MessageContactVcardRequest): Promise<{
        id: string;
        _data: any;
    }>;
    sendPoll(request: MessagePollRequest): Promise<{
        id: string;
        _data: any;
    }>;
    sendPollVote(request: MessagePollVoteRequest): void;
    sendList(request: SendListRequest): Promise<any>;
    deleteMessage(chatId: string, messageId: string): Promise<{
        id: string;
        _data: any;
    }>;
    protected prepareJidsForStatus(contacts: string[]): Promise<any[]>;
    sendTextStatus(status: TextStatus): Promise<{
        id: string;
        _data: any;
    }>;
    deleteStatus(request: DeleteStatusRequest): Promise<{
        id: string;
        _data: any;
    }>;
    protected messageResponse(jid: any, data: any): {
        id: string;
        _data: any;
    };
    checkNumberStatus(request: CheckNumberStatusQuery): Promise<WANumberExistResult>;
    sendLocation(request: MessageLocationRequest): Promise<{
        id: string;
        _data: any;
    }>;
    forwardMessage(request: MessageForwardRequest): Promise<WAMessage>;
    sendImage(request: MessageImageRequest): void;
    sendFile(request: MessageFileRequest): void;
    sendVoice(request: MessageVoiceRequest): void;
    sendLinkCustomPreview(request: MessageLinkCustomPreviewRequest): Promise<any>;
    reply(request: MessageReplyRequest): Promise<{
        id: string;
        _data: any;
    }>;
    sendSeen(request: SendSeenRequest): Promise<void>;
    startTyping(chat: ChatRequest): Promise<void>;
    stopTyping(chat: ChatRequest): Promise<void>;
    createGroup(request: CreateGroupRequest): Promise<any>;
    joinInfoGroup(code: string): Promise<any>;
    joinGroup(code: string): Promise<string>;
    getGroups(pagination: PaginationParams): Promise<any[]>;
    protected removeGroupsFieldParticipant(group: any): void;
    refreshGroups(): Promise<boolean>;
    getGroup(id: any): Promise<any>;
    getGroupParticipants(id: string): Promise<GroupParticipant[]>;
    getInfoAdminsOnly(id: any): Promise<SettingsSecurityChangeInfo>;
    setInfoAdminsOnly(id: any, value: any): Promise<void>;
    getMessagesAdminsOnly(id: any): Promise<SettingsSecurityChangeInfo>;
    setMessagesAdminsOnly(id: any, value: any): Promise<void>;
    deleteGroup(id: any): void;
    leaveGroup(id: any): Promise<void>;
    setDescription(id: any, description: any): Promise<void>;
    setSubject(id: any, description: any): Promise<void>;
    getInviteCode(id: any): Promise<string>;
    revokeInviteCode(id: any): Promise<string>;
    getParticipants(id: any): Promise<any>;
    private updateParticipants;
    addParticipants(id: string, request: ParticipantsRequest): Promise<any>;
    removeParticipants(id: any, request: ParticipantsRequest): Promise<any>;
    promoteParticipantsToAdmin(id: any, request: ParticipantsRequest): Promise<any>;
    demoteParticipantsToUser(id: any, request: ParticipantsRequest): Promise<any>;
    setReaction(request: MessageReactionRequest): Promise<{
        id: string;
        _data: any;
    }>;
    sendEvent(request: EventMessageRequest): Promise<WAMessage>;
    cancelEvent(eventId: string): Promise<WAMessage>;
    setPresence(presence: WAHAPresenceStatus, chatId?: string): Promise<void>;
    getPresences(): Promise<WAHAChatPresences[]>;
    getPresence(chatId: string): Promise<WAHAChatPresences>;
    subscribePresence(chatId: string): Promise<{}>;
    protected toWahaPresenceData(data: gows.Presence | gows.ChatPresence): WAHAPresenceData;
    protected toWahaPresences(jid: any, result: null | gows.Presence[] | gows.ChatPresence[]): WAHAChatPresences;
    searchChannelsByView(query: ChannelSearchByView): Promise<ChannelListResult>;
    searchChannelsByText(query: ChannelSearchByText): Promise<ChannelListResult>;
    previewChannelMessages(inviteCode: string, query: PreviewChannelMessages): Promise<ChannelMessage[]>;
    protected toChannel(newsletter: messages.Newsletter): Channel;
    channelsList(query: ListChannelsQuery): Promise<Channel[]>;
    channelsCreateChannel(request: CreateChannelRequest): Promise<Channel>;
    channelsGetChannel(id: string): Promise<Channel>;
    channelsGetChannelByInviteCode(inviteCode: string): Promise<Channel>;
    channelsFollowChannel(id: string): Promise<any>;
    channelsUnfollowChannel(id: string): Promise<any>;
    protected channelsToggleFollow(id: string, follow: boolean): Promise<{}>;
    channelsMuteChannel(id: string): Promise<void>;
    channelsUnmuteChannel(id: string): Promise<void>;
    protected channelsToggleMute(id: string, mute: boolean): Promise<any>;
    upsertContact(chatId: string, body: ContactUpdateBody): Promise<void>;
    protected toWAContact(contact: any): {
        id: any;
        name: any;
        pushname: any;
    };
    getContact(query: ContactQuery): Promise<{
        id: any;
        name: any;
        pushname: any;
    }>;
    getContacts(pagination: PaginationParams): Promise<unknown[]>;
    getAllLids(pagination: PaginationParams): Promise<Array<LidToPhoneNumber>>;
    getLidsCount(): Promise<number>;
    findPNByLid(lid: string): Promise<LidToPhoneNumber>;
    findLIDByPhoneNumber(phoneNumber: string): Promise<LidToPhoneNumber>;
    getChatsOverview(pagination: PaginationParams, filter?: OverviewFilter): Promise<ChatSummary[]>;
    protected fetchChatSummary(chat: any): Promise<ChatSummary>;
    protected toWAChat(chat: any): {
        id: any;
        name: any;
        conversationTimestamp: number;
    };
    getChats(pagination: PaginationParams, filter?: OverviewFilter | null): Promise<unknown[]>;
    getChatMessages(chatId: string, query: GetChatMessagesQuery, filter: GetChatMessagesFilter): Promise<any[]>;
    readChatMessages(chatId: string, request: ReadChatMessagesQuery): Promise<ReadChatMessagesResponse>;
    getChatMessage(chatId: string, messageId: string, query: GetChatMessageQuery): Promise<null | WAMessage>;
    getLabels(): Promise<Label[]>;
    createLabel(labelDto: LabelDTO): Promise<Label>;
    protected toLabel(label: any): Label;
    updateLabel(label: Label): Promise<Label>;
    deleteLabel(label: Label): Promise<void>;
    getChatsByLabelId(labelId: string): Promise<{
        id: any;
    }[]>;
    getChatLabels(chatId: string): Promise<Label[]>;
    chatsUnreadChat(chatId: string): Promise<any>;
    putLabelsToChat(chatId: string, labels: LabelID[]): Promise<void>;
    protected shouldProcessIncomingMessage(message: any): boolean;
    protected processIncomingMessage(message: any, downloadMedia?: boolean): Promise<WAMessage>;
    protected downloadMediaSafe(message: any): Promise<import("../../../structures/media.dto").WAMedia>;
    protected downloadMedia(message: any): Promise<import("../../../structures/media.dto").WAMedia>;
    protected toWAMessage(message: any): WAMessage;
    private toPollVotePayload;
    private getCallId;
    private shouldProcessCallEvent;
    private toCallData;
    private isVideoCall;
    private isGroupCall;
    private toEventResponsePayload;
    private getSourceDeviceByMsg;
    protected extractReplyTo(message: any): ReplyToMessage | null;
    getEngineInfo(): Promise<{
        grpc: {
            client: string;
            stream: string;
        };
        gows?: undefined;
    } | {
        grpc: {
            client: string;
            stream: string;
        };
        gows: any;
    }>;
    receiptToMessageAck(receipt: any): WAMessageAckBody[];
    private processMessageReaction;
    buildMessageIdFromKey(key: WARawKey): string;
}
export declare class GOWSEngineMediaProcessor implements IMediaEngineProcessor<any> {
    session: WhatsappSessionGoWSCore;
    constructor(session: WhatsappSessionGoWSCore);
    hasMedia(message: any): boolean;
    getChatId(message: any): string;
    getMessageId(message: any): string;
    getMimetype(message: any): string;
    getMediaBuffer(message: any): Promise<Buffer | null>;
    getFilename(message: any): string | null;
}
interface WARawKey {
    remoteJID: string;
    fromMe: boolean;
    ID: string;
    participant?: string;
}
export declare function getMessageIdFromSerialized(serialized: string): string | null;
export {};
