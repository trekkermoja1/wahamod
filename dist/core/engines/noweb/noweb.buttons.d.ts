import { Button } from '@waha/structures/chatting.buttons.dto';
export declare function randomId(): string;
export declare function buttonToJson(button: Button): {
    name: string;
    buttonParamsJson: string;
};
export declare function sendButtonMessage(sock: any, chatId: string, buttons: Button[], header?: string, headerImage?: any, body?: string, footer?: string): Promise<import("@adiwajshing/baileys").WAMessage>;
