"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootScheduledConsumer = void 0;
const AppConsumer_1 = require("../../../app_sdk/AppConsumer");
const JobLoggerWrapper_1 = require("../../../app_sdk/JobLoggerWrapper");
const JobUtils_1 = require("../../../app_sdk/JobUtils");
const types_1 = require("../../client/types");
const DIContainer_1 = require("../../di/DIContainer");
const storage_1 = require("../../storage");
class ChatWootScheduledConsumer extends AppConsumer_1.AppConsumer {
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
        return this.ProcessAndReportStatus(job);
    }
    async ProcessAndReportStatus(job) {
        try {
            const container = await this.DIContainer(job, job.data.app);
            const result = await this.Process(container, job);
            await this.ReportErrorRecovered(job);
            return result;
        }
        catch (err) {
            await this.ReportErrorForJob(job, err);
            throw err;
        }
    }
    async ReportErrorForJob(job, err) {
        const container = await this.DIContainer(job, job.data.app);
        let header = this.ErrorHeaderKey()
            ? container.Locale().key(this.ErrorHeaderKey()).render()
            : err.message || `${err}`;
        header = `${job.queueName}: ${header}`;
        const conversation = await container
            .ContactConversationService()
            .InboxNotifications();
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportError(conversation, header, types_1.MessageType.INCOMING, err);
        throw err;
    }
    async ReportErrorRecovered(job) {
        if (!(0, JobUtils_1.HasBeenRetried)(job)) {
            return;
        }
        const container = await this.DIContainer(job, job.data.app);
        const conversation = await container
            .ContactConversationService()
            .InboxNotifications();
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportSucceeded(conversation, types_1.MessageType.INCOMING);
    }
}
exports.ChatWootScheduledConsumer = ChatWootScheduledConsumer;
//# sourceMappingURL=base.js.map