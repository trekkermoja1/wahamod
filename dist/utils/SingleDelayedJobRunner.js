"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleDelayedJobRunner = void 0;
class SingleDelayedJobRunner {
    constructor(name, timeoutMs, logger, warningOverride = false) {
        this.name = name;
        this.timeoutMs = timeoutMs;
        this.warningOverride = warningOverride;
        this.logger = logger.child({
            job: name,
            class: SingleDelayedJobRunner.name,
        });
    }
    get scheduled() {
        return !!this.timeout;
    }
    schedule(fn) {
        if (this.scheduled) {
            const msg = `Job has been started before, do not schedule it again`;
            this.log(this.warningOverride, msg);
            return false;
        }
        this.timeout = setTimeout(() => {
            this.logger.debug(`Running job...`);
            fn()
                .catch((error) => {
                this.logger.error(`Job failed: ${error}`);
                this.logger.error(error.stack);
            })
                .finally(() => {
                this.timeout = null;
                this.logger.debug(`Job finished`);
            });
        }, this.timeoutMs);
        this.logger.info(`Job scheduled with timeout ${this.timeoutMs} ms`);
        return true;
    }
    cancel() {
        if (!this.timeout) {
            return;
        }
        clearTimeout(this.timeout);
        this.timeout = null;
        this.logger.info(`Job cancelled`);
    }
    log(warning, msg) {
        if (warning) {
            this.logger.warn(msg);
        }
        else {
            this.logger.info(msg);
        }
    }
}
exports.SingleDelayedJobRunner = SingleDelayedJobRunner;
//# sourceMappingURL=SingleDelayedJobRunner.js.map