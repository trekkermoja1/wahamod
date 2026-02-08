"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsListener = void 0;
const enums_dto_1 = require("../../../structures/enums.dto");
const promiseTimeout_1 = require("../../../utils/promiseTimeout");
class CallsListener {
    constructor(app, session, logger) {
        this.session = session;
        this.config = app.config;
        this.log = logger.logger.child({
            app: 'calls',
            session: app.session,
        });
    }
    attach() {
        this.detach();
        const observable = this.session.getEventObservable(enums_dto_1.WAHAEvents.CALL_RECEIVED);
        if (!observable) {
            this.log.warn('CALL_RECEIVED event stream is not available, skipping');
            return;
        }
        this.subscription = observable.subscribe((payload) => {
            this.handleCall(payload).catch((error) => {
                this.log.error({ err: error, callId: payload === null || payload === void 0 ? void 0 : payload.id }, 'Failed to handle incoming call');
            });
        });
        this.log.info('Calls app listener is attached');
    }
    detach() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.subscription = undefined;
    }
    configFor(call) {
        var _a, _b;
        return (call === null || call === void 0 ? void 0 : call.isGroup) ? (_a = this.config) === null || _a === void 0 ? void 0 : _a.group : (_b = this.config) === null || _b === void 0 ? void 0 : _b.dm;
    }
    async handleCall(call) {
        if (!call.from) {
            this.log.warn({ call: call === null || call === void 0 ? void 0 : call.id }, 'Incoming call has no chat id');
            return;
        }
        if (!call.id) {
            this.log.warn({ from: call.from }, 'Incoming call has no from');
            return;
        }
        const config = this.configFor(call);
        if (!config) {
            this.log.warn({ callId: call.id }, 'No calls config found, skipping');
            return;
        }
        const message = (config.message || '').trim();
        const shouldReject = !!config.reject;
        const shouldMessage = message.length > 0;
        if (!shouldReject && !shouldMessage) {
            this.log.debug({ callId: call.id, chatId: call.from }, 'No actions configured for this call');
            return;
        }
        if (shouldReject) {
            await this.rejectCall(call);
        }
        if (shouldMessage) {
            await this.replyWithTyping(call.from, message);
        }
    }
    async rejectCall(call) {
        this.log.debug({ from: call.from, id: call.id }, 'Rejecting incoming call');
        await this.session.rejectCall(call.from, call.id);
        this.log.info({ from: call.from, id: call.id }, 'Call rejected');
    }
    async replyWithTyping(chatId, message) {
        this.log.info({ chatId: chatId }, 'Sending auto-response for rejected call');
        await this.setTyping(chatId);
        await this.setPaused(chatId);
        await this.session.sendText({
            session: this.session.name,
            chatId: chatId,
            text: message,
        });
    }
    async setTyping(chatId) {
        try {
            await this.session.setPresence(enums_dto_1.WAHAPresenceStatus.TYPING, chatId);
        }
        catch (error) {
            this.log.warn({ err: error, chatId: chatId }, 'Failed to set typing presence before reply');
            return;
        }
        await (0, promiseTimeout_1.sleep)(2000);
    }
    async setPaused(chatId) {
        try {
            await this.session.setPresence(enums_dto_1.WAHAPresenceStatus.PAUSED, chatId);
        }
        catch (error) {
            this.log.warn({ err: error, chatId: chatId }, 'Failed to clear typing presence after reply');
        }
    }
}
exports.CallsListener = CallsListener;
//# sourceMappingURL=CallsListener.js.map