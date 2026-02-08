"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jid = jid;
exports.TagReceiptNodeToReceiptEvent = TagReceiptNodeToReceiptEvent;
const jids_1 = require("../../utils/jids");
const esm_1 = require("../../../vendor/esm");
function jid(field) {
    if (!field) {
        return field;
    }
    const data = field['$1'];
    if (!data) {
        return data;
    }
    let server = data.server;
    if (!server) {
        server =
            data.domainType === 0 || data.domainType === 128
                ? 's.whatsapp.net'
                : 'lid';
    }
    return esm_1.default.b.jidEncode(data.user, server, data.device);
}
function TagReceiptNodeToReceiptEvent(node, me) {
    const { attrs, content } = node;
    const status = esm_1.default.b.getStatusFromReceiptType(attrs.type);
    if (status == null) {
        return [];
    }
    const from = esm_1.default.b.jidNormalizedUser(jid(attrs.from));
    const participant = esm_1.default.b.jidNormalizedUser(jid(attrs.participant));
    const recipient = esm_1.default.b.jidNormalizedUser(jid(attrs.recipient));
    const isLid = from.includes('lid');
    const isNodeFromMe = esm_1.default.b.areJidsSameUser(participant || from, isLid ? me === null || me === void 0 ? void 0 : me.lid : me === null || me === void 0 ? void 0 : me.id);
    const remoteJid = !isNodeFromMe || (0, jids_1.isJidGroup)(from) ? from : recipient;
    const fromMe = !recipient || (attrs.type === 'retry' && isNodeFromMe);
    if (status < esm_1.default.b.proto.WebMessageInfo.Status.SERVER_ACK && isNodeFromMe) {
        return [];
    }
    const key = {
        remoteJid: remoteJid,
        id: '',
        fromMe: fromMe,
    };
    const ids = [attrs.id];
    if (Array.isArray(content)) {
        const items = esm_1.default.b.getBinaryNodeChildren(content[0], 'item');
        ids.push(...items.map((i) => i.attrs.id));
    }
    if ((0, jids_1.isJidGroup)(remoteJid) || (0, jids_1.isJidStatusBroadcast)(remoteJid)) {
        if (participant) {
            key.participant = fromMe ? (isLid ? me.lid : me.id) : recipient;
            const eventParticipant = fromMe ? participant : isLid ? me.lid : me.id;
            return [
                {
                    key: key,
                    messageIds: ids,
                    status: status,
                    participant: eventParticipant,
                    _node: node,
                },
            ];
        }
        else {
            return handleGroupedReceipts(node, key, status, fromMe, isLid, me);
        }
    }
    return [
        {
            key: key,
            messageIds: ids,
            status: status,
            _node: node,
        },
    ];
}
function handleGroupedReceipts(node, key, status, fromMe, isLid, me) {
    var _a;
    const { content } = node;
    if (!Array.isArray(content)) {
        return [];
    }
    const participantsTags = content.filter((c) => c.tag === 'participants');
    if (participantsTags.length === 0) {
        return [];
    }
    const receiptEvents = [];
    for (const participants of participantsTags) {
        const participantKey = (_a = participants.attrs) === null || _a === void 0 ? void 0 : _a.key;
        if (!participantKey)
            continue;
        const users = esm_1.default.b.getBinaryNodeChildren(participants, 'user');
        for (const user of users) {
            const userAttrs = user.attrs;
            if (!userAttrs)
                continue;
            const userJid = esm_1.default.b.jidNormalizedUser(jid(userAttrs.jid));
            if (!userJid)
                continue;
            key.participant = fromMe ? (isLid ? me.lid : me.id) : userJid;
            const eventParticipant = fromMe ? userJid : isLid ? me.lid : me.id;
            const receiptEvent = {
                key: Object.assign(Object.assign({}, key), { id: participantKey }),
                messageIds: [participantKey],
                status: status,
                participant: eventParticipant,
                _node: node,
            };
            receiptEvents.push(receiptEvent);
        }
    }
    return receiptEvents;
}
//# sourceMappingURL=ack.webjs.js.map