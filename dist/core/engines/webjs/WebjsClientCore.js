"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebjsClientCore = void 0;
const Puppeteer_1 = require("./Puppeteer");
const promiseTimeout_1 = require("../../../utils/promiseTimeout");
const events_1 = require("events");
const lodash = require("lodash");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const structures_1 = require("whatsapp-web.js/src/structures");
const WPage_1 = require("./WPage");
const { LoadWAHA } = require('./_WAHA.js');
const { LoadLodash } = require('./_lodash.js');
const { LoadPaginator } = require('./_Paginator.js');
const ChatFactory = require('whatsapp-web.js/src/factories/ChatFactory');
class WebjsClientCore extends whatsapp_web_js_1.Client {
    constructor(options, tags) {
        super(options);
        this.tags = tags;
        this.events = new events_1.EventEmitter();
        this.wpage = null;
        this.on(whatsapp_web_js_1.Events.READY, async () => {
            await this.attachCustomEventListeners();
            await this.injectWaha();
        });
    }
    async initialize() {
        const result = await super.initialize();
        if (this.pupPage && !(this.pupPage instanceof WPage_1.WPage)) {
            this.wpage = new WPage_1.WPage(this.pupPage);
            this.wpage.on(WPage_1.PAGE_CALL_ERROR_EVENT, (event) => {
                this.events.emit(WPage_1.PAGE_CALL_ERROR_EVENT, event);
            });
            this.pupPage = this.wpage;
        }
        return result;
    }
    async injectWaha() {
        await this.pupPage.evaluate(LoadLodash);
        await this.pupPage.evaluate(LoadPaginator);
        await this.pupPage.evaluate(LoadWAHA);
    }
    hideUXFreshLook() {
        return this.pupPage.evaluate(() => {
            const WAWebUserPrefsUiRefresh = window.require('WAWebUserPrefsUiRefresh');
            if (!WAWebUserPrefsUiRefresh) {
                return false;
            }
            if (WAWebUserPrefsUiRefresh.getUiRefreshNuxAcked()) {
                return false;
            }
            WAWebUserPrefsUiRefresh.incrementNuxViewCount();
            WAWebUserPrefsUiRefresh.setUiRefreshNuxAcked(true);
            const WAWebModalManager = window.require('WAWebModalManager');
            WAWebModalManager.ModalManager.close();
            return true;
        });
    }
    async attachCustomEventListeners() {
        await (0, Puppeteer_1.exposeFunctionIfAbsent)(this.pupPage, 'onNewMessageId', (messageId) => {
            this.events.emit('message.id', { id: messageId });
            return;
        });
        if (this.tags) {
            await this.attachTagsEvents();
        }
    }
    async attachTagsEvents() {
        await this.pupPage.evaluate(() => {
            if (window.decodeStanzaBack) {
                return;
            }
            const tags = ['receipt', 'presence', 'chatstate'];
            window.decodeStanzaBack = window.Store.SocketWap.decodeStanza;
            window.Store.SocketWap.decodeStanza = async (...args) => {
                const result = await window.decodeStanzaBack(...args);
                if (tags.includes(result === null || result === void 0 ? void 0 : result.tag)) {
                    setTimeout(() => window.onTag(result), 0);
                }
                return result;
            };
        });
    }
    async destroy() {
        var _a;
        this.events.removeAllListeners();
        (_a = this.wpage) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        await super.destroy();
    }
    async setPushName(name) {
        await this.pupPage.evaluate(async (pushName) => {
            return await window['WAHA'].WAWebSetPushnameConnAction.setPushname(pushName);
        }, name);
        if (this.info) {
            this.info.pushname = name;
        }
    }
    async unpair() {
        await this.pupPage.evaluate(async () => {
            if (window.Store &&
                window.Store.AppState &&
                typeof window.Store.AppState.logout === 'function') {
                await window.Store.AppState.logout();
            }
        });
    }
    async createLabel(name, color) {
        const labelId = (await this.pupPage.evaluate(async (name, color) => {
            return await window.WAHA.WAWebBizLabelEditingAction.labelAddAction(name, color);
        }, name, color));
        return labelId;
    }
    async deleteLabel(label) {
        return await this.pupPage.evaluate(async (label) => {
            return await window.WAHA.WAWebBizLabelEditingAction.labelDeleteAction(label.id, label.name, label.color);
        }, label);
    }
    async updateLabel(label) {
        return await this.pupPage.evaluate(async (label) => {
            return await window.WAHA.WAWebBizLabelEditingAction.labelEditAction(label.id, label.name, undefined, label.color);
        }, label);
    }
    async getChats(pagination, filter) {
        if (lodash.isEmpty(pagination)) {
            return await super.getChats();
        }
        pagination.limit || (pagination.limit = Infinity);
        pagination.offset || (pagination.offset = 0);
        const chats = await this.pupPage.evaluate(async (pagination, filter) => {
            return await window.WAHA.getChats(pagination, filter);
        }, pagination, filter);
        return chats.map((chat) => ChatFactory.create(this, chat));
    }
    async sendTextStatus(status) {
        const waColor = 'FF' + status.backgroundColor.replace('#', '');
        const color = parseInt(waColor, 16);
        const textStatus = {
            text: status.text,
            color: color,
            font: status.font,
        };
        const sentMsg = await this.pupPage.evaluate(async (status) => {
            await window.Store.SendStatus.sendStatusTextMsgAction(status);
            const meUser = window.Store.User.getMaybeMePnUser();
            const myStatus = window.Store.Status.getModelsArray().findLast((x) => x.id == meUser);
            if (!myStatus) {
                return undefined;
            }
            const msg = myStatus.msgs.last();
            return msg ? window.WWebJS.getMessageModel(msg) : undefined;
        }, textStatus);
        return sentMsg ? new structures_1.Message(this, sentMsg) : undefined;
    }
    async getMessages(chatId, filter, pagination) {
        const messages = await this.pupPage.evaluate(async (chatId, filter, pagination) => {
            pagination.limit || (pagination.limit = Infinity);
            pagination.offset || (pagination.offset = 0);
            const msgFilter = (m) => {
                if (m.isNotification) {
                    return false;
                }
                if (filter['filter.fromMe'] != null &&
                    m.id.fromMe !== filter['filter.fromMe']) {
                    return false;
                }
                if (filter['filter.timestamp.gte'] != null &&
                    m.t < filter['filter.timestamp.gte']) {
                    return false;
                }
                if (filter['filter.timestamp.lte'] != null &&
                    m.t > filter['filter.timestamp.lte']) {
                    return false;
                }
                if (filter['filter.ack'] != null && m.ack !== filter['filter.ack']) {
                    return false;
                }
                return true;
            };
            const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });
            let msgs = chat.msgs.getModelsArray().filter(msgFilter);
            while (msgs.length < pagination.limit + pagination.offset) {
                const loadedMessages = await window.Store.ConversationMsgs.loadEarlierMsgs(chat);
                if (!loadedMessages || loadedMessages.length == 0)
                    break;
                msgs = [...loadedMessages.filter(msgFilter), ...msgs];
                msgs = msgs.sort((a, b) => b.t - a.t);
                const earliest = msgs[msgs.length - 1];
                if (earliest.t < (filter['filter.timestamp.gte'] || Infinity)) {
                    break;
                }
            }
            msgs = msgs.sort((a, b) => b.t - a.t);
            const offset = Math.max(0, pagination.offset);
            const limit = pagination.limit;
            if (Number.isFinite(limit)) {
                const end = Math.min(offset + limit, msgs.length);
                msgs = msgs.slice(offset, end);
            }
            else if (offset > 0) {
                msgs = msgs.slice(offset);
            }
            return msgs.map((m) => window.WWebJS.getMessageModel(m));
        }, chatId, filter, pagination);
        return messages.map((m) => new structures_1.Message(this, m));
    }
    async getAllLids(pagination) {
        const lids = (await this.pupPage.evaluate(async (pagination) => {
            pagination.limit || (pagination.limit = Infinity);
            pagination.offset || (pagination.offset = 0);
            pagination.sortBy || (pagination.sortBy = 'lid');
            const WAWebApiContact = window.Store.LidUtils;
            await WAWebApiContact.warmUpAllLidPnMappings();
            const lidMap = WAWebApiContact.lidPnCache['$1'];
            const values = Array.from(lidMap.values());
            const result = values.map((map) => {
                return {
                    lid: map.lid._serialized,
                    pn: map.phoneNumber._serialized,
                };
            });
            const paginator = new window.Paginator(pagination);
            const page = paginator.apply(result);
            return page;
        }, pagination));
        return lids;
    }
    async getLidsCount() {
        const count = (await this.pupPage.evaluate(async () => {
            const WAWebApiContact = window.Store.LidUtils;
            await WAWebApiContact.warmUpAllLidPnMappings();
            const lidMap = WAWebApiContact.lidPnCache['$1'];
            return lidMap.size;
        }));
        return count;
    }
    async findPNByLid(lid) {
        const pn = await this.pupPage.evaluate(async (lid) => {
            const WAWebApiContact = window.Store.LidUtils;
            const WAWebWidFactory = window.Store.WidFactory;
            const wid = WAWebWidFactory.createWid(lid);
            const result = WAWebApiContact.getPhoneNumber(wid);
            return result ? result._serialized : null;
        }, lid);
        return pn;
    }
    async findLIDByPhoneNumber(phoneNumber) {
        const lid = (await this.pupPage.evaluate(async (pn) => {
            const WAWebApiContact = window.Store.LidUtils;
            const WAWebWidFactory = window.Store.WidFactory;
            const wid = WAWebWidFactory.createWid(pn);
            const result = WAWebApiContact.getCurrentLid(wid);
            return result ? result._serialized : null;
        }, phoneNumber));
        return lid;
    }
    async subscribePresence(chatId) {
        await this.pupPage.evaluate(async (chatId) => {
            const d = require;
            const WidFactory = d('WAWebWidFactory');
            const wid = WidFactory.createWidFromWidLike(chatId);
            const chat = d('WAWebChatCollection').ChatCollection.get(wid);
            const tc = chat == null ? void 0 : chat.getTcToken();
            await d('WAWebContactPresenceBridge').subscribePresence(wid, tc);
        }, chatId);
    }
    async getCurrentPresence(chatId) {
        const result = await this.pupPage.evaluate(async (chatId) => {
            const d = require;
            const WidFactory = d('WAWebWidFactory');
            const PresenceCollection = d('WAWebPresenceCollection').PresenceCollection;
            const wid = WidFactory.createWidFromWidLike(chatId);
            const presence = PresenceCollection.get(wid);
            if (!presence) {
                return [];
            }
            let chatstates = [];
            if (chatId.endsWith('@c.us')) {
                chatstates = [presence.chatstate];
            }
            else {
                chatstates = presence.chatstates.getModelsArray();
            }
            return chatstates.map((chatstate) => {
                return {
                    participant: chatstate.id._serialized,
                    lastSeen: chatstate.t,
                    state: chatstate.type,
                };
            });
        }, chatId);
        return result;
    }
    async getPresence(chatId) {
        await this.sendPresenceAvailable();
        await this.subscribePresence(chatId);
        await (0, promiseTimeout_1.sleep)(3000);
        return await this.getCurrentPresence(chatId);
    }
}
exports.WebjsClientCore = WebjsClientCore;
//# sourceMappingURL=WebjsClientCore.js.map