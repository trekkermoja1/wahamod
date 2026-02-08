"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesPullStart = MessagesPullStart;
exports.MessagesPullStatus = MessagesPullStatus;
exports.MessagesPullRemove = MessagesPullRemove;
const lodash = require("lodash");
const QueueName_1 = require("../consumers/QueueName");
const messages_pull_1 = require("../consumers/task/messages.pull");
const ChatWootScheduleService_1 = require("../services/ChatWootScheduleService");
const ids_1 = require("../client/ids");
const JobUtils_1 = require("../../app_sdk/JobUtils");
const constants_1 = require("../../app_sdk/constants");
const waha_1 = require("../waha");
const WAHASelf_1 = require("../../app_sdk/waha/WAHASelf");
const jids_1 = require("../../../core/utils/jids");
function oneJob(chat, data, opts) {
    data = lodash.cloneDeep(data);
    data.options.chat = chat;
    opts = lodash.cloneDeep(opts);
    return {
        name: chat,
        queueName: QueueName_1.QueueName.TASK_MESSAGES_PULL,
        data: data,
        opts: (0, constants_1.merge)(constants_1.ExponentialRetriesJobOptions, constants_1.JobRemoveOptions, opts),
        children: [],
    };
}
async function MessagesPullStart(ctx, options, jobOptions) {
    var _a, _b, _c;
    const queue = ctx.queues.messagesPull;
    const jobId = ChatWootScheduleService_1.ChatWootScheduleService.SingleJobId(ctx.data.app);
    const job = await queue.getJob(jobId);
    if (job) {
        const state = await job.getState();
        const done = state === 'completed' || state === 'failed';
        if (!done) {
            const msg = ctx.l.r('cli.cmd.messages.pull.already-running', {
                chat: job.data.options.chat,
            });
            await ctx.conversation.incoming(msg);
            return;
        }
        await MessagesPullRemove(queue, ctx.data.app, ctx.logger);
    }
    const opts = Object.assign(Object.assign({}, jobOptions), { ignoreDependencyOnFailure: true, delay: 1000 });
    const data = Object.assign(Object.assign({}, ctx.data), { timeout: {
            job: jobOptions.timeout.job,
        }, options: options });
    const producer = ctx.flows.messagesPull;
    let chats = [options.chat];
    if (options.chat === messages_pull_1.ChatID.ALL) {
        if ((0, ids_1.IsCommandsChat)(data.body)) {
            if (waha_1.EngineHelper.SupportsAllChatForMessage()) {
            }
            else {
                chats = await resolveAllToChats(ctx.waha, ctx.data.session, options);
                if (chats.length == 0) {
                    throw new Error(ctx.l.r('cli.cmd.messages.pull.no-chats-found'));
                }
            }
        }
        else {
            chats = (0, ids_1.GetAllChatIDs)((_c = (_b = (_a = data.body) === null || _a === void 0 ? void 0 : _a.conversation) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.sender);
            chats = waha_1.EngineHelper.FilterChatIdsForMessages(chats);
        }
    }
    const children = chats.map((chat) => oneJob(chat, data, opts));
    let root;
    if (children.length == 1) {
        root = children[0];
    }
    else {
        root = oneJob(messages_pull_1.ChatID.SUMMARY, data, opts);
        root.children = [(0, JobUtils_1.ChainJobsOneAtATime)(children)];
    }
    root.opts.jobId = jobId;
    await producer.add(root);
    const activity = new messages_pull_1.TaskActivity(ctx.l, ctx.conversation);
    await activity.details(data);
}
async function MessagesPullStatus(ctx) {
    const queue = ctx.queues.messagesPull;
    const jobId = ChatWootScheduleService_1.ChatWootScheduleService.SingleJobId(ctx.data.app);
    const job = await queue.getJob(jobId);
    if (!job) {
        const msg = ctx.l.r('cli.cmd.messages.status.not-found');
        await ctx.conversation.incoming(msg);
        return;
    }
    const state = await job.getState();
    const msg = (0, messages_pull_1.MessagesPullStatusMessage)(ctx.l, job, state);
    await ctx.conversation.incoming(msg);
}
async function MessagesPullRemove(queue, app, logger) {
    const jobId = ChatWootScheduleService_1.ChatWootScheduleService.SingleJobId(app);
    const job = await queue.getJob(jobId);
    if (!job) {
        logger.info('Pull Messages job has already been removed');
        return false;
    }
    await job.remove();
    return true;
}
async function resolveAllToChats(waha, sessionName, options) {
    const session = new WAHASelf_1.WAHASessionAPI(sessionName, waha);
    let chats = await session.getChats({
        limit: undefined,
        offset: undefined,
    });
    chats = lodash.sortBy(chats, (c) => c.timestamp || 0);
    const gte = Date.now() - options.period.start;
    const result = [];
    const jids = new jids_1.JidFilter(options.ignore);
    for (const chat of chats) {
        const id = chat.id._serialized;
        if (!jids.include(id)) {
            continue;
        }
        if ((0, jids_1.isNullJid)(id)) {
            continue;
        }
        const timestamp = (chat.timestamp || Infinity) * 1000;
        if (timestamp < gte) {
            continue;
        }
        result.push(id);
    }
    return result;
}
//# sourceMappingURL=cmd.messages.js.map