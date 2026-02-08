"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var TaskMessagesPullConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskActivity = exports.TaskMessagesPullConsumer = exports.ChatID = void 0;
exports.MessagesPullStatusMessage = MessagesPullStatusMessage;
const bullmq_1 = require("@nestjs/bullmq");
const ms = require("ms");
const constants_1 = require("../../../app_sdk/constants");
const JobUtils_1 = require("../../../app_sdk/JobUtils");
const QueueName_1 = require("../QueueName");
const base_1 = require("./base");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const lodash = require("lodash");
const nestjs_pino_1 = require("nestjs-pino");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const chats_dto_1 = require("../../../../structures/chats.dto");
const timehelper_1 = require("../../../../utils/timehelper");
const message_any_1 = require("../waha/message.any");
const base_2 = require("../waha/base");
const pagination_dto_1 = require("../../../../structures/pagination.dto");
const Paginator_1 = require("../../../app_sdk/waha/Paginator");
const engines_1 = require("../../waha/engines");
const jids_1 = require("../../../../core/utils/jids");
const ErrorRenderer_1 = require("../../error/ErrorRenderer");
const ids_1 = require("../../client/ids");
const cli_1 = require("../../cli");
const QueueManager_1 = require("../../services/QueueManager");
const list_1 = require("../../../../utils/list");
var ChatID;
(function (ChatID) {
    ChatID["ALL"] = "all";
    ChatID["SUMMARY"] = "summary";
})(ChatID || (exports.ChatID = ChatID = {}));
const NullProgress = {
    ok: 0,
    exists: 0,
    ignored: 0,
    errors: 0,
    chats: [],
    messages: {
        first: 0,
        last: 0,
    },
    conversations: [],
    conversationResolve: {
        success: 0,
        error: 0,
    },
};
function total(progress) {
    return progress.ok + progress.exists + progress.ignored + progress.errors;
}
let TaskMessagesPullConsumer = TaskMessagesPullConsumer_1 = class TaskMessagesPullConsumer extends base_1.ChatWootTaskConsumer {
    constructor(manager, log, rmutex, queueManager) {
        super(manager, log, rmutex, TaskMessagesPullConsumer_1.name);
        this.queueManager = queueManager;
    }
    ErrorHeaderKey() {
        return null;
    }
    async Process(container, job, signal) {
        const options = job.data.options;
        const locale = container.Locale();
        const conversation = this.conversationForReport(container, job.data.body);
        const waha = container.WAHASelf();
        const session = new WAHASelf_1.WAHASessionAPI(job.data.session, waha);
        const handler = new MessagesPullHandler(this.queueManager, container, signal, container.Logger(), conversation, session, locale);
        await handler.start(options, job);
        job = await handler.handle(options, job);
        return await handler.end(options, job);
    }
};
exports.TaskMessagesPullConsumer = TaskMessagesPullConsumer;
exports.TaskMessagesPullConsumer = TaskMessagesPullConsumer = TaskMessagesPullConsumer_1 = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.TASK_MESSAGES_PULL, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager,
        nestjs_pino_1.PinoLogger,
        rmutex_service_1.RMutexService,
        QueueManager_1.QueueManager])
], TaskMessagesPullConsumer);
class MessagesPullHandler {
    constructor(queueManager, container, signal, logger, conversation, session, l) {
        this.queueManager = queueManager;
        this.container = container;
        this.signal = signal;
        this.logger = logger;
        this.session = session;
        this.l = l;
        this.activity = new TaskActivity(l, conversation);
    }
    async summaryProgress(job) {
        const current = lodash.merge({}, NullProgress, job.progress);
        const childrenValues = await job.getChildrenValues();
        const values = [current, ...Object.values(childrenValues)];
        let progress = lodash.merge({}, NullProgress);
        for (const p of values) {
            progress.ok += p.ok;
            progress.exists += p.exists;
            progress.ignored += p.ignored;
            progress.errors += p.errors;
            progress.conversationResolve.success += p.conversationResolve.success;
            progress.conversationResolve.error += p.conversationResolve.error;
        }
        progress.chats = lodash.uniq(lodash.flatten(values.map((p) => p.chats)));
        progress.conversations = lodash.uniq(lodash.flatten(values.map((p) => p.conversations)));
        progress.messages.first = lodash.min(values.map((p) => p.messages.first || Infinity));
        if (progress.messages.first === Infinity) {
            progress.messages.first = undefined;
        }
        progress.messages.last = lodash.max(values.map((p) => p.messages.last || 0));
        if (progress.messages.last === 0) {
            progress.messages.last = undefined;
        }
        return progress;
    }
    async start(options, job) {
        const { ignored, processed, unprocessed, failed } = await job.getDependenciesCount();
        const total = ignored + processed + unprocessed + failed;
        const hasChildren = total > 0;
        if (hasChildren) {
            return;
        }
        if (options.pause) {
            await this.queueManager.pause();
            await this.activity.queue(true);
        }
    }
    async end(options, job) {
        if (job.parentKey) {
            return await this.summaryProgress(job);
        }
        if (options.pause) {
            await this.queueManager.resume();
            await this.activity.queue(false);
        }
        const progress = await this.summaryProgress(job);
        await job.updateProgress(progress);
        if (options.resolveConversations) {
            await this.resolveConversations(progress);
            await job.updateProgress(progress);
        }
        await this.activity.completed(progress, options);
        return progress;
    }
    async resolveConversations(progress) {
        const service = this.container.ConversationService();
        for (const conversationId of progress.conversations) {
            try {
                await service.resolve(conversationId);
                progress.conversationResolve.success += 1;
            }
            catch (err) {
                progress.conversationResolve.error += 1;
            }
        }
    }
    async handle(options, job) {
        var _a, e_1, _b, _c;
        var _d;
        if (options.chat === ChatID.SUMMARY) {
            return job;
        }
        const jids = new jids_1.JidFilter(options.ignore);
        let progress = lodash.merge({}, NullProgress, job.progress);
        const batch = (_d = options.batch) !== null && _d !== void 0 ? _d : 100;
        this.logger.debug(`Pulling messages for session ${job.data.session} with batch size ${batch}...`);
        if (lodash.isEqual(progress, NullProgress)) {
            await this.activity.started(job, options);
        }
        const container = this.container;
        const info = new base_2.MessageReportInfo();
        const handler = new MessageAnyHistoryHandler(job, container.MessageMappingService(), container.ContactConversationService(), container.Logger(), info, this.session, container.Locale(), container.WAHASelf());
        handler.force = options.force;
        const lte = job.timestamp - options.period.end;
        const gte = job.timestamp - options.period.start;
        const filters = {
            'filter.timestamp.lte': (0, timehelper_1.EnsureSeconds)(lte),
            'filter.timestamp.gte': (0, timehelper_1.EnsureSeconds)(gte),
        };
        const query = {
            limit: batch,
            offset: 0,
            downloadMedia: false,
            sortBy: chats_dto_1.MessageSortField.TIMESTAMP,
            sortOrder: pagination_dto_1.SortOrder.ASC,
        };
        const params = {
            processed: total(progress),
        };
        const paginator = new Paginator_1.ArrayPaginator(params);
        let messages = paginator.iterate((processed) => {
            query.offset = processed;
            return this.session.getMessages(options.chat, query, filters, {
                signal: this.signal,
            });
        });
        messages = engines_1.EngineHelper.IterateMessages(messages);
        const all = options.chat == ChatID.ALL;
        try {
            for (var _e = true, messages_1 = __asyncValues(messages), messages_1_1; messages_1_1 = await messages_1.next(), _a = messages_1_1.done, !_a; _e = true) {
                _c = messages_1_1.value;
                _e = false;
                let message = _c;
                this.signal.throwIfAborted();
                const thetotal = total(progress);
                if (options.progress && thetotal) {
                    if (thetotal % options.progress == 0) {
                        await this.activity.progress(progress, options);
                    }
                }
                try {
                    progress.messages.first = progress.messages.first || message.timestamp;
                    progress.messages.last = message.timestamp;
                    if (all && !jids.include(engines_1.EngineHelper.ChatID(message))) {
                        progress.ignored += 1;
                        continue;
                    }
                    if ((0, jids_1.isNullJid)(engines_1.EngineHelper.ChatID(message))) {
                        progress.ignored += 1;
                        continue;
                    }
                    if (options.media &&
                        message.hasMedia &&
                        (await handler.ShouldProcessMessage(message))) {
                        let signal = AbortSignal.timeout(options.timeout.media);
                        signal = AbortSignal.any([signal, this.signal]);
                        message = await this.session.getMessageById('all', message.id, true, {
                            signal: signal,
                        });
                    }
                    const chatwoot = await handler.handle(message);
                    if (chatwoot) {
                        progress.ok += 1;
                        (0, list_1.addUnique)(progress.chats, engines_1.EngineHelper.ChatID(message));
                        if (info.conversationId) {
                            (0, list_1.addUnique)(progress.conversations, info.conversationId);
                        }
                    }
                    else {
                        progress.exists += 1;
                    }
                }
                catch (error) {
                    const renderer = new ErrorRenderer_1.ErrorRenderer();
                    const text = renderer.text(error);
                    this.logger.error(`Error: ${text}`);
                    this.logger.error(`Message:\n${JSON.stringify(message, null, 2)}`);
                    try {
                        const data = renderer.data(error);
                        this.logger.error(JSON.stringify(data, null, 2));
                    }
                    catch (err) {
                        this.logger.error(`Error occurred while login details for error: ${err}`);
                    }
                    progress.errors += 1;
                }
                await job.updateProgress(progress);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_e && !_a && (_b = messages_1.return)) await _b.call(messages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        job.progress = progress;
        return job;
    }
}
class TaskActivity {
    constructor(l, conversation) {
        this.l = l;
        this.conversation = conversation;
    }
    async queue(paused) {
        let msg;
        if (paused) {
            msg = this.l.r('cli.cmd.queue.paused');
        }
        else {
            msg = this.l.r('cli.cmd.queue.resumed');
        }
        await this.conversation.activity(msg);
    }
    async details(data) {
        await this.conversation.activity(this.l.r('task.messages.details', {
            prefix: (0, ids_1.IsCommandsChat)(data.body) ? '' : cli_1.CommandPrefix,
        }));
    }
    async started(job, options) {
        await this.conversation.activity(this.l.r('task.messages.started', {
            chat: options.chat,
            period: period(options),
        }));
    }
    async progress(progress, options) {
        const format = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        };
        await this.conversation.activity(this.l.r('task.messages.progress', {
            progress: progress,
            chat: options.chat,
            messages: {
                first: this.l.FormatTimestampOpts(progress.messages.first, format, false),
                last: this.l.FormatTimestampOpts(progress.messages.last, format, false),
            },
        }));
    }
    async completed(progress, options) {
        const msg = this.l.r('task.messages.completed', {
            progress: progress,
            period: period(options),
            chat: options.chat,
        });
        await this.conversation.activity(msg);
    }
}
exports.TaskActivity = TaskActivity;
class MessageAnyHistoryHandler extends message_any_1.MessageAnyHandler {
    constructor() {
        super(...arguments);
        this.force = false;
        this.shouldLogUnsupported = true;
    }
    get historyMessage() {
        return true;
    }
    get shouldAddFromTag() {
        return false;
    }
    get delayFromMeAPI() {
        return 0;
    }
    async ShouldProcessMessage(payload) {
        if (this.force) {
            return true;
        }
        return await super.ShouldProcessMessage(payload);
    }
}
function period(options) {
    const start = options.period.start;
    const end = options.period.end;
    if (end == 0) {
        return ms(start);
    }
    return `${ms(start)}-${ms(end)}`;
}
function MessagesPullStatusMessage(l, job, state) {
    const progress = lodash.merge({}, NullProgress, job.progress);
    const details = (0, JobUtils_1.JobLink)(job);
    const options = job.data.options;
    const payload = {
        options: options,
        chat: options.chat,
        chats: progress.chats.length,
        period: period(options),
        error: state === 'failed' || state === 'unknown' || progress.errors > 0,
        state: lodash.capitalize(state !== null && state !== void 0 ? state : 'unknown'),
        progress: progress,
        details: details,
        messages: {
            first: l.FormatTimestamp(progress.messages.first, false),
            last: l.FormatTimestamp(progress.messages.last, false),
        },
    };
    return l.r('task.messages.status', payload);
}
//# sourceMappingURL=messages.pull.js.map