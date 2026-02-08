"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JidFilter = void 0;
exports.isJidNewsletter = isJidNewsletter;
exports.isJidCus = isJidCus;
exports.isJidGroup = isJidGroup;
exports.isJidStatusBroadcast = isJidStatusBroadcast;
exports.isJidBroadcast = isJidBroadcast;
exports.isJidMetaAI = isJidMetaAI;
exports.isLidUser = isLidUser;
exports.isNullJid = isNullJid;
exports.isPnUser = isPnUser;
exports.normalizeJid = normalizeJid;
exports.toJID = toJID;
exports.jidsFromKey = jidsFromKey;
exports.toCusFormat = toCusFormat;
const session_abc_1 = require("../abc/session.abc");
function isJidNewsletter(jid) {
    return jid === null || jid === void 0 ? void 0 : jid.endsWith('@newsletter');
}
function isJidCus(jid) {
    return jid === null || jid === void 0 ? void 0 : jid.endsWith('@c.us');
}
function isJidGroup(jid) {
    return typeof jid === 'string' && jid.endsWith('@g.us');
}
function isJidStatusBroadcast(jid) {
    return jid === 'status@broadcast';
}
function isJidBroadcast(jid) {
    return typeof jid === 'string' && jid.endsWith('@broadcast');
}
function isJidMetaAI(jid) {
    return typeof jid === 'string' && jid.endsWith('@meta.ai');
}
function isLidUser(jid) {
    return typeof jid === 'string' && jid.endsWith('@lid');
}
function isNullJid(jid) {
    if (!jid) {
        return false;
    }
    return jid === '0@c.us' || jid === '0@s.whatsapp.net';
}
function isPnUser(jid) {
    if (typeof jid !== 'string') {
        return false;
    }
    if (!jid.endsWith('@s.whatsapp.net') && !jid.endsWith('@c.us')) {
        return false;
    }
    if (isNullJid(jid)) {
        return false;
    }
    return true;
}
function normalizeJid(jid) {
    return jid.replace(/:\d+(?=@)/, '');
}
function toJID(chatId) {
    if (isJidGroup(chatId)) {
        return chatId;
    }
    if (isJidBroadcast(chatId)) {
        return chatId;
    }
    if (isJidNewsletter(chatId)) {
        return chatId;
    }
    if (isLidUser(chatId)) {
        return chatId;
    }
    if (isJidMetaAI(chatId)) {
        return chatId;
    }
    const number = chatId.split('@')[0];
    return number + '@s.whatsapp.net';
}
class JidFilter {
    constructor(ignore) {
        this.ignore = ignore;
    }
    include(jid) {
        if (this.ignore.status && isJidStatusBroadcast(jid)) {
            return false;
        }
        else if (this.ignore.broadcast &&
            !isJidStatusBroadcast(jid) &&
            isJidBroadcast(jid)) {
            return false;
        }
        else if (this.ignore.groups && isJidGroup(jid)) {
            return false;
        }
        else if (this.ignore.channels && isJidNewsletter(jid)) {
            return false;
        }
        else if (this.ignore.dm && isLidUser(jid)) {
            return false;
        }
        else if (this.ignore.dm && isPnUser(jid)) {
            return false;
        }
        return true;
    }
}
exports.JidFilter = JidFilter;
function jidsFromKey(key) {
    if (isLidUser(key.remoteJid)) {
        return {
            lid: key.remoteJid,
            pn: key.remoteJidAlt,
        };
    }
    else if (isPnUser(key.remoteJid)) {
        return {
            lid: key.remoteJidAlt,
            pn: key.remoteJid,
        };
    }
    else if (isLidUser(key.participant)) {
        return {
            lid: key.participant,
            pn: key.participantAlt,
        };
    }
    else if (isPnUser(key.participant)) {
        return {
            lid: key.remoteJid,
            pn: key.participantAlt,
        };
    }
    return null;
}
function toCusFormat(remoteJid) {
    if (!remoteJid) {
        return remoteJid;
    }
    if (isJidGroup(remoteJid)) {
        return remoteJid;
    }
    if (isJidBroadcast(remoteJid)) {
        return remoteJid;
    }
    if (isLidUser(remoteJid)) {
        return normalizeJid(remoteJid);
    }
    if (isJidNewsletter(remoteJid)) {
        return remoteJid;
    }
    if (remoteJid == 'me') {
        return remoteJid;
    }
    let number = remoteJid.split('@')[0];
    number = number.split(':')[0];
    return (0, session_abc_1.ensureSuffix)(number);
}
//# sourceMappingURL=jids.js.map