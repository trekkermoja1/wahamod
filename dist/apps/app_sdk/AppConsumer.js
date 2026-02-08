"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConsumer = void 0;
const constants_1 = require("./constants");
const JobLoggerWrapper_1 = require("./JobLoggerWrapper");
const BaseWorkerHost_1 = require("../../utils/bull/BaseWorkerHost");
const bullmq_1 = require("bullmq");
class AppConsumer extends BaseWorkerHost_1.BaseWorkerHost {
    constructor(appName, componentName, log, rmutex) {
        super();
        this.rmutex = rmutex;
        this.logger = log.logger.child({
            app: appName,
            component: componentName,
        });
    }
    signal(job) {
        var _a, _b, _c, _d;
        if (((_b = (_a = job.data) === null || _a === void 0 ? void 0 : _a.timeout) === null || _b === void 0 ? void 0 : _b.job) != null) {
            return AbortSignal.timeout((_d = (_c = job.data) === null || _c === void 0 ? void 0 : _c.timeout) === null || _d === void 0 ? void 0 : _d.job);
        }
        return new AbortController().signal;
    }
    async withMutex(job, mutexKey, processor) {
        const mutex = this.rmutex.get(mutexKey, constants_1.JOB_LOCK_TTL);
        const lock = await mutex.lock();
        if (!lock) {
            const logger = new JobLoggerWrapper_1.JobLoggerWrapper(job, this.logger);
            logger.debug(`Postponing job '${job.id}' for ${constants_1.JOB_DELAY}ms, another job is already running the mutex.key='${mutexKey}'`);
            await job.moveToDelayed(Date.now() + constants_1.JOB_DELAY);
            throw new bullmq_1.DelayedError();
        }
        try {
            return await processor();
        }
        finally {
            await lock.release();
        }
    }
}
exports.AppConsumer = AppConsumer;
//# sourceMappingURL=AppConsumer.js.map