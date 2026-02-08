"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShouldProcessCall = ShouldProcessCall;
exports.BuildFakeCallMessageId = BuildFakeCallMessageId;
exports.BuildCallMessagePayload = BuildCallMessagePayload;
const responses_dto_1 = require("../../../../structures/responses.dto");
const ids_1 = require("../../../../core/utils/ids");
const enums_dto_1 = require("../../../../structures/enums.dto");
const waha_1 = require("../../waha");
function ShouldProcessCall(event) {
    if (event.payload.isGroup) {
        return false;
    }
    return true;
}
const SUFFIX = {
    [enums_dto_1.WAHAEvents.CALL_RECEIVED]: '0',
    [enums_dto_1.WAHAEvents.CALL_ACCEPTED]: '1',
    [enums_dto_1.WAHAEvents.CALL_REJECTED]: '2',
};
function BuildFakeCallMessageId(id, event) {
    return id + SUFFIX[event];
}
function BuildCallMessagePayload(call, event) {
    const key = {
        fromMe: false,
        remoteJid: waha_1.EngineHelper.CallChatID(call),
        id: BuildFakeCallMessageId(call.id, event),
    };
    const id = (0, ids_1.SerializeMessageKey)(key);
    return Object.assign(Object.assign({}, call), { callId: call.id, id: id, from: waha_1.EngineHelper.CallChatID(call), fromMe: false, source: responses_dto_1.MessageSource.APP });
}
//# sourceMappingURL=call.0.base.js.map