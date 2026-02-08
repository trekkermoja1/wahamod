"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGatewayCore = exports.WebSocketCloseCode = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("@nestjs/terminus/dist/utils");
const websockets_1 = require("@nestjs/websockets");
const manager_abc_1 = require("../core/abc/manager.abc");
const WebSocketAuth_1 = require("../core/auth/WebSocketAuth");
const WebsocketHeartbeatJob_1 = require("../nestjs/ws/WebsocketHeartbeatJob");
const enums_dto_1 = require("../structures/enums.dto");
const events_1 = require("../utils/events");
const ids_1 = require("../utils/ids");
const url = require("url");
const ws_1 = require("ws");
var WebSocketCloseCode;
(function (WebSocketCloseCode) {
    WebSocketCloseCode[WebSocketCloseCode["NORMAL"] = 1000] = "NORMAL";
    WebSocketCloseCode[WebSocketCloseCode["GOING_AWAY"] = 1001] = "GOING_AWAY";
    WebSocketCloseCode[WebSocketCloseCode["PROTOCOL_ERROR"] = 1002] = "PROTOCOL_ERROR";
    WebSocketCloseCode[WebSocketCloseCode["UNSUPPORTED_DATA"] = 1003] = "UNSUPPORTED_DATA";
    WebSocketCloseCode[WebSocketCloseCode["POLICY_VIOLATION"] = 1008] = "POLICY_VIOLATION";
    WebSocketCloseCode[WebSocketCloseCode["INTERNAL_ERROR"] = 1011] = "INTERNAL_ERROR";
})(WebSocketCloseCode || (exports.WebSocketCloseCode = WebSocketCloseCode = {}));
let WebsocketGatewayCore = class WebsocketGatewayCore {
    constructor(manager, auth) {
        this.manager = manager;
        this.auth = auth;
        this.HEARTBEAT_INTERVAL = 60000;
        this.eventUnmask = new events_1.EventWildUnmask(enums_dto_1.WAHAEvents, enums_dto_1.WAHAEventsWild);
        this.logger = new common_1.Logger('WebsocketGateway');
        this.heartbeat = new WebsocketHeartbeatJob_1.WebsocketHeartbeatJob(this.logger, this.HEARTBEAT_INTERVAL);
    }
    handleConnection(socket, request, ...args) {
        socket.id = (0, ids_1.generatePrefixedId)('wsc');
        if (!this.auth.validateRequest(request)) {
            socket.close(WebSocketCloseCode.POLICY_VIOLATION, 'Unauthorized');
            this.logger.debug(`Unauthorized websocket connection attempt: ${request.url} - ${socket.id}`);
            return;
        }
        this.logger.debug(`New client connected: ${request.url} - ${socket.id}`);
        const params = this.getParams(request);
        const session = params.session;
        const events = params.events;
        this.logger.debug(`Client connected to session: '${session}', events: ${events}, ${socket.id}`);
        const sub = this.manager
            .getSessionEvents(session, events)
            .subscribe((data) => {
            this.logger.debug({ data }, `Sending data to client, event.id: ${data.id}`);
            socket.send(JSON.stringify(data), (err) => {
                if (!err) {
                    return;
                }
                this.logger.error(`Error sending data to client: ${err}`);
            });
        });
        socket.on('close', () => {
            this.logger.debug(`Client disconnected - ${socket.id}`);
            sub.unsubscribe();
        });
    }
    getParams(request) {
        const query = url.parse(request.url, true).query;
        const session = query.session || '*';
        let paramsEvents = query.events || '*';
        if (typeof paramsEvents === 'string') {
            paramsEvents = paramsEvents.split(',');
        }
        const events = this.eventUnmask.unmask(paramsEvents);
        return { session, events };
    }
    handleDisconnect(socket) {
        this.logger.debug(`Client disconnected - ${socket.id}`);
    }
    async beforeApplicationShutdown(signal) {
        var _a;
        this.logger.log('Shutting down websocket server');
        (_a = this.heartbeat) === null || _a === void 0 ? void 0 : _a.stop();
        await (0, utils_1.sleep)(100);
        this.logger.log('Websocket server is down');
    }
    afterInit(server) {
        this.logger.debug('Websocket server initialized');
        this.logger.debug('Starting heartbeat service...');
        this.heartbeat.start(server);
        this.logger.debug('Heartbeat service started');
    }
};
exports.WebsocketGatewayCore = WebsocketGatewayCore;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", ws_1.Server)
], WebsocketGatewayCore.prototype, "server", void 0);
exports.WebsocketGatewayCore = WebsocketGatewayCore = __decorate([
    (0, websockets_1.WebSocketGateway)({
        path: '/ws',
        cors: true,
    }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        WebSocketAuth_1.WebSocketAuth])
], WebsocketGatewayCore);
//# sourceMappingURL=websocket.gateway.core.js.map