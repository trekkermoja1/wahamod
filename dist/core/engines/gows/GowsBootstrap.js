"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GowsBootstrap = void 0;
exports.isUnixSocket = isUnixSocket;
const GowsSubprocess_1 = require("./GowsSubprocess");
const fs_1 = require("fs");
async function isUnixSocket(socketPath) {
    try {
        const stats = await fs_1.promises.lstat(socketPath);
        return stats.isSocket();
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}
class GowsBootstrap {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
    }
    async bootstrap() {
        if (!this.config.path) {
            this.logger.warn('GOWS path is not set, skipping GOWS initialization.');
            this.logger.warn('Make sure to run GOWS manually.');
            this.checkSocket(this.config.socket);
            return;
        }
        this.gows = new GowsSubprocess_1.GowsSubprocess(this.logger, this.config.path, this.config.socket, this.config.pprof);
        this.gows.start(() => {
            this.logger.info(`GOWS stopped, exiting...`);
            process.kill(process.pid, 'SIGTERM');
        });
        await this.gows.waitWhenReady(10000);
        await this.checkSocket(this.config.socket);
        return;
    }
    async shutdown() {
        if (this.gows) {
            await this.gows.stop();
        }
    }
    async checkSocket(path) {
        if (!(await isUnixSocket(path))) {
            throw new Error(`Invalid socket path: ${path}`);
        }
    }
}
exports.GowsBootstrap = GowsBootstrap;
//# sourceMappingURL=GowsBootstrap.js.map