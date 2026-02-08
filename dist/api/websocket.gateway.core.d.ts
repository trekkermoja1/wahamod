import { BeforeApplicationShutdown } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { WebSocketAuth } from '@waha/core/auth/WebSocketAuth';
import { WebSocket } from '@waha/nestjs/ws/ws';
import { IncomingMessage } from 'http';
import { Server } from 'ws';
export declare enum WebSocketCloseCode {
    NORMAL = 1000,
    GOING_AWAY = 1001,
    PROTOCOL_ERROR = 1002,
    UNSUPPORTED_DATA = 1003,
    POLICY_VIOLATION = 1008,
    INTERNAL_ERROR = 1011
}
export declare class WebsocketGatewayCore implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, BeforeApplicationShutdown {
    private manager;
    private auth;
    HEARTBEAT_INTERVAL: number;
    server: Server;
    private readonly logger;
    private heartbeat;
    private eventUnmask;
    constructor(manager: SessionManager, auth: WebSocketAuth);
    handleConnection(socket: WebSocket, request: IncomingMessage, ...args: any[]): any;
    private getParams;
    handleDisconnect(socket: WebSocket): any;
    beforeApplicationShutdown(signal?: string): Promise<void>;
    afterInit(server: Server): void;
}
