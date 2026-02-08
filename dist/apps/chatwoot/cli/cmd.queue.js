"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueStatus = QueueStatus;
exports.QueueStart = QueueStart;
exports.QueueStop = QueueStop;
const lodash = require("lodash");
const QueueManager_1 = require("../services/QueueManager");
const JobUtils_1 = require("../../app_sdk/JobUtils");
async function QueueStatus(ctx, name) {
    const manager = new QueueManager_1.QueueManager(ctx.queues.registry);
    const names = manager.resolve(name);
    let result = await manager.status(names);
    for (const status of result) {
        status.name = (0, JobUtils_1.QueueNameRepr)(status.name);
    }
    result = lodash.sortBy(result, [(x) => !!x.locked, 'name']);
    const msg = ctx.l.r('cli.cmd.queue.status.result', {
        queues: result,
    });
    await ctx.conversation.incoming(msg);
}
async function QueueStart(ctx, name) {
    const manager = new QueueManager_1.QueueManager(ctx.queues.registry);
    const names = manager.resolve(name);
    await manager.resume(names);
    const msg = ctx.l.r('cli.cmd.queue.resumed');
    await ctx.conversation.activity(msg);
}
async function QueueStop(ctx, name) {
    const manager = new QueueManager_1.QueueManager(ctx.queues.registry);
    const names = manager.resolve(name);
    await manager.pause(names);
    const msg = ctx.l.r('cli.cmd.queue.paused');
    await ctx.conversation.activity(msg);
}
//# sourceMappingURL=cmd.queue.js.map