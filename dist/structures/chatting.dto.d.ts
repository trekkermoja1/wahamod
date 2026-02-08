import { GetChatMessagesQuery } from '@waha/structures/chats.dto';
import { SessionBaseRequest, SessionQuery } from './base.dto';
import { BinaryFile, FileType, RemoteFile, VideoBinaryFile, VideoRemoteFile, VoiceBinaryFile, VoiceRemoteFile } from './files.dto';
export declare class CheckNumberStatusQuery extends SessionQuery {
    phone: string;
}
export declare class MessageTextQuery extends SessionQuery {
    phone: string;
    text: string;
}
export declare class ChatQuery extends SessionQuery {
    chatId: string;
}
export declare class GetMessageQuery extends GetChatMessagesQuery {
    session: string;
    chatId: string;
}
export declare class GetPresenceQuery extends ChatQuery {
}
export declare class ChatRequest extends SessionBaseRequest {
    chatId: string;
}
export declare class SendSeenRequest extends ChatRequest {
    messageId?: string;
    messageIds?: string[];
    participant?: string;
}
export declare class MessageRequest extends SessionBaseRequest {
    messageId: string;
}
export declare class VCardContact {
    vcard: string;
}
export declare class Contact {
    fullName: string;
    organization: string;
    phoneNumber: string;
    whatsappId: string;
    vcard: string;
}
export declare class MessageContactVcardRequest extends ChatRequest {
    contacts: (VCardContact | Contact)[];
    reply_to?: string;
}
export declare class MessageTextRequest extends ChatRequest {
    text: string;
    mentions?: string[];
    reply_to?: string;
    linkPreview?: boolean;
    linkPreviewHighQuality?: boolean;
}
export declare class LinkPreviewData {
    url: string;
    title: string;
    description: string;
    image?: FileType;
}
export declare class MessageLinkCustomPreviewRequest extends ChatRequest {
    text: string;
    linkPreviewHighQuality?: boolean;
    preview: LinkPreviewData;
    reply_to?: string;
}
export declare class EditMessageRequest {
    text: string;
    mentions?: string[];
    linkPreview?: boolean;
    linkPreviewHighQuality?: boolean;
}
export declare class MessageReplyRequest extends MessageTextRequest {
    text: string;
}
export declare class MessageLocationRequest extends ChatRequest {
    latitude: number;
    longitude: number;
    title: string;
    reply_to?: string;
}
declare class FileRequest extends ChatRequest {
    file: BinaryFile | RemoteFile;
}
export declare class MessageImageRequest extends FileRequest {
    caption?: string;
    mentions?: string[];
    reply_to?: string;
}
export declare class MessageFileRequest extends FileRequest {
    caption?: string;
    mentions?: string[];
    reply_to?: string;
}
export declare class MessageVoiceRequest extends ChatRequest {
    file: VoiceBinaryFile | VoiceRemoteFile;
    reply_to?: string;
    convert: boolean;
}
export declare class MessageVideoRequest extends ChatRequest {
    file: VideoRemoteFile | VideoBinaryFile;
    caption?: string;
    mentions?: string[];
    reply_to?: string;
    asNote?: boolean;
    convert: boolean;
}
export declare class MessageLinkPreviewRequest extends ChatRequest {
    url: string;
    title: string;
}
export declare class MessageForwardRequest extends ChatRequest {
    messageId: string;
}
export declare class MessageReactionRequest extends MessageRequest {
    reaction: string;
}
export declare class MessageStarRequest extends MessageRequest {
    chatId: string;
    star: boolean;
}
export declare class WANumberExistResult {
    numberExists: boolean;
    chatId?: string;
}
export declare class MessagePoll {
    name: string;
    options: string[];
    multipleAnswers: boolean;
}
export declare class MessagePollRequest extends ChatRequest {
    poll: MessagePoll;
    reply_to?: string;
}
export declare class MessageDestination {
    id: string;
    to: string;
    from: string;
    fromMe: boolean;
    participant?: string;
}
export declare class MessageButtonReply extends ChatRequest {
    replyTo?: string;
    selectedDisplayText: string;
    selectedButtonID: string;
}
export declare class NewMessageIDResponse {
    id: string;
}
export declare class MessagePollVoteRequest extends ChatRequest {
    pollMessageId: string;
    pollServerId?: number;
    votes: string[];
}
export {};
