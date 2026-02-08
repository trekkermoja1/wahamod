import { GetChatMessagesFilter } from '@waha/structures/chats.dto';
import { SendButtonsRequest } from '@waha/structures/chatting.buttons.dto';
import { SendListRequest } from '@waha/structures/chatting.list.dto';
import { SessionManager } from '../core/abc/manager.abc';
import { ChatRequest, CheckNumberStatusQuery, GetMessageQuery, MessageButtonReply, MessageContactVcardRequest, MessageFileRequest, MessageForwardRequest, MessageImageRequest, MessageLinkCustomPreviewRequest, MessageLinkPreviewRequest, MessageLocationRequest, MessagePollRequest, MessagePollVoteRequest, MessageReactionRequest, MessageReplyRequest, MessageStarRequest, MessageTextQuery, MessageTextRequest, MessageVideoRequest, MessageVoiceRequest, SendSeenRequest, WANumberExistResult } from '../structures/chatting.dto';
import { WAMessage } from '../structures/responses.dto';
export declare class ChattingController {
    private manager;
    constructor(manager: SessionManager);
    sendText(request: MessageTextRequest): Promise<WAMessage>;
    sendImage(request: MessageImageRequest): Promise<any>;
    sendFile(request: MessageFileRequest): Promise<any>;
    sendVoice(request: MessageVoiceRequest): Promise<any>;
    sendVideo(request: MessageVideoRequest): Promise<void>;
    sendLinkCustomPreview(request: MessageLinkCustomPreviewRequest): Promise<any>;
    sendButtons(request: SendButtonsRequest): Promise<void>;
    sendList(request: SendListRequest): Promise<any>;
    forwardMessage(request: MessageForwardRequest): Promise<WAMessage>;
    sendSeen(chat: SendSeenRequest): Promise<any>;
    startTyping(chat: ChatRequest): Promise<{
        result: boolean;
    }>;
    stopTyping(chat: ChatRequest): Promise<{
        result: boolean;
    }>;
    setReaction(request: MessageReactionRequest): Promise<any>;
    setStar(request: MessageStarRequest): Promise<void>;
    sendPoll(request: MessagePollRequest): Promise<void>;
    sendPollVote(request: MessagePollVoteRequest): Promise<void>;
    sendLocation(request: MessageLocationRequest): Promise<any>;
    sendContactVcard(request: MessageContactVcardRequest): Promise<void>;
    sendButtonsReply(request: MessageButtonReply): Promise<void>;
    sendTextGet(query: MessageTextQuery): Promise<any>;
    getMessages(query: GetMessageQuery, filter: GetChatMessagesFilter): Promise<WAMessage[]>;
    DEPRECATED_checkNumberStatus(request: CheckNumberStatusQuery): Promise<WANumberExistResult>;
    reply(request: MessageReplyRequest): Promise<any>;
    sendLinkPreview_DEPRECATED(request: MessageLinkPreviewRequest): Promise<void>;
}
