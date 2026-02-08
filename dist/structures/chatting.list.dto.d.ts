import { ChatRequest } from '@waha/structures/chatting.dto';
declare class Row {
    title: string;
    description?: string;
    rowId: string;
}
declare class Section {
    title: string;
    rows: Row[];
}
export declare class SendListMessage {
    title: string;
    description?: string;
    footer?: string;
    button: string;
    sections: Section[];
}
export declare class SendListRequest extends ChatRequest {
    chatId: string;
    message: SendListMessage;
    reply_to?: string;
}
export { Row, Section };
