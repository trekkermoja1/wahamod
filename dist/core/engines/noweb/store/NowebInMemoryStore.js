"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowebInMemoryStore = void 0;
const common_1 = require("@nestjs/common");
const Paginator_1 = require("../../../../utils/Paginator");
const make_in_memory_store_1 = require("./memory/make-in-memory-store");
const logger = require('pino')();
class NowebInMemoryStore {
    constructor() {
        this.errorMessage = 'Enable NOWEB store "config.noweb.store.enabled=True" and "config.noweb.store.full_sync=True" when starting a new session. ' +
            'Read more: https://waha.devlike.pro/docs/engines/noweb#store';
        this.store = (0, make_in_memory_store_1.default)({ logger: logger });
        const presences = {};
        this.store.presences = presences;
        this.store.setPresences(presences);
    }
    init() {
        return;
    }
    close() {
        return;
    }
    get presences() {
        return this.store.presences;
    }
    bind(ev, socket) {
        this.store.bind(ev);
        this.socket = socket;
    }
    loadMessage(jid, id) {
        return this.store.loadMessage(jid, id);
    }
    getMessagesByJid(chatId, filter, pagination) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getMessageById(chatId, messageId) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getChats(pagination, broadcast) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getChat(jid) {
        return null;
    }
    getContacts(pagination) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getContactById(jid) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getLabels() {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getLabelById(labelId) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getChatsByLabelId(labelId) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getChatLabels(chatId) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    async getGroups(pagination) {
        var _a;
        const response = await ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.groupFetchAllParticipating());
        const groups = Object.values(response);
        const paginator = new Paginator_1.PaginatorInMemory(pagination);
        return paginator.apply(groups);
    }
    resetGroupsCache() {
        return;
    }
    getAllLids(pagination) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    findLidByPN(pn) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    findPNByLid(lid) {
        throw new common_1.BadRequestException(this.errorMessage);
    }
    getLidsCount() {
        throw new common_1.BadRequestException(this.errorMessage);
    }
}
exports.NowebInMemoryStore = NowebInMemoryStore;
//# sourceMappingURL=NowebInMemoryStore.js.map