"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglePeriodicJobRunner = void 0;
class SinglePeriodicJobRunner {
    constructor(name, intervalMs, logger, warningOverlap = true, warningOverride = false) {
        this.name = name;
        this.intervalMs = intervalMs;
        this.warningOverlap = warningOverlap;
        this.warningOverride = warningOverride;
        this.isWorking = false;
        this.logger = logger.child({
            job: name,
            class: SinglePeriodicJobRunner.name,
        });
    }
    start(fn) {
        if (this.interval) {
            const msg = `Job has been started before, do not schedule it again`;
            this.log(this.warningOverride, msg);
            return false;
        }
        this.interval = setInterval(() => {
            if (this.isWorking) {
                const msg = `Job is already running, skipping this run`;
                this.log(this.warningOverlap, msg);
                return;
            }
            this.isWorking = true;
            this.logger.debug('Running job...');
            fn()
                .catch((error) => {
                this.logger.error(`Job failed: ${error}`);
                this.logger.error(error.stack);
            })
                .finally(() => {
                this.isWorking = false;
                this.logger.debug(`Job finished`);
            });
        }, this.intervalMs);
        this.logger.info(`Job started with interval ${this.intervalMs} ms`);
        return true;
    }
    stop() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
        this.logger.info(`Job stopped`);
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
exports.SinglePeriodicJobRunner = SinglePeriodicJobRunner;
//# sourceMappingURL=SinglePeriodicJobRunner.js.map