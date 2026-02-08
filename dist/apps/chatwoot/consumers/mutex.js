"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppChatIdKey = WhatsAppChatIdKey;
exports.ChatWootConversationKey = ChatWootConversationKey;
function WhatsAppChatIdKey(app, chatId) {
    return `chatwoot.${app}.whatsapp.chat-id-${chatId}`;
}
function ChatWootConversationKey(app, conversationId) {
    return `chatwoot.${app}.chatwoot.conversation-id-${conversationId}`;
}
//# sourceMappingURL=mutex.js.map