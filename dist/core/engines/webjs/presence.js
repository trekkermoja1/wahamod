"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagPresenceToPresence = TagPresenceToPresence;
exports.TagChatstateToPresence = TagChatstateToPresence;
const enums_dto_1 = require("../../../structures/enums.dto");
const ack_webjs_1 = require("./ack.webjs");
const jids_1 = require("../../utils/jids");
function TagPresenceToPresence(node) {
    const { attrs } = node;
    const id = (0, ack_webjs_1.jid)(attrs.from);
    const state = attrs.type === 'unavailable'
        ? enums_dto_1.WAHAPresenceStatus.OFFLINE
        : enums_dto_1.WAHAPresenceStatus.ONLINE;
    const lastSeen = attrs.last && attrs.last !== 'deny' ? +attrs.last : null;
    return {
        id: (0, jids_1.toCusFormat)(id),
        presences: [
            {
                participant: (0, jids_1.toCusFormat)(id),
                lastKnownPresence: state,
                lastSeen: lastSeen,
            },
        ],
    };
}
function TagChatstateToPresence(node) {
    var _a;
    const { attrs, content } = node;
    const id = (0, ack_webjs_1.jid)(attrs.from);
    const participant = (0, ack_webjs_1.jid)(attrs.participant) || (0, ack_webjs_1.jid)(attrs.from);
    const firstChild = content[0];
    const type = firstChild.tag;
    let status = enums_dto_1.WAHAPresenceStatus.OFFLINE;
    switch (type) {
        case 'unavailable':
            status = enums_dto_1.WAHAPresenceStatus.OFFLINE;
            break;
        case 'available':
            status = enums_dto_1.WAHAPresenceStatus.ONLINE;
            break;
        case 'paused':
            status = enums_dto_1.WAHAPresenceStatus.PAUSED;
            break;
        case 'composing':
            status = enums_dto_1.WAHAPresenceStatus.TYPING;
            break;
    }
    if (((_a = firstChild.attrs) === null || _a === void 0 ? void 0 : _a.media) === 'audio') {
        status = enums_dto_1.WAHAPresenceStatus.RECORDING;
    }
    return {
        id: (0, jids_1.toCusFormat)(id),
        presences: [
            {
                participant: (0, jids_1.toCusFormat)(participant),
                lastKnownPresence: status,
                lastSeen: null,
            },
        ],
    };
}
//# sourceMappingURL=presence.js.map