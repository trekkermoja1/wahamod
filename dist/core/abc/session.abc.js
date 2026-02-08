"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappSession = void 0;
exports.getBrowserExecutablePath = getBrowserExecutablePath;
exports.ensureSuffix = ensureSuffix;
exports.getGroupInviteLink = getGroupInviteLink;
exports.parseGroupInviteLink = parseGroupInviteLink;
exports.getChannelInviteLink = getChannelInviteLink;
exports.parseChannelInviteLink = parseChannelInviteLink;
exports.getPublicUrlFromDirectPath = getPublicUrlFromDirectPath;
exports.extractDeviceId = extractDeviceId;
const IConverter_1 = require("../media/IConverter");
const convertors_1 = require("../utils/convertors");
const jids_1 = require("../utils/jids");
const responses_dto_1 = require("../../structures/responses.dto");
const DefaultMap_1 = require("../../utils/DefaultMap");
const ids_1 = require("../../utils/ids");
const complete_1 = require("../../utils/reactive/complete");
const SwitchObservable_1 = require("../../utils/reactive/SwitchObservable");
const axios_1 = require("axios");
const axios_retry_1 = require("axios-retry");
const fs = require("fs");
const lodash = require("lodash");
const NodeCache = require("node-cache");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const enums_dto_1 = require("../../structures/enums.dto");
const groups_dto_1 = require("../../structures/groups.dto");
const exceptions_1 = require("../exceptions");
const fetch_1 = require("../../utils/fetch");
const env_1 = require("../env");
const qrcode = require('qrcode-terminal');
(0, axios_retry_1.default)(axios_1.default, { retries: 3 });
const CHROME_PATH = '/usr/bin/google-chrome-stable';
const CHROMIUM_PATH = '/usr/bin/chromium';
function getBrowserExecutablePath() {
    if (fs.existsSync(CHROME_PATH)) {
        return CHROME_PATH;
    }
    return CHROMIUM_PATH;
}
function ensureSuffix(phone) {
    const suffix = '@c.us';
    if (phone.includes('@')) {
        return phone;
    }
    return phone + suffix;
}
class WhatsappSession {
    constructor({ name, printQR, loggerBuilder, sessionStore, proxyConfig, mediaManager, sessionConfig, engineConfig, ignore, }) {
        this.unpairing = false;
        this._presence = null;
        this.presenceAutoOnlineConfig = {
            enabled: env_1.PRESENCE_AUTO_ONLINE,
            duration: env_1.PRESENCE_AUTO_ONLINE_DURATION_SECONDS * 1000,
        };
        this.profilePictures = new NodeCache({
            stdTTL: 24 * 60 * 60,
        });
        this.sentMessageIds = new NodeCache({
            stdTTL: 10 * 60,
        });
        this.mediaConverter = new IConverter_1.CoreMediaConverter();
        this.status$ = new rxjs_1.BehaviorSubject(enums_dto_1.WAHASessionStatus.STOPPED);
        this.name = name;
        this.proxyConfig = proxyConfig;
        this.loggerBuilder = loggerBuilder;
        this.logger = loggerBuilder.child({ name: 'WhatsappSession' });
        this.events2 = new DefaultMap_1.DefaultMap((key) => new SwitchObservable_1.SwitchObservable((obs$) => {
            return obs$.pipe((0, rxjs_1.catchError)((err) => {
                this.logger.error(`Caught error, dropping value from, event: '${key}'`);
                this.logger.error({ err }, err.stack);
                throw err;
            }), (0, rxjs_1.filter)(Boolean), (0, operators_1.map)((data) => {
                data._eventId = (0, ids_1.generatePrefixedId)('evt');
                data._timestampMs = Date.now();
                return data;
            }), (0, rxjs_1.retry)(), (0, rxjs_1.share)());
        }));
        this.events2.get(enums_dto_1.WAHAEvents.SESSION_STATUS).switch(this.status$
            .pipe((0, rxjs_1.switchMap)((status) => {
            const me = this.getSessionMeInfo();
            const hasMe = !!(me === null || me === void 0 ? void 0 : me.pushName) && !!(me === null || me === void 0 ? void 0 : me.id);
            if (status === enums_dto_1.WAHASessionStatus.WORKING && !hasMe) {
                return (0, rxjs_1.of)(status).pipe((0, rxjs_1.delay)(2000));
            }
            return (0, rxjs_1.of)(status);
        }), (0, operators_1.distinctUntilChanged)((prev, curr) => prev === curr && curr === enums_dto_1.WAHASessionStatus.WORKING), (0, rxjs_1.timestamp)(), (0, operators_1.map)(({ value, timestamp }) => ({
            status: value,
            timestamp: timestamp,
        })), (0, rxjs_1.scan)((statuses, status) => {
            const next = [...statuses, status];
            return next.length > 3 ? next.slice(-3) : next;
        }, []), (0, operators_1.map)((statuses) => {
            var _a;
            return ({
                name: this.name,
                status: (_a = statuses.at(-1)) === null || _a === void 0 ? void 0 : _a.status,
                statuses: statuses,
            });
        })));
        this.sessionStore = sessionStore;
        this.mediaManager = mediaManager;
        this.sessionConfig = sessionConfig;
        this.engineConfig = engineConfig;
        this.shouldPrintQR = printQR;
        this.logger.info({ ignore: ignore }, 'The session ignores the following chat ids');
        this.jids = new jids_1.JidFilter(ignore);
    }
    getEventObservable(event) {
        return this.events2.get(event);
    }
    set status(value) {
        if (this.unpairing && value !== enums_dto_1.WAHASessionStatus.STOPPED) {
            return;
        }
        this._status = value;
        this.status$.next(value);
    }
    get status() {
        return this._status;
    }
    set presence(value) {
        switch (value) {
            case null:
                this._presence = null;
                break;
            case enums_dto_1.WAHAPresenceStatus.ONLINE:
                this._presence = enums_dto_1.WAHAPresenceStatus.ONLINE;
                break;
            case enums_dto_1.WAHAPresenceStatus.OFFLINE:
                this._presence = enums_dto_1.WAHAPresenceStatus.OFFLINE;
                break;
            default:
                return;
        }
    }
    get presence() {
        return this._presence;
    }
    getBrowserExecutablePath() {
        return getBrowserExecutablePath();
    }
    getBrowserArgsForPuppeteer() {
        return [
            '--disable-accelerated-2d-canvas',
            '--disable-application-cache',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-gpu',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-offline-load-stale-cache',
            '--disable-popup-blocking',
            '--disable-setuid-sandbox',
            '--disable-site-isolation-trials',
            '--disable-speech-api',
            '--disable-sync',
            '--disable-translate',
            '--disable-web-security',
            '--hide-scrollbars',
            '--ignore-certificate-errors',
            '--ignore-ssl-errors',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-sandbox',
            '--no-zygote',
            '--password-store=basic',
            '--renderer-process-limit=2',
            '--safebrowsing-disable-auto-update',
            '--use-mock-keychain',
            '--window-size=1280,720',
            '--disable-blink-features=AutomationControlled',
            '--disk-cache-size=1073741824',
        ];
    }
    isDebugEnabled() {
        return this.logger.isLevelEnabled('debug');
    }
    stopEvents() {
        (0, complete_1.complete)(this.events2);
    }
    async unpair() {
        return;
    }
    browserTrace(query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getQR() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    requestCode(phoneNumber, method, params) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getSessionMeInfo() {
        return null;
    }
    setProfileName(name) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    setProfileStatus(status) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async updateProfilePicture(file) {
        if (file) {
            await this.setProfilePicture(file);
        }
        else {
            await this.deleteProfilePicture();
        }
        setTimeout(() => {
            this.logger.debug('Refreshing my profile picture after update...');
            this.refreshMyProfilePicture()
                .then(() => {
                this.logger.debug('Refreshed my profile picture after update');
            })
                .catch((err) => {
                this.logger.error('Error refreshing my profile picture after update');
                this.logger.error({ err }, err.stack);
            });
        }, 3000);
        return true;
    }
    async refreshMyProfilePicture() {
        const me = this.getSessionMeInfo();
        await this.getContactProfilePicture(me.id, true);
    }
    setProfilePicture(file) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    deleteProfilePicture() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    generateNewMessageId() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendContactVCard(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendPoll(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendPollVote(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendLinkPreview(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendLinkCustomPreview(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendVideo(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendButtons(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendList(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendButtonsReply(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getLastActivityTimestamp() {
        return this.lastActivityTimestamp;
    }
    async maintainPresenceOnline() {
        if (!this.presenceAutoOnlineConfig.enabled) {
            return;
        }
        if (this.status !== enums_dto_1.WAHASessionStatus.WORKING) {
            return;
        }
        this.lastActivityTimestamp = Date.now();
        if (this._presence !== enums_dto_1.WAHAPresenceStatus.ONLINE) {
            try {
                this.presence = enums_dto_1.WAHAPresenceStatus.ONLINE;
                await this.setPresence(enums_dto_1.WAHAPresenceStatus.ONLINE);
                this.logger.debug('Set presence to ONLINE due to activity');
            }
            catch (error) {
                this.logger.debug({ error }, 'Failed to set presence ONLINE');
                return;
            }
        }
        this.cleanupPresenceTimeout();
        this.presenceOfflineTimeout = setTimeout(async () => {
            try {
                const working = this.status === enums_dto_1.WAHASessionStatus.WORKING;
                const online = this.presence === enums_dto_1.WAHAPresenceStatus.ONLINE;
                if (!working || !online) {
                    return;
                }
                await this.setPresence(enums_dto_1.WAHAPresenceStatus.OFFLINE);
                this.logger.debug('Auto-set presence to OFFLINE after time without activity');
            }
            catch (error) {
                this.presence = enums_dto_1.WAHAPresenceStatus.OFFLINE;
                this.logger.debug({ error }, 'Failed to set presence OFFLINE');
            }
            this.cleanupPresenceTimeout();
        }, this.presenceAutoOnlineConfig.duration);
    }
    cleanupPresenceTimeout() {
        clearTimeout(this.presenceOfflineTimeout);
        this.presenceOfflineTimeout = null;
    }
    setStar(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendEvent(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    cancelEvent(eventId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    rejectCall(from, id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getChats(pagination) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getChatsOverview(pagination, filter) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    deleteChat(chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getChatMessages(chatId, query, filter) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async readChatMessagesWSImpl(chatId, request) {
        const { query, filter } = (0, convertors_1.MessagesForRead)(chatId, request);
        const messages = await this.getChatMessages(chatId, query, filter);
        this.logger.debug(`Found ${messages.length} messages to read`);
        if (messages.length === 0) {
            return { ids: [] };
        }
        const ids = messages.map((m) => m.id);
        const seen = {
            chatId: chatId,
            messageIds: ids,
            session: '',
        };
        await this.sendSeen(seen);
        return { ids: ids };
    }
    getChatMessage(chatId, messageId, query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    pinMessage(chatId, messageId, duration) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    unpinMessage(chatId, messageId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    deleteMessage(chatId, messageId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    editMessage(chatId, messageId, request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    clearMessages(chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    chatsArchiveChat(chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    chatsUnarchiveChat(chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    chatsUnreadChat(chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async getLabel(labelId) {
        const labels = await this.getLabels();
        return lodash.find(labels, { id: labelId });
    }
    getLabels() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async createLabel(label) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async updateLabel(label) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async deleteLabel(label) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getChatsByLabelId(labelId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getChatLabels(chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    putLabelsToChat(chatId, labels) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    upsertContact(chatId, body) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getContact(query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getContacts(pagination) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getContactAbout(query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async getAllLids(pagination) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async getLidsCount() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async findPNByLid(lid) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async findLIDByPhoneNumber(phoneNumber) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async getContactProfilePicture(id, refresh) {
        const has = this.profilePictures.has(id);
        if (!has || refresh) {
            await this.refreshProfilePicture(id);
        }
        return this.profilePictures.get(id) || null;
    }
    async refreshProfilePicture(id) {
        this.logger.debug(`Refreshing profile picture for id "${id}"...`);
        if ((0, jids_1.isNullJid)(id)) {
            return null;
        }
        else if ((0, jids_1.isJidBroadcast)(id)) {
            return null;
        }
        let fn;
        if ((0, jids_1.isJidNewsletter)(id)) {
            fn = this.channelsGetChannel(id).then((channel) => channel.picture || channel.preview);
        }
        else {
            fn = this.fetchContactProfilePicture(id);
        }
        this.profilePictures.del(id);
        const url = await fn.catch((err) => {
            this.logger.warn('Error fetching profile picture');
            this.logger.warn({ err }, err.stack);
            return null;
        });
        this.profilePictures.set(id, url);
        return url;
    }
    blockContact(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    unblockContact(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    createGroup(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    joinGroup(code) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    joinInfoGroup(code) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getGroups(pagination) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    filterGroupsFields(data, fields) {
        var _a;
        const groups = Array.isArray(data) ? data : Object.values(data);
        if ((_a = fields.exclude) === null || _a === void 0 ? void 0 : _a.includes(groups_dto_1.GroupField.PARTICIPANTS)) {
            groups.forEach((group) => this.removeGroupsFieldParticipant(group));
        }
        return data;
    }
    removeGroupsFieldParticipant(group) {
        return;
    }
    refreshGroups() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getGroup(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getGroupParticipants(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getInfoAdminsOnly(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    setInfoAdminsOnly(id, value) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getMessagesAdminsOnly(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    setMessagesAdminsOnly(id, value) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    deleteGroup(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    leaveGroup(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    setDescription(id, description) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async updateGroupPicture(id, file) {
        if (file) {
            await this.setGroupPicture(id, file);
        }
        else {
            await this.deleteGroupPicture(id);
        }
        setTimeout(() => {
            this.logger.debug('Refreshing group profile picture after update...');
            this.refreshProfilePicture(id)
                .then(() => {
                this.logger.debug('Refreshed group profile picture after update');
            })
                .catch((err) => {
                this.logger.error('Error refreshing my profile picture after update');
                this.logger.error({ err }, err.stack);
            });
        }, 3000);
        return true;
    }
    setGroupPicture(id, file) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    deleteGroupPicture(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    setSubject(id, description) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getInviteCode(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    revokeInviteCode(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getParticipants(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    addParticipants(id, request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    removeParticipants(id, request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    promoteParticipantsToAdmin(id, request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    demoteParticipantsToUser(id, request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    setPresence(presence, chatId) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getPresences() {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    getPresence(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    subscribePresence(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    searchChannelsByView(query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    searchChannelsByText(query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async previewChannelMessages(inviteCode, query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsList(query) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsCreateChannel(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsGetChannel(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsGetChannelByInviteCode(inviteCode) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsDeleteChannel(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsFollowChannel(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsUnfollowChannel(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsMuteChannel(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    channelsUnmuteChannel(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendTextStatus(status) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendImageStatus(status) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    sendVoiceStatus(status) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    sendVideoStatus(status) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    deleteStatus(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async getEngineInfo() {
        return {};
    }
    ensureSuffix(phone) {
        return ensureSuffix(phone);
    }
    deserializeId(messageId) {
        const parts = messageId.split('_');
        return {
            fromMe: parts[0] === 'true',
            remote: parts[1],
            id: parts[2],
            _serialized: messageId,
        };
    }
    printQR(qr) {
        if (!this.shouldPrintQR) {
            return;
        }
        if (!qr.raw) {
            this.logger.error('QR.raw is not available, can not print it in the console');
            return;
        }
        this.logger.info("You can disable QR in console by setting 'WAHA_PRINT_QR=false' in your environment variables.");
        qrcode.generate(qr.raw, { small: true });
    }
    saveSentMessageId(id) {
        this.sentMessageIds.set(id, true);
    }
    getMessageSource(id) {
        if (!id) {
            return responses_dto_1.MessageSource.APP;
        }
        const api = this.sentMessageIds.has(id);
        return api ? responses_dto_1.MessageSource.API : responses_dto_1.MessageSource.APP;
    }
    fetch(url) {
        return (0, fetch_1.fetchBuffer)(url);
    }
    async resolveMentionsAll(chatId) {
        const participants = await this.getGroupParticipants(chatId);
        let mentions = participants.map((p) => p.id);
        const me = this.getSessionMeInfo();
        return mentions.filter((id) => id !== me.id && id !== me.lid);
    }
}
exports.WhatsappSession = WhatsappSession;
function getGroupInviteLink(code) {
    if (code.startsWith('https://')) {
        return code;
    }
    return `https://chat.whatsapp.com/${code}`;
}
function parseGroupInviteLink(link) {
    return link.split('/').pop();
}
function getChannelInviteLink(code) {
    return `https://whatsapp.com/channel/${code}`;
}
function parseChannelInviteLink(link) {
    const code = link.split('/').pop();
    return code;
}
function getPublicUrlFromDirectPath(directPath) {
    return `https://pps.whatsapp.net${directPath}`;
}
const deviceRegexp = /^.*:(\d+)@.*$/;
function extractDeviceId(jid) {
    if (!jid) {
        return null;
    }
    const match = jid.match(deviceRegexp);
    return match ? match[1] : null;
}
//# sourceMappingURL=session.abc.js.map