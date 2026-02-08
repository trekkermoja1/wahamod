"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootInboxMessageConsumer = void 0;
exports.LookupAndCheckChatId = LookupAndCheckChatId;
const AppConsumer_1 = require("../../../app_sdk/AppConsumer");
const JobLoggerWrapper_1 = require("../../../app_sdk/JobLoggerWrapper");
const JobUtils_1 = require("../../../app_sdk/JobUtils");
const ids_1 = require("../../client/ids");
const mutex_1 = require("../mutex");
const DIContainer_1 = require("../../di/DIContainer");
const errors_1 = require("../../errors");
const storage_1 = require("../../storage");
class ChatWootInboxMessageConsumer extends AppConsumer_1.AppConsumer {
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
    GetConversationID(body) {
        return body.conversation.id;
    }
    async processJob(job) {
        const body = job.data.body;
        const key = (0, mutex_1.ChatWootConversationKey)(job.data.app, this.GetConversationID(body));
        return await this.withMutex(job, key, () => this.ProcessAndReportStatus(job));
    }
    async ProcessAndReportStatus(job) {
        const body = job.data.body;
        try {
            const container = await this.DIContainer(job, job.data.app);
            const result = await this.Process(container, body, job);
            await this.ReportErrorRecovered(job, body);
            return result;
        }
        catch (err) {
            await this.ReportErrorForMessage(job, err, body);
            throw err;
        }
    }
    conversationForReport(container, body) {
        return container
            .ContactConversationService()
            .ConversationById(body.conversation.id);
    }
    async ReportErrorForMessage(job, err, body) {
        const container = await this.DIContainer(job, job.data.app);
        const header = this.ErrorHeaderKey()
            ? container.Locale().key(this.ErrorHeaderKey()).render()
            : err.message || `${err}`;
        const conversation = this.conversationForReport(container, body);
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportError(conversation, header, body.message_type, err, body.id);
        throw err;
    }
    async ReportErrorRecovered(job, body) {
        if (!(0, JobUtils_1.HasBeenRetried)(job)) {
            return;
        }
        const container = await this.DIContainer(job, job.data.app);
        const conversation = this.conversationForReport(container, body);
        const reporter = container.ChatWootErrorReporter(job);
        await reporter.ReportSucceeded(conversation, body.message_type, body.id);
    }
}
exports.ChatWootInboxMessageConsumer = ChatWootInboxMessageConsumer;
async function LookupAndCheckChatId(session, body) {
    const sender = body.conversation.meta.sender;
    let chatId = (0, ids_1.FindChatID)(sender);
    if (!chatId && sender.phone_number) {
        const existResult = await session.contactCheckExists(sender.phone_number);
        if (!existResult.numberExists) {
            throw new errors_1.PhoneNumberNotFoundInWhatsAppError(sender.phone_number);
        }
        chatId = existResult.chatId;
    }
    if (!chatId) {
        throw new errors_1.ChatIDNotFoundForContactError(sender);
    }
    return chatId;
}
//# sourceMappingURL=base.js.map