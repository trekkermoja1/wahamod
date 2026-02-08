"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobLoggerWrapper = void 0;
class JobLoggerWrapper {
    constructor(job, logger) {
        this.job = job;
        this.logger = logger.child({ jobId: job.id });
    }
    fatal(log) {
        this.log(log, 'fatal');
    }
    error(log) {
        this.log(log, 'error');
    }
    warn(log) {
        this.log(log, 'warn');
    }
    info(log) {
        this.log(log, 'info');
    }
    debug(log) {
        this.log(log, 'debug');
    }
    trace(log) {
        this.log(log, 'trace');
    }
    log(msg, level) {
        if (!this.logger.isLevelEnabled(level)) {
            return;
        }
        this.logger[level](msg);
        const timestamp = new Date().toISOString();
        this.job
            .log(`[${timestamp}] ${level.toUpperCase()}: ${msg}`)
            .catch((err) => {
            this.logger.error({ err }, 'Error logging message to job');
        });
    }
}
exports.JobLoggerWrapper = JobLoggerWrapper;
//# sourceMappingURL=JobLoggerWrapper.js.map