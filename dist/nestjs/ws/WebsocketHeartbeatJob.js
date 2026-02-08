"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketHeartbeatJob = void 0;
class WebsocketHeartbeatJob {
    constructor(logger, intervalTime = 10000) {
        this.logger = logger;
        this.intervalTime = intervalTime;
    }
    start(server) {
        server.on('connection', (ws) => {
            ws.isAlive = true;
            ws.on('pong', this.onPong(ws));
        });
        this.interval = setInterval(() => {
            server.clients.forEach((client) => {
                if (client.isAlive === false) {
                    this.logger.debug(`Terminating client connection due to heartbeat timeout, ${client.id}`);
                    client.terminate();
                }
                client.isAlive = false;
                this.logger.verbose(`Sending heartbeat (ping) to ${client.id}`);
                client.ping();
            });
        }, this.intervalTime);
    }
    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }
    onPong(ws) {
        return (event) => {
            ws.isAlive = true;
            this.logger.verbose(`Heartbeat (pong) received from ${ws.id}`);
        };
    }
}
exports.WebsocketHeartbeatJob = WebsocketHeartbeatJob;
//# sourceMappingURL=WebsocketHeartbeatJob.js.map