import { WhatsappSession } from '@waha/core/abc/session.abc';
import { Label, LabelBody, SetLabelsRequest } from '@waha/structures/labels.dto';
import { SessionManager } from '../core/abc/manager.abc';
export declare class LabelsController {
    private manager;
    constructor(manager: SessionManager);
    getAll(session: WhatsappSession): Promise<Label[]>;
    create(session: WhatsappSession, body: LabelBody): Promise<Label>;
    update(session: WhatsappSession, labelId: string, body: LabelBody): Promise<Label>;
    delete(session: WhatsappSession, labelId: string): Promise<any>;
    getChatLabels(session: WhatsappSession, chatId: string): Promise<Label[]>;
    putChatLabels(session: WhatsappSession, chatId: string, request: SetLabelsRequest): void;
    getChatsByLabel(session: WhatsappSession, labelId: string): void;
}
