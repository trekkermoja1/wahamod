import { LoggerService } from '@nestjs/common';
import { WebSocketServer } from 'ws';
export declare class WebsocketHeartbeatJob {
    private logger;
    private intervalTime;
    private interval;
    constructor(logger: LoggerService, intervalTime?: number);
    start(server: WebSocketServer): void;
    stop(): void;
    private onPong;
}
