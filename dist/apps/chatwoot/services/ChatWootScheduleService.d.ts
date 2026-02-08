import { PinoLogger } from 'nestjs-pino';
import { QueueRegistry } from './QueueRegistry';
export declare class ChatWootScheduleService {
    protected logger: PinoLogger;
    private readonly queueRegistry;
    constructor(logger: PinoLogger, queueRegistry: QueueRegistry);
    schedule(appId: string, sessionName: string): Promise<void>;
    unschedule(appId: string, sessionName: string): Promise<void>;
    private JobId;
    static SingleJobId(appId: string): string;
}
