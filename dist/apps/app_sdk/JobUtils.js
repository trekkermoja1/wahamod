"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextAttemptDelayInMs = NextAttemptDelayInMs;
exports.NextAttemptDelayInWholeSeconds = NextAttemptDelayInWholeSeconds;
exports.HasBeenRetried = HasBeenRetried;
exports.QueueNameRepr = QueueNameRepr;
exports.JobLink = JobLink;
exports.ChainJobsOneAtATime = ChainJobsOneAtATime;
const bullmq_1 = require("bullmq");
function NextAttemptDelayInMs(job) {
    var _a;
    const attemptsMade = job.attemptsMade + 1;
    const maxAttempts = ((_a = job.opts) === null || _a === void 0 ? void 0 : _a.attempts) || 1;
    if (attemptsMade >= maxAttempts) {
        return null;
    }
    const backoff = bullmq_1.Backoffs.normalize(job.opts.backoff);
    if (!backoff) {
        return null;
    }
    const delay = bullmq_1.Backoffs.calculate(backoff, attemptsMade, new Error(), job);
    if (delay === undefined) {
        return null;
    }
    if (delay instanceof Promise) {
        return null;
    }
    return delay;
}
function NextAttemptDelayInWholeSeconds(job) {
    const delay = NextAttemptDelayInMs(job);
    if (delay == null) {
        return null;
    }
    return Math.round(delay / 1000);
}
function HasBeenRetried(job) {
    const attemptsMade = job.attemptsMade + 1;
    return attemptsMade > 1;
}
function QueueNameRepr(name) {
    name = name.replace('chatwoot.', '');
    name = name.replace('waha |', 'whatsapp |');
    return name;
}
let base = process.env.WAHA_PUBLIC_URL ||
    process.env.WAHA_BASE_URL ||
    'http://localhost:3000';
base = base.replace(/\/+$/, '');
function JobLink(job) {
    const name = QueueNameRepr(job.queueName);
    const text = `${name} => ${job.id}`;
    const queue = encodeURIComponent(job.queueName);
    const id = encodeURIComponent(job.id);
    const url = `${base}/jobs/queue/${queue}/${id}`;
    return { text: text, url: url };
}
function ChainJobsOneAtATime(jobs) {
    if (jobs.length == 0) {
        throw new Error('No jobs provided');
    }
    for (const job of jobs) {
        if (job.children.length != 0) {
            throw new Error('Jobs with children are not supported');
        }
    }
    const left = [...jobs];
    const root = left.pop();
    let parent = root;
    while (left.length != 0) {
        const job = left.pop();
        parent.children = [job];
        parent = job;
    }
    return root;
}
//# sourceMappingURL=JobUtils.js.map