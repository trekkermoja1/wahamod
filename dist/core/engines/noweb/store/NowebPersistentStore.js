"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowebPersistentStore = void 0;
const jids_1 = require("../../../utils/jids");
const pagination_dto_1 = require("../../../../structures/pagination.dto");
const DefaultMap_1 = require("../../../../utils/DefaultMap");
const promiseTimeout_1 = require("../../../../utils/promiseTimeout");
const lodash = require("lodash");
const lodash_1 = require("lodash");
const LabelAssociationType_1 = require("../labels/LabelAssociationType");
const esm_1 = require("../../../../vendor/esm");
const AsyncLock = require('async-lock');
const HOUR = 60 * 60 * 1000;
class NowebPersistentStore {
    constructor(logger, storage, jids) {
        this.logger = logger;
        this.storage = storage;
        this.jids = jids;
        this.lock = new AsyncLock({
            maxPending: Infinity,
            maxExecutionTime: 60000,
        });
        this.groupsFetchLock = new AsyncLock({
            timeout: 5000,
            maxPending: Infinity,
            maxExecutionTime: 60000,
        });
        this.lastTimeGroupUpdate = new Date(0);
        this.lastTimeGroupFetch = new Date(0);
        this.GROUP_METADATA_CACHE_TIME = 24 * HOUR;
        this.socket = null;
        this.chatRepo = storage.getChatRepository();
        this.groupRepo = storage.getGroupRepository();
        this.contactRepo = storage.getContactsRepository();
        this.messagesRepo = storage.getMessagesRepository();
        this.labelsRepo = storage.getLabelsRepository();
        this.labelAssociationsRepo = storage.getLabelAssociationRepository();
        this.lidRepo = storage.getLidPNRepository();
        this.presences = {};
    }
    init() {
        return this.storage.init();
    }
    bind(ev, socket) {
        ev.on('messaging-history.set', (data) => this.onMessagingHistorySet(data));
        ev.on('messages.upsert', (data) => {
            this.withLock('messages', () => this.onMessagesUpsert(data));
            this.withNoLock('lids', async () => {
                const messages = data.messages;
                if (!messages) {
                    return;
                }
                const contacts = messages
                    .map((message) => {
                    if (!message.key) {
                        return null;
                    }
                    const jids = (0, jids_1.jidsFromKey)(message.key);
                    if (!jids) {
                        return null;
                    }
                    let { lid, pn } = jids;
                    if (pn && !pn.includes('@')) {
                        pn = `${pn}@s.whatsapp.net`;
                    }
                    if (pn && !(0, jids_1.isPnUser)(pn)) {
                        pn = esm_1.default.b.jidNormalizedUser(pn);
                    }
                    return {
                        id: message.key.remoteJid,
                        lid: lid,
                        jid: pn,
                    };
                })
                    .filter(Boolean);
                const lids = await this.handleLidPNUpdates(contacts);
                this.logger.debug(`messages.upsert - '${lids.length}' synced lid to pn mapping`);
            });
        });
        ev.on('messages.update', (data) => this.withLock('messages', () => this.onMessageUpdate(data)));
        ev.on('messages.delete', (data) => this.withLock('messages', () => this.onMessageDelete(data)));
        ev.on('messages.reaction', (data) => this.withLock('messages', () => this.onMessageReaction(data)));
        ev.on('message-receipt.update', (data) => this.withLock('messages', () => this.onMessageReceiptUpdate(data)));
        ev.on('chats.upsert', (data) => this.withLock('chats', () => this.onChatUpsert(data)));
        ev.on('chats.update', (data) => this.withLock('chats', () => this.onChatUpdate(data)));
        ev.on('chats.delete', (data) => this.withLock('chats', () => this.onChatDelete(data)));
        ev.on('groups.upsert', (data) => this.withLock('groups', () => this.onGroupUpsert(data)));
        ev.on('groups.update', (data) => {
            this.withLock('groups', () => this.onGroupUpdate(data));
            this.withNoLock('lids', async () => {
                const participants = lodash.flatMap(data, (g) => (g === null || g === void 0 ? void 0 : g.participants) || []);
                const lids = await this.handleLidPNUpdates(participants);
                this.logger.debug(`groups.update - '${lids.length}' synced lid to pn mapping`);
            });
        });
        ev.on('group-participants.update', (data) => this.withLock(`group-${data.id}`, () => this.onGroupParticipantsUpdate(data)));
        ev.on('lid-mapping.update', (data) => {
            this.withLock('lids', async () => {
                const lids = await this.handleLidPNUpdates([data]);
                this.logger.debug(`lid-mapping.update - '${lids.length}' synced lid to pn mapping`);
            });
        });
        ev.on('contacts.upsert', (data) => {
            this.withLock('contacts', () => this.onContactsUpsert(data));
            this.withNoLock('lids', async () => {
                const lids = await this.handleLidPNUpdates(data);
                this.logger.debug(`contacts.upsert - '${lids.length}' synced lid to pn mapping`);
            });
        });
        ev.on('contacts.update', (data) => {
            this.withLock('contacts', () => this.onContactUpdate(data));
            this.withNoLock('lids', async () => {
                const lids = await this.handleLidPNUpdates(data);
                this.logger.debug(`contacts.update - '${lids.length}' synced lid to pn mapping`);
            });
        });
        ev.on('labels.edit', (data) => this.onLabelsEdit(data));
        ev.on('labels.association', ({ association, type }) => this.onLabelsAssociation(association, type));
        ev.on('presence.update', (data) => this.onPresenceUpdate(data));
        this.socket = socket;
    }
    async close() {
        var _a;
        await ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.close().catch((error) => {
            this.logger.warn(`Failed to close storage: ${error}`);
        }));
        return;
    }
    async onMessagingHistorySet(history) {
        const { contacts, chats, messages } = history;
        await Promise.all([
            this.withLock('contacts', async () => {
                await this.onContactsUpsert(contacts);
                this.logger.info(`history sync - '${contacts.length}' synced contacts`);
            }),
            this.withNoLock('lids', async () => {
                const lids = await this.handleLidPNUpdates(contacts);
                this.logger.info(`history sync - '${lids.length}' synced lid to pn mapping`);
            }),
            this.withLock('chats', () => this.onChatUpsert(chats)),
            this.withLock('messages', () => this.syncMessagesHistory(messages)),
        ]);
    }
    async syncMessagesHistory(messages) {
        const realMessages = messages.filter(esm_1.default.b.isRealMessage);
        messages = messages.filter((msg) => this.jids.include(msg.key.remoteJid));
        await this.messagesRepo.upsert(realMessages);
        this.logger.info(`history sync - '${messages.length}' got messages, '${realMessages.length}' real messages`);
    }
    async onMessagesUpsert(update) {
        const type = update.type;
        if (type !== 'notify' && type !== 'append') {
            this.logger.debug(`unexpected type for messages.upsert: '${type}'`);
            return;
        }
        let messages = update.messages;
        messages = messages.filter((msg) => this.jids.include(msg.key.remoteJid));
        const realMessages = messages.filter(esm_1.default.b.isRealMessage);
        await this.messagesRepo.upsert(realMessages);
        this.logger.debug(`messages.upsert - ${messages.length} got messages, ${realMessages.length} real messages`);
    }
    async onMessageUpdate(updates) {
        for (const update of updates) {
            const jid = esm_1.default.b.jidNormalizedUser(update.key.remoteJid);
            if (!this.jids.include(jid)) {
                continue;
            }
            if (!update.key.id) {
                continue;
            }
            if (!jid) {
                this.logger.warn(`got message update for unknown jid. update: '${JSON.stringify(update)}'`);
                continue;
            }
            const message = await this.messagesRepo.getByJidById(jid, update.key.id);
            if (!message) {
                this.logger.warn(`got update for non-existent message. update: '${JSON.stringify(update)}'`);
                continue;
            }
            const fields = Object.assign({}, update.update);
            const onlyStatusField = Object.keys(fields).length === 1 &&
                'status' in fields &&
                fields.status !== null;
            if (onlyStatusField) {
                if (message.status >= fields.status) {
                    continue;
                }
            }
            delete fields['key'];
            Object.assign(message, fields);
            const isYetRealMessage = esm_1.default.b.isRealMessage(message) || false;
            if (isYetRealMessage) {
                await this.messagesRepo.upsertOne(message);
            }
            else {
                await this.messagesRepo.deleteByJidByIds(jid, [update.key.id]);
            }
        }
    }
    async onMessageDelete(item) {
        if ('all' in item) {
            await this.messagesRepo.deleteAllByJid(item.jid);
            return;
        }
        const jid = esm_1.default.b.jidNormalizedUser(item.keys[0].remoteJid);
        const ids = item.keys.map((key) => key.id);
        await this.messagesRepo.deleteByJidByIds(jid, ids);
    }
    async onChatUpsert(chats) {
        for (const chat of chats) {
            delete chat['messages'];
            chat.conversationTimestamp = (0, lodash_1.toNumber)(chat.conversationTimestamp) || null;
        }
        chats = chats.filter((chat) => this.jids.include(chat.id));
        await this.chatRepo.upsertMany(chats);
        this.logger.info(`store sync - '${chats.length}' synced chats`);
    }
    async onGroupUpsert(groups) {
        for (const group of groups) {
            if (!this.jids.include(group.id)) {
                continue;
            }
            await this.groupRepo.save(group);
        }
        this.logger.info(`store sync - '${groups.length}' synced groups`);
    }
    async onGroupUpdate(groups) {
        for (const update of groups) {
            if (!this.jids.include(update.id)) {
                continue;
            }
            let group = await this.groupRepo.getById(update.id);
            group = Object.assign(group || {}, update);
            await this.groupRepo.save(group);
        }
        this.logger.info(`store sync - '${groups.length}' updated groups`);
        this.lastTimeGroupUpdate = new Date();
    }
    async onGroupParticipantsUpdate(data) {
        var _a, _b, _c, _d;
        const id = data.id;
        if (!this.jids.include(id)) {
            return;
        }
        const participants = data.participants;
        const action = data.action;
        if (action == 'remove') {
            const myJid = (_d = (_c = (_b = (_a = this.socket) === null || _a === void 0 ? void 0 : _a.authState) === null || _b === void 0 ? void 0 : _b.creds) === null || _c === void 0 ? void 0 : _c.me) === null || _d === void 0 ? void 0 : _d.id;
            const participantsIncludesMe = lodash.find(participants, (p) => esm_1.default.b.areJidsSameUser(p, myJid));
            if (participantsIncludesMe) {
                await this.groupRepo.deleteById(id);
                return;
            }
        }
        let group = await this.groupRepo.getById(id);
        if (!group) {
            group = { id: id, participants: [] };
        }
        if (!group.participants) {
            group.participants = [];
        }
        const participantsById = new DefaultMap_1.DefaultMap((key) => {
            return { id: key, admin: null };
        });
        for (const participant of group.participants) {
            participantsById.set(participant.id, participant);
        }
        for (const participant of participants) {
            this.participantUpdate(participantsById, participant, action);
        }
        group.participants = Array.from(participantsById.values());
        await this.groupRepo.save(group);
    }
    participantUpdate(participantsById, participant, action) {
        switch (action) {
            case 'add':
                participantsById.get(participant);
                break;
            case 'remove':
                participantsById.delete(participant);
                break;
            case 'promote':
                participantsById.get(participant).admin = 'admin';
                break;
            case 'demote':
                participantsById.get(participant).admin = null;
                break;
        }
    }
    async onChatUpdate(updates) {
        for (const update of updates) {
            if (!this.jids.include(update.id)) {
                continue;
            }
            const chat = (await this.chatRepo.getById(update.id)) || {};
            Object.assign(chat, update);
            chat.conversationTimestamp = (0, lodash_1.toNumber)(chat.conversationTimestamp) || null;
            delete chat['messages'];
            await this.chatRepo.save(chat);
        }
    }
    async onChatDelete(ids) {
        for (const id of ids) {
            await this.chatRepo.deleteById(id);
            await this.messagesRepo.deleteAllByJid(id);
        }
    }
    withLock(key, fn) {
        return this.lock.acquire(key, fn);
    }
    withNoLock(key, fn) {
        return fn();
    }
    async onContactsUpsert(contacts) {
        const upserts = [];
        const ids = contacts.map((c) => c.id);
        const contactById = await this.contactRepo.getEntitiesByIds(ids);
        for (const update of contacts) {
            if (!this.jids.include(update.id)) {
                continue;
            }
            const contact = contactById.get(update.id) || {};
            Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
            const result = Object.assign(Object.assign({}, contact), update);
            upserts.push(result);
        }
        await this.contactRepo.upsertMany(upserts);
    }
    async onContactUpdate(updates) {
        var _a;
        for (const update of updates) {
            if (!this.jids.include(update.id)) {
                continue;
            }
            let contact = await this.contactRepo.getById(update.id);
            if (!contact) {
                this.logger.warn(`got update for non-existent contact. update: '${JSON.stringify(update)}'`);
                contact = {};
            }
            Object.assign(contact, update);
            if (update.imgUrl === 'changed') {
                contact.imgUrl = this.socket
                    ? await ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.profilePictureUrl(contact.id).catch((error) => {
                        this.logger.warn(`failed to get profile picture for contact '${contact.id}': ${error}`);
                        return undefined;
                    }))
                    : undefined;
            }
            else if (update.imgUrl === 'removed') {
                delete contact.imgUrl;
            }
            await this.onContactsUpsert([contact]);
        }
    }
    async onMessageReaction(reactions) {
        for (const { key, reaction } of reactions) {
            if (!this.jids.include(key.remoteJid)) {
                continue;
            }
            const msg = await this.messagesRepo.getByJidById(key.remoteJid, key.id);
            if (!msg) {
                this.logger.warn(`got reaction update for non-existent message. key: '${JSON.stringify(key)}'`);
                continue;
            }
            esm_1.default.b.updateMessageWithReaction(msg, reaction);
            await this.messagesRepo.upsertOne(msg);
        }
    }
    async onMessageReceiptUpdate(updates) {
        for (const { key, receipt } of updates) {
            if (!this.jids.include(key.remoteJid)) {
                continue;
            }
            const msg = await this.messagesRepo.getByJidById(key.remoteJid, key.id);
            if (!msg) {
                this.logger.warn(`got receipt update for non-existent message. key: '${JSON.stringify(key)}'`);
                continue;
            }
            esm_1.default.b.updateMessageWithReceipt(msg, receipt);
            await this.messagesRepo.upsertOne(msg);
        }
    }
    async onLabelsEdit(label) {
        if (label.deleted) {
            await this.labelsRepo.deleteById(label.id);
            await this.labelAssociationsRepo.deleteByLabelId(label.id);
        }
        else {
            await this.labelsRepo.save(label);
        }
    }
    async onLabelsAssociation(association, type) {
        if (type === 'remove') {
            await this.labelAssociationsRepo.deleteOne(association);
        }
        else {
            await this.labelAssociationsRepo.save(association);
        }
    }
    async onPresenceUpdate({ id, presences: update }) {
        if (!this.jids.include(id)) {
            return;
        }
        this.presences[id] = this.presences[id] || {};
        Object.assign(this.presences[id], update);
    }
    async loadMessage(jid, id) {
        let data;
        if (!jid) {
            data = await this.messagesRepo.getById(id);
        }
        else {
            data = await this.messagesRepo.getByJidById(jid, id);
        }
        if (!data) {
            return null;
        }
        return esm_1.default.b.proto.WebMessageInfo.create(data);
    }
    getMessagesByJid(chatId, filter, pagination) {
        pagination.sortBy = 'messageTimestamp';
        pagination.sortOrder = pagination.sortOrder || pagination_dto_1.SortOrder.DESC;
        return this.messagesRepo.getAllByJid(chatId, filter, pagination);
    }
    getMessageById(chatId, messageId) {
        return this.messagesRepo.getByJidById(chatId, messageId);
    }
    getChats(pagination, broadcast, filter) {
        pagination.sortBy || (pagination.sortBy = 'conversationTimestamp');
        pagination.sortOrder || (pagination.sortOrder = pagination_dto_1.SortOrder.DESC);
        return this.chatRepo.getAllWithMessages(pagination, broadcast, filter);
    }
    async getChat(jid) {
        return await this.chatRepo.getById(jid);
    }
    shouldFetchGroup() {
        const timePassed = new Date().getTime() - this.lastTimeGroupFetch.getTime();
        return timePassed > this.GROUP_METADATA_CACHE_TIME;
    }
    async fetchGroups() {
        await this.groupsFetchLock.acquire('groups-fetch', async () => {
            var _a;
            if (!this.shouldFetchGroup()) {
                return;
            }
            const lastTimeGroupUpdate = this.lastTimeGroupUpdate;
            await this.groupRepo.deleteAll();
            await ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.groupFetchAllParticipating());
            await (0, promiseTimeout_1.waitUntil)(async () => this.lastTimeGroupUpdate > lastTimeGroupUpdate, 100, 5000);
            this.lastTimeGroupFetch = new Date();
        });
    }
    resetGroupsCache() {
        this.lastTimeGroupFetch = new Date(0);
    }
    async getGroups(pagination) {
        if (this.shouldFetchGroup()) {
            await this.fetchGroups();
        }
        return this.groupRepo.getAll(pagination);
    }
    getContactById(jid) {
        return this.contactRepo.getById(jid);
    }
    getContacts(pagination) {
        return this.contactRepo.getAll(pagination);
    }
    getLabels() {
        return this.labelsRepo.getAll();
    }
    getLabelById(labelId) {
        return this.labelsRepo.getById(labelId);
    }
    async getChatsByLabelId(labelId) {
        const associations = await this.labelAssociationsRepo.getAssociationsByLabelId(labelId, LabelAssociationType_1.LabelAssociationType.Chat);
        const ids = associations.map((association) => association.chatId);
        return await this.chatRepo.getAllByIds(ids);
    }
    async getChatLabels(chatId) {
        const associations = await this.labelAssociationsRepo.getAssociationsByChatId(chatId);
        const ids = associations.map((association) => association.labelId);
        return await this.labelsRepo.getAllByIds(ids);
    }
    async handleLidPNUpdates(contacts) {
        let lids = [];
        for (const contact of contacts) {
            if ((0, jids_1.isPnUser)(contact.id) && (0, jids_1.isLidUser)(contact.lid)) {
                lids.push({
                    pn: contact.id,
                    id: contact.lid,
                });
            }
            else if ((0, jids_1.isPnUser)(contact.phoneNumber) && (0, jids_1.isLidUser)(contact.lid)) {
                lids.push({
                    pn: contact.phoneNumber,
                    id: contact.lid,
                });
            }
            else if ((0, jids_1.isPnUser)(contact.phoneNumber) && (0, jids_1.isLidUser)(contact.id)) {
                lids.push({
                    pn: contact.phoneNumber,
                    id: contact.id,
                });
            }
        }
        lids = lodash.uniqBy(lids, 'id');
        if (lids.length > 0) {
            await this.lidRepo.saveLids(lids);
        }
        return lids;
    }
    async getAllLids(pagination) {
        const lids = await this.lidRepo.getAllLids(pagination);
        return lids.map((value) => {
            return {
                lid: value.id,
                pn: value.pn,
            };
        });
    }
    getLidsCount() {
        return this.lidRepo.getLidsCount();
    }
    findPNByLid(lid) {
        return this.lidRepo.findPNByLid(lid);
    }
    findLidByPN(pn) {
        return this.lidRepo.findLidByPN(pn);
    }
}
exports.NowebPersistentStore = NowebPersistentStore;
//# sourceMappingURL=NowebPersistentStore.js.map