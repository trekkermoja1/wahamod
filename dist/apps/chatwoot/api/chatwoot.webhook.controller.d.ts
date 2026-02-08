import { ChatWootQueueService } from '@waha/apps/chatwoot/services/ChatWootQueueService';
import { SessionManager } from '@waha/core/abc/manager.abc';
export declare class ChatwootWebhookController {
    private readonly chatWootQueueService;
    private readonly manager;
    constructor(chatWootQueueService: ChatWootQueueService, manager: SessionManager);
    webhook(session: string, id: string, body: any): Promise<{
        success: boolean;
    }>;
}
