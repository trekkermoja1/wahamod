"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAHASessionAPI = exports.WAHASelf = void 0;
const axios_1 = require("axios");
const config_1 = require("../../../core/auth/config");
const contacts_dto_1 = require("../../../structures/contacts.dto");
class WAHASelf {
    constructor() {
        const key = config_1.Auth.keyplain.value;
        const port = parseInt(process.env.PORT) ||
            parseInt(process.env.WHATSAPP_API_PORT) ||
            3000;
        const url = `http://localhost:${port}`;
        this.client = axios_1.default.create({
            baseURL: url,
            headers: {
                'X-Api-Key': key,
                'Content-Type': 'application/json',
            },
        });
    }
    async fetch(url, opts) {
        const response = await this.client.get(url, {
            responseType: 'arraybuffer',
            signal: opts === null || opts === void 0 ? void 0 : opts.signal,
        });
        return Buffer.from(response.data);
    }
    async qr(session, opts) {
        const url = `/api/${session}/auth/qr`;
        return await this.fetch(url, opts);
    }
    async screenshot(session, opts) {
        const url = `/api/screenshot?session=${session}`;
        return await this.fetch(url, opts);
    }
    async restart(session, opts) {
        const url = `/api/sessions/${session}/restart`;
        return await this.client.post(url, undefined, { signal: opts === null || opts === void 0 ? void 0 : opts.signal });
    }
    async logout(session, opts) {
        const url = `/api/sessions/${session}/logout`;
        return await this.client.post(url, undefined, { signal: opts === null || opts === void 0 ? void 0 : opts.signal });
    }
    async stop(session, opts) {
        const url = `/api/sessions/${session}/stop`;
        return await this.client.post(url, undefined, { signal: opts === null || opts === void 0 ? void 0 : opts.signal });
    }
    async get(session, opts) {
        const url = `/api/sessions/${session}/`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getChats(session, page, opts) {
        const url = `/api/${session}/chats`;
        const params = Object.assign({}, page);
        return await this.client
            .get(url, { params: params, signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getContacts(session, page, opts) {
        const url = `/api/contacts/all`;
        const params = Object.assign(Object.assign({ session: session }, page), { sortBy: contacts_dto_1.ContactSortField.ID, sortOrder: contacts_dto_1.ContactSortField.ID });
        return await this.client
            .get(url, { params: params, signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getContact(session, contactId, opts) {
        const url = `/api/contacts`;
        const params = {
            session: session,
            contactId: contactId,
        };
        return await this.client
            .get(url, { params: params, signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async contactCheckExists(session, phone, opts) {
        const url = `/api/contacts/check-exists`;
        const params = {
            phone: phone,
            session: session,
        };
        return await this.client
            .get(url, { params: params, signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getGroup(session, groupId, opts) {
        const url = `/api/${session}/groups/${groupId}`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getChannel(session, channelId, opts) {
        const url = `/api/${session}/channels/${channelId}`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getChatPicture(session, chatId, opts) {
        const url = `/api/${session}/chats/${chatId}/picture`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => { var _a; return (_a = response.data) === null || _a === void 0 ? void 0 : _a.url; });
    }
    async sendText(body, opts) {
        const url = `/api/sendText`;
        return await this.client
            .post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async sendImage(body, opts) {
        const url = `/api/sendImage`;
        return await this.client
            .post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async sendVideo(body, opts) {
        const url = `/api/sendVideo`;
        return await this.client
            .post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async sendVoice(body, opts) {
        const url = `/api/sendVoice`;
        return await this.client
            .post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async sendFile(body, opts) {
        const url = `/api/sendFile`;
        return await this.client
            .post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async deleteMessage(session, chatId, messageId, opts) {
        const url = `/api/${session}/chats/${chatId}/messages/${messageId}`;
        return await this.client
            .delete(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async startTyping(body, opts) {
        const url = `/api/startTyping`;
        return await this.client
            .post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async stopTyping(body, opts) {
        const url = `/api/stopTyping`;
        return await this.client.post(url, body, { signal: opts === null || opts === void 0 ? void 0 : opts.signal });
    }
    async readMessages(session, chatId, opts) {
        const url = `/api/${session}/chats/${chatId}/messages/read`;
        return await this.client
            .post(url, undefined, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getMessages(session, chatId, query, filter, opts) {
        const url = `/api/${session}/chats/${chatId}/messages`;
        const params = Object.assign(Object.assign({}, query), filter);
        return await this.client
            .get(url, { params: params, signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async getMessageById(session, chatId, messageId, media, opts) {
        const url = `/api/${session}/chats/${chatId}/messages/${messageId}`;
        const params = {
            downloadMedia: media,
        };
        return await this.client
            .get(url, { params: params, signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async findPNByLid(session, lid, opts) {
        const url = `/api/${session}/lids/${lid}`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data.pn);
    }
    async findLIDByPN(session, pn, opts) {
        const url = `/api/${session}/lids/pn/${pn}`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data.lid);
    }
    async serverVersion(opts) {
        const url = `/api/server/version`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async serverStatus(opts) {
        const url = `/api/server/status`;
        return await this.client
            .get(url, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
    async serverReboot(force = false, opts) {
        const url = `/api/server/stop`;
        return await this.client
            .post(url, { force }, { signal: opts === null || opts === void 0 ? void 0 : opts.signal })
            .then((response) => response.data);
    }
}
exports.WAHASelf = WAHASelf;
class WAHASessionAPI {
    constructor(session, api) {
        this.session = session;
        this.api = api;
    }
    getChats(page, opts) {
        return this.api.getChats(this.session, page, opts);
    }
    getContacts(page, opts) {
        return this.api.getContacts(this.session, page, opts);
    }
    getContact(contactId, opts) {
        return this.api.getContact(this.session, contactId, opts);
    }
    contactCheckExists(phone, opts) {
        return this.api.contactCheckExists(this.session, phone, opts);
    }
    getGroup(groupId, opts) {
        return this.api.getGroup(this.session, groupId, opts);
    }
    getChannel(channelId, opts) {
        return this.api.getChannel(this.session, channelId, opts);
    }
    getChatPicture(chatId, opts) {
        return this.api.getChatPicture(this.session, chatId, opts);
    }
    sendText(body, opts) {
        body.session = this.session;
        return this.api.sendText(body, opts);
    }
    sendImage(body, opts) {
        body.session = this.session;
        return this.api.sendImage(body, opts);
    }
    sendVideo(body, opts) {
        body.session = this.session;
        return this.api.sendVideo(body, opts);
    }
    sendVoice(body, opts) {
        body.session = this.session;
        return this.api.sendVoice(body, opts);
    }
    sendFile(body, opts) {
        body.session = this.session;
        return this.api.sendFile(body, opts);
    }
    deleteMessage(chatId, messageId, opts) {
        return this.api.deleteMessage(this.session, chatId, messageId, opts);
    }
    startTyping(body, opts) {
        body.session = this.session;
        return this.api.startTyping(body, opts);
    }
    stopTyping(body, opts) {
        body.session = this.session;
        return this.api.stopTyping(body, opts);
    }
    readMessages(chatId, opts) {
        return this.api.readMessages(this.session, chatId, opts);
    }
    async getMessages(chatId, query, filter, opts) {
        return this.api.getMessages(this.session, chatId, query, filter, opts);
    }
    async getMessageById(chatId, messageId, media, opts) {
        return this.api.getMessageById(this.session, chatId, messageId, media, opts);
    }
    findPNByLid(lid, opts) {
        return this.api.findPNByLid(this.session, lid, opts);
    }
    findLIDByPN(pn, opts) {
        return this.api.findLIDByPN(this.session, pn, opts);
    }
}
exports.WAHASessionAPI = WAHASessionAPI;
//# sourceMappingURL=WAHASelf.js.map