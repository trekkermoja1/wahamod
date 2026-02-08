"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsPullStart = ContactsPullStart;
exports.ContactsPullStatus = ContactsPullStatus;
exports.ContactsPullRemove = ContactsPullRemove;
const QueueName_1 = require("../consumers/QueueName");
const contacts_pull_1 = require("../consumers/task/contacts.pull");
const ChatWootScheduleService_1 = require("../services/ChatWootScheduleService");
const constants_1 = require("../../app_sdk/constants");
async function ContactsPullStart(ctx, options, jobOptions) {
    const jobId = ChatWootScheduleService_1.ChatWootScheduleService.SingleJobId(ctx.data.app);
    const job = await ctx.queues.contactsPull.getJob(jobId);
    if (job) {
        const state = await job.getState();
        const done = state === 'completed' || state === 'failed';
        if (!done) {
            const msg = ctx.l.r('cli.cmd.contacts.pull.already-running');
            await ctx.conversation.incoming(msg);
            return;
        }
        await ContactsPullRemove(ctx.queues.contactsPull, ctx.data.app, ctx.logger);
    }
    const opts = (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions, jobOptions);
    const data = Object.assign(Object.assign({}, ctx.data), { timeout: {
            job: jobOptions.timeout.job,
        }, options: options });
    opts.jobId = jobId;
    await ctx.queues.contactsPull.add(QueueName_1.QueueName.TASK_CONTACTS_PULL, data, opts);
}
async function ContactsPullStatus(ctx) {
    const jobId = ChatWootScheduleService_1.ChatWootScheduleService.SingleJobId(ctx.data.app);
    const job = await ctx.queues.contactsPull.getJob(jobId);
    if (!job) {
        const msg = ctx.l.r('cli.cmd.contacts.status.not-found');
        await ctx.conversation.incoming(msg);
        return;
    }
    const state = await job.getState();
    const msg = (0, contacts_pull_1.ContactsPullStatusMessage)(ctx.l, job, state);
    await ctx.conversation.incoming(msg);
}
async function ContactsPullRemove(queue, app, logger) {
    const jobId = ChatWootScheduleService_1.ChatWootScheduleService.SingleJobId(app);
    const job = await queue.getJob(jobId);
    if (!job) {
        logger.info('Pull Contacts job has already been removed');
        return false;
    }
    await job.remove();
    return true;
}
//# sourceMappingURL=cmd.contacts.js.map