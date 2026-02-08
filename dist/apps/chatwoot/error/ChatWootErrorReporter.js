"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWootErrorReporter = void 0;
const JobUtils_1 = require("../../app_sdk/JobUtils");
const ErrorRenderer_1 = require("./ErrorRenderer");
const templates_1 = require("../i18n/templates");
const renderer = new ErrorRenderer_1.ErrorRenderer();
class ChatWootErrorReporter {
    constructor(logger, job, l) {
        this.logger = logger;
        this.job = job;
        this.l = l;
        this.errorRenderer = renderer;
    }
    async ReportError(conversation, header, type, error, replyTo) {
        var _a;
        const errorText = this.errorRenderer.text(error);
        this.logger.error(errorText);
        try {
            const data = this.errorRenderer.data(error);
            this.logger.error(JSON.stringify(data, null, 2));
        }
        catch (err) {
            this.logger.error(`Error occurred while login details for error: ${err}`);
        }
        const template = this.l.key(templates_1.TKey.JOB_REPORT_ERROR);
        const nextDelay = (0, JobUtils_1.NextAttemptDelayInWholeSeconds)(this.job);
        if (nextDelay) {
            return;
        }
        const attempts = {
            current: this.job.attemptsMade + 1,
            max: ((_a = this.job.opts) === null || _a === void 0 ? void 0 : _a.attempts) || 1,
            nextDelay: nextDelay,
        };
        const content = template.render({
            header: header,
            error: nextDelay != null ? null : errorText,
            details: (0, JobUtils_1.JobLink)(this.job),
            attempts: attempts,
        });
        const request = {
            content: content,
            message_type: type,
            private: true,
        };
        if (replyTo) {
            request.content_attributes = {
                in_reply_to: replyTo,
            };
        }
        await conversation.send(request);
    }
    async ReportSucceeded(conversation, type, replyTo) {
        var _a;
        return null;
        const template = this.l.key(templates_1.TKey.JOB_REPORT_SUCCEEDED);
        const attempts = {
            current: this.job.attemptsMade + 1,
            max: ((_a = this.job.opts) === null || _a === void 0 ? void 0 : _a.attempts) || 1,
        };
        const content = template.render({
            details: (0, JobUtils_1.JobLink)(this.job),
            attempts: attempts,
        });
        const request = {
            content: content,
            message_type: type,
            private: true,
        };
        if (replyTo) {
            request.content_attributes = {
                in_reply_to: replyTo,
            };
        }
        await conversation.send(request);
    }
}
exports.ChatWootErrorReporter = ChatWootErrorReporter;
//# sourceMappingURL=ChatWootErrorReporter.js.map