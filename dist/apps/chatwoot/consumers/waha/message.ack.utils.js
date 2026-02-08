"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShouldMarkAsReadInChatWoot = ShouldMarkAsReadInChatWoot;
const wa_1 = require("../../../../utils/wa");
const enums_dto_1 = require("../../../../structures/enums.dto");
const jids_1 = require("../../../../core/utils/jids");
const waha_1 = require("../../waha");
function ShouldMarkAsReadInChatWoot(event) {
    const chatId = waha_1.EngineHelper.ChatID(event.payload);
    if (!(0, wa_1.isJidCusFormat)(chatId) && !(0, jids_1.isLidUser)(chatId)) {
        return false;
    }
    const payload = event.payload;
    const read = payload.ack === enums_dto_1.WAMessageAck.READ;
    const played = payload.ack == enums_dto_1.WAMessageAck.PLAYED;
    if (!read && !played) {
        return false;
    }
    if (!payload.fromMe) {
        return false;
    }
    return true;
}
//# sourceMappingURL=message.ack.utils.js.map