"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineHelper = void 0;
const lodash = require("lodash");
const enums_dto_1 = require("../../../structures/enums.dto");
const version_1 = require("../../../version");
const jids_1 = require("../../../core/utils/jids");
class NOWEBHelper {
    ChatID(message) {
        return message.from;
    }
    CallChatID(call) {
        return call.from;
    }
    WhatsAppMessageKeys(message) {
        const timestamp = parseInt(message.messageTimestamp) * 1000;
        return {
            timestamp: new Date(timestamp),
            from_me: message.key.fromMe,
            chat_id: (0, jids_1.toCusFormat)(message.key.remoteJid),
            message_id: message.key.id,
            participant: message.key.participant,
        };
    }
    IterateMessages(messages) {
        return messages;
    }
    FilterChatIdsForMessages(chats) {
        return chats;
    }
    ContactIsMy(contact) {
        return true;
    }
    SupportsAllChatForMessage() {
        return true;
    }
}
class GOWSHelper {
    ChatID(message) {
        return message.from;
    }
    CallChatID(call) {
        var _a;
        return ((_a = call._data) === null || _a === void 0 ? void 0 : _a.CallCreator) || call.from;
    }
    WhatsAppMessageKeys(message) {
        const Info = message._data.Info;
        const timestamp = new Date(Info.Timestamp).getTime();
        return {
            timestamp: new Date(timestamp),
            from_me: Info.IsFromMe,
            chat_id: (0, jids_1.toCusFormat)(Info.Chat),
            message_id: Info.ID,
            participant: Info.Sender ? (0, jids_1.toCusFormat)(Info.Sender) : null,
        };
    }
    IterateMessages(messages) {
        return messages;
    }
    FilterChatIdsForMessages(chats) {
        return chats;
    }
    SupportsAllChatForMessage() {
        return true;
    }
    ContactIsMy(contact) {
        return true;
    }
}
class WEBJSHelper {
    ChatID(message) {
        var _a, _b;
        return ((_b = (_a = message._data) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.remote) || message.from;
    }
    CallChatID(call) {
        return call.from;
    }
    WhatsAppMessageKeys(message) {
        return {
            timestamp: new Date(message.timestamp * 1000),
            from_me: message.fromMe,
            chat_id: message.from,
            message_id: message.id.id,
            participant: message.author || null,
        };
    }
    IterateMessages(messages) {
        return __asyncGenerator(this, arguments, function* IterateMessages_1() {
            var _a, e_1, _b, _c;
            const buffer = [];
            try {
                for (var _d = true, messages_1 = __asyncValues(messages), messages_1_1; messages_1_1 = yield __await(messages_1.next()), _a = messages_1_1.done, !_a; _d = true) {
                    _c = messages_1_1.value;
                    _d = false;
                    const message = _c;
                    buffer.push(message);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = messages_1.return)) yield __await(_b.call(messages_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
            const sorted = lodash.sortBy(buffer, (item) => item.timestamp);
            for (const message of sorted) {
                yield yield __await(message);
            }
        });
    }
    FilterChatIdsForMessages(chats) {
        if (chats.length == 2) {
            const lidChat = chats.find(jids_1.isLidUser);
            const cusChat = chats.find(jids_1.isPnUser);
            if (lidChat && cusChat) {
                return [lidChat];
            }
        }
        return chats;
    }
    SupportsAllChatForMessage() {
        return false;
    }
    ContactIsMy(contact) {
        return contact.isMyContact;
    }
}
let engineHelper;
switch ((0, version_1.getEngineName)()) {
    case enums_dto_1.WAHAEngine.NOWEB:
        engineHelper = new NOWEBHelper();
        break;
    case enums_dto_1.WAHAEngine.GOWS:
        engineHelper = new GOWSHelper();
        break;
    case enums_dto_1.WAHAEngine.WEBJS:
        engineHelper = new WEBJSHelper();
        break;
    default:
        engineHelper = new WEBJSHelper();
}
exports.EngineHelper = engineHelper;
//# sourceMappingURL=engines.js.map