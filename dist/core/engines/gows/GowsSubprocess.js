"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GowsSubprocess = void 0;
const promiseTimeout_1 = require("../../../utils/promiseTimeout");
const child_process_1 = require("child_process");
class GowsSubprocess {
    constructor(logger, path, socket, pprof = false) {
        this.logger = logger;
        this.path = path;
        this.socket = socket;
        this.pprof = pprof;
        this.checkIntervalMs = 100;
        this.readyDelayMs = 1000;
        this.readyText = 'gRPC server started!';
        this.ready = false;
    }
    start(onExit) {
        this.logger.info('Starting GOWS subprocess...');
        this.logger.debug(`GOWS path '${this.path}', socket: '${this.socket}'...`);
        const args = ['--socket', this.socket];
        if (this.pprof) {
            this.logger.info('Debug mode enabled, adding pprof flags');
            args.push('--pprof');
            args.push('--pprof-port=6060');
            args.push('--pprof-host=0.0.0.0');
        }
        this.child = (0, child_process_1.spawn)(this.path, args, {
            detached: true,
        });
        this.logger.debug(`GOWS started with PID: ${this.child.pid}`);
        this.child.on('close', async (code, singal) => {
            const msg = code
                ? `GOWS subprocess closed with code ${code}`
                : `GOWS subprocess closed by signal ${singal}`;
            this.logger.debug(msg);
            onExit(code);
        });
        this.child.on('error', (err) => {
            this.logger.error(`GOWS subprocess error: ${err}`);
        });
        this.child.stderr.setEncoding('utf8');
        this.child.stderr.on('data', (data) => {
            this.logger.error(data);
        });
        this.child.stdout.setEncoding('utf8');
        this.child.stdout.on('data', async (data) => {
            const lines = data.trim().split('\n');
            lines.forEach((line) => this.log(line));
        });
        this.listenReady();
    }
    listenReady() {
        this.child.stdout.on('data', async (data) => {
            if (this.ready) {
                return;
            }
            if (!data.includes(this.readyText)) {
                return;
            }
            await (0, promiseTimeout_1.sleep)(this.readyDelayMs);
            this.ready = true;
            this.logger.info('GOWS is ready');
        });
    }
    async waitWhenReady(timeout) {
        const started = await (0, promiseTimeout_1.waitUntil)(async () => this.ready, this.checkIntervalMs, timeout);
        if (!started) {
            const msg = 'GOWS did not start after 10 seconds';
            this.logger.error(msg);
            throw new Error(msg);
        }
    }
    async stop() {
        var _a;
        this.logger.info('Stopping GOWS subprocess...');
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.kill('SIGTERM');
        this.logger.info('GOWS subprocess stopped');
    }
    log(msg) {
        if (msg.startsWith('ERROR | ')) {
            this.logger.error(msg.slice(8));
        }
        else if (msg.startsWith('WARN | ')) {
            this.logger.warn(msg.slice(7));
        }
        else if (msg.startsWith('INFO | ')) {
            this.logger.info(msg.slice(7));
        }
        else if (msg.startsWith('DEBUG | ')) {
            this.logger.debug(msg.slice(8));
        }
        else if (msg.startsWith('TRACE | ')) {
            this.logger.trace(msg.slice(8));
        }
        else {
            this.logger.info(msg);
        }
    }
}
exports.GowsSubprocess = GowsSubprocess;
//# sourceMappingURL=GowsSubprocess.js.map