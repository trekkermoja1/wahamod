"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootTaskConsumer = void 0;
const AppConsumer_1 = require("../../../app_sdk/AppConsumer");
const JobLoggerWrapper_1 = require("../../../app_sdk/JobLoggerWrapper");
const JobUtils_1 = require("../../../app_sdk/JobUtils");
const types_1 = require("../../client/types");
const DIContainer_1 = require("../../di/DIContainer");
const storage_1 = require("../../storage");
const abortable_1 = require("../../../../utils/abortable");
const ids_1 = require("../../client/ids");
class ChatWootTaskConsumer extends AppConsumer_1.AppConsumer {
    constructor(manager, log, rmutex, consumerName) {
        super('ChatWoot', consumerName, log, rmutex);
        this.manager = manager;
        this.consumerName = consumerName;
    }
    async DIContainer(job, appId) {
        const knex = this.manager.store.getWAHADatabase();
        this.appRepository = new storage_1.AppRepository(knex);
        const logger = new JobLoggerWrapper_1.JobLoggerWrapper(job, this.logger);
        const app = await this.appRepository.getById(appId);
        return new DIContainer_1.DIContainer(app.pk, app.config, logger, knex);
    }
    async processJob(job) {
        const signal = this.signal(job);
        return (0, abortable_1.SignalRace)(this.ProcessAndReportStatus(job, signal), signal);
    }
    async ProcessAndReportStatus(job, signal) {
        try {
            const container = await this.DIContainer(job, job.data.app);
            const result = await this.Process(container, job, signal);
            await this.ReportErrorRecovered(job);
            return result;
        }
        catch (err) {
            this.ReportErrorForJob(job, err).catch((exc) => this.logger.error(`Failed to report error for job ${job.id}: ${exc}`));
            throw err;
        }
    }
    conversationForReport(container, body) {
        const conversation = container
            .ContactConversationService()
            .ConversationById(body.conversation.id);
        if (!(0, ids_1.IsCommandsChat)(body)) {
            conversation.forceNote();
        }
        return conversation;
    }
    async ReportErrorForJob(job, err) {
        const container = await this.DIContainer(job, job.data.app);
        let header = this.ErrorHeaderKey()
            ? container.Locale().key(this.ErrorHeaderKey()).render()
            : err.message || `${err}`;
        header = `${job.queueName}: ${header}`;
        const conversation = this.conversationForReport(container, job.data.body);
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportError(conversation, header, types_1.MessageType.INCOMING, err);
        throw err;
    }
    async ReportErrorRecovered(job) {
        if (!(0, JobUtils_1.HasBeenRetried)(job)) {
            return;
        }
        const container = await this.DIContainer(job, job.data.app);
        const conversation = this.conversationForReport(container, job.data.body);
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportSucceeded(conversation, types_1.MessageType.INCOMING);
    }
}
exports.ChatWootTaskConsumer = ChatWootTaskConsumer;
//# sourceMappingURL=base.js.map