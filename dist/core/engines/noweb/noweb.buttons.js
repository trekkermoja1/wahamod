"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomId = randomId;
exports.buttonToJson = buttonToJson;
exports.sendButtonMessage = sendButtonMessage;
const chatting_buttons_dto_1 = require("../../../structures/chatting.buttons.dto");
const esm_1 = require("../../../vendor/esm");
function toName(type) {
    switch (type) {
        case chatting_buttons_dto_1.ButtonType.REPLY:
            return 'quick_reply';
        case chatting_buttons_dto_1.ButtonType.URL:
            return 'cta_url';
        case chatting_buttons_dto_1.ButtonType.CALL:
            return 'cta_call';
        case chatting_buttons_dto_1.ButtonType.COPY:
            return 'cta_copy';
    }
}
function randomId() {
    return Math.random().toString().slice(2, 18);
}
function buttonToJson(button) {
    const name = toName(button.type);
    const buttonParams = {
        display_text: button.text,
        id: button.id || randomId(),
        disabled: false,
    };
    switch (button.type) {
        case chatting_buttons_dto_1.ButtonType.REPLY:
            break;
        case chatting_buttons_dto_1.ButtonType.CALL:
            buttonParams.phone_number = button.phoneNumber;
            break;
        case chatting_buttons_dto_1.ButtonType.COPY:
            buttonParams.copy_code = button.copyCode;
            break;
        case chatting_buttons_dto_1.ButtonType.URL:
            buttonParams.url = button.url;
            buttonParams.merchant_url = button.url;
            break;
    }
    return {
        name: name,
        buttonParamsJson: JSON.stringify(buttonParams),
    };
}
async function sendButtonMessage(sock, chatId, buttons, header, headerImage, body, footer) {
    var _a;
    const data = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    body: undefined,
                    header: undefined,
                    footer: undefined,
                    nativeFlowMessage: {
                        buttons: buttons.map(buttonToJson),
                        messageParamsJson: JSON.stringify({
                            from: 'api',
                            templateId: randomId(),
                        }),
                    },
                },
            },
        },
    };
    if (header || headerImage) {
        data.viewOnceMessage.message.interactiveMessage.header = {
            title: header,
            hasMediaAttachment: !!headerImage,
            imageMessage: headerImage,
        };
    }
    if (body) {
        data.viewOnceMessage.message.interactiveMessage.body = {
            text: body,
        };
    }
    if (footer) {
        data.viewOnceMessage.message.interactiveMessage.footer = {
            text: footer,
        };
    }
    const msg = esm_1.default.b.proto.Message.create(data);
    const fullMessage = esm_1.default.b.generateWAMessageFromContent(chatId, msg, {
        userJid: (_a = sock === null || sock === void 0 ? void 0 : sock.user) === null || _a === void 0 ? void 0 : _a.id,
    });
    await sock.relayMessage(chatId, fullMessage.message, {
        messageId: fullMessage.key.id,
    });
    return fullMessage;
}
//# sourceMappingURL=noweb.buttons.js.map