"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixMessage = void 0;
const templates_1 = require("../../../i18n/templates");
const text_1 = require("./utils/text");
const markdown_1 = require("./utils/markdown");
const lodash = require("lodash");
class PixMessage {
    constructor(l, logger) {
        this.l = l;
        this.logger = logger;
    }
    convert(payload, protoMessage) {
        if (!protoMessage) {
            return null;
        }
        const pixData = this.extractPixData(protoMessage);
        if (!pixData) {
            return null;
        }
        const content = this.l.key(templates_1.TKey.WA_TO_CW_MESSAGE_PIX).r({
            payload: payload,
            message: protoMessage,
            pixData: pixData,
        });
        if ((0, text_1.isEmptyString)(content)) {
            return null;
        }
        return {
            content: (0, markdown_1.WhatsappToMarkdown)(content),
            attachments: [],
            private: undefined,
        };
    }
    extractPixData(protoMessage) {
        var _a, _b, _c, _d;
        const buttons = this.resolveNativeFlowButtons(protoMessage);
        if (!buttons || buttons.length === 0) {
            return null;
        }
        const paymentButton = buttons.find((button) => (button === null || button === void 0 ? void 0 : button.name) === 'payment_info' && (button === null || button === void 0 ? void 0 : button.buttonParamsJson));
        if (!(paymentButton === null || paymentButton === void 0 ? void 0 : paymentButton.buttonParamsJson)) {
            return null;
        }
        let params;
        try {
            params = JSON.parse(paymentButton.buttonParamsJson);
        }
        catch (error) {
            this.logger.warn(`Failed to parse PIX button params: ${error}`);
            return null;
        }
        const pixSettings = (_a = params === null || params === void 0 ? void 0 : params.payment_settings) === null || _a === void 0 ? void 0 : _a.find((setting) => (setting === null || setting === void 0 ? void 0 : setting.type) === 'pix_static_code');
        const pixCode = pixSettings === null || pixSettings === void 0 ? void 0 : pixSettings.pix_static_code;
        if (!pixCode) {
            return null;
        }
        const totalAmountFormatted = this.l.FormatCurrency(params === null || params === void 0 ? void 0 : params.currency, (_b = params === null || params === void 0 ? void 0 : params.total_amount) === null || _b === void 0 ? void 0 : _b.value, (_c = params === null || params === void 0 ? void 0 : params.total_amount) === null || _c === void 0 ? void 0 : _c.offset);
        const data = {
            merchantName: pixCode.merchant_name,
            key: pixCode.key,
            keyType: pixCode.key_type,
            currency: params === null || params === void 0 ? void 0 : params.currency,
            totalAmount: (_d = params === null || params === void 0 ? void 0 : params.total_amount) === null || _d === void 0 ? void 0 : _d.value,
            totalAmountFormatted: totalAmountFormatted,
            referenceId: params === null || params === void 0 ? void 0 : params.reference_id,
        };
        if (lodash.isEmpty(data)) {
            return null;
        }
        return data;
    }
    resolveNativeFlowButtons(protoMessage) {
        var _a;
        let interactiveMessage = protoMessage === null || protoMessage === void 0 ? void 0 : protoMessage.interactiveMessage;
        if (lodash.isEmpty(interactiveMessage)) {
            return null;
        }
        if (!lodash.isEmpty(interactiveMessage
            .interactiveMessage)) {
            interactiveMessage = interactiveMessage.interactiveMessage;
        }
        return (_a = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.nativeFlowMessage) === null || _a === void 0 ? void 0 : _a.buttons;
    }
}
exports.PixMessage = PixMessage;
//# sourceMappingURL=PixMessage.js.map