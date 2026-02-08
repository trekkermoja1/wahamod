"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRestart = SessionRestart;
exports.SessionStart = SessionStart;
exports.SessionLogout = SessionLogout;
exports.SessionStop = SessionStop;
exports.SessionStatus = SessionStatus;
exports.SessionQR = SessionQR;
exports.SessionScreenshot = SessionScreenshot;
const templates_1 = require("../i18n/templates");
const emoji_1 = require("../emoji");
const messages_1 = require("../client/messages");
const types_1 = require("../client/types");
async function SessionRestart(ctx) {
    await ctx.waha.restart(ctx.data.session);
}
async function SessionStart(ctx) {
    return SessionRestart(ctx);
}
async function SessionLogout(ctx) {
    ctx.logger.info(`Logging out session ${ctx.data.session}`);
    await ctx.waha.logout(ctx.data.session);
    const text = ctx.l.key(templates_1.TKey.APP_LOGOUT_SUCCESS).render();
    await ctx.conversation.incoming(text);
}
async function SessionStop(ctx) {
    ctx.logger.info(`Stopping session ${ctx.data.session}`);
    await ctx.waha.stop(ctx.data.session);
}
async function SessionStatus(ctx) {
    var _a, _b;
    ctx.logger.info(`Getting status for session ${ctx.data.session}`);
    const session = await ctx.waha.get(ctx.data.session);
    const emoji = (0, emoji_1.SessionStatusEmoji)(session.status);
    const text = ctx.l.key(templates_1.TKey.APP_SESSION_CURRENT_STATUS).render({
        emoji: emoji,
        session: session.name,
        status: session.status,
        name: ((_a = session.me) === null || _a === void 0 ? void 0 : _a.pushName) || 'Unknown',
        id: ((_b = session.me) === null || _b === void 0 ? void 0 : _b.id) || 'No phone number',
    });
    await ctx.conversation.incoming(text);
}
async function SessionQR(ctx) {
    const content = await ctx.waha.qr(ctx.data.session);
    const message = (0, messages_1.AttachmentFromBuffer)(content, 'qr.jpg');
    message.message_type = types_1.MessageType.INCOMING;
    await ctx.conversation.send(message);
}
async function SessionScreenshot(ctx) {
    ctx.logger.info(`Getting screenshot for session ${ctx.data.session}`);
    const content = await ctx.waha.screenshot(ctx.data.session);
    const message = (0, messages_1.AttachmentFromBuffer)(content, 'screenshot.jpg');
    message.message_type = types_1.MessageType.INCOMING;
    await ctx.conversation.send(message);
}
//# sourceMappingURL=cms.session.js.map