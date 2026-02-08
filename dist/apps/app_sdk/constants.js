"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRetriesJobOptions = exports.ExponentialRetriesJobOptions = exports.JobRemoveOptions = exports.JOB_CONCURRENCY = exports.JOB_LOCK_TTL = exports.JOB_DELAY = void 0;
exports.merge = merge;
exports.JOB_DELAY = 1000;
exports.JOB_LOCK_TTL = 20000;
exports.JOB_CONCURRENCY = parseInt(process.env.WAHA_APPS_JOBS_CONCURRENCY) || 50;
function jobRemoveOptions() {
    const HOUR = 60 * 60;
    const DAY = 24 * HOUR;
    return {
        removeOnComplete: {
            age: parseInt(process.env.WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_AGE) || 3 * DAY,
            count: parseInt(process.env.WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_COUNT) || 1000,
        },
        removeOnFail: {
            age: parseInt(process.env.WAHA_APPS_JOBS_REMOVE_ON_FAIL_AGE) || 31 * DAY,
            count: parseInt(process.env.WAHA_APPS_JOBS_REMOVE_ON_FAIL_COUNT) || 1000,
        },
    };
}
exports.JobRemoveOptions = jobRemoveOptions();
exports.ExponentialRetriesJobOptions = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 1000,
    },
};
exports.NoRetriesJobOptions = {
    attempts: 1,
};
function merge(...args) {
    return Object.assign({}, ...args);
}
//# sourceMappingURL=constants.js.map