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
var TaskContactsPullConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskContactsPullConsumer = void 0;
exports.ContactsPullStatusMessage = ContactsPullStatusMessage;
const bullmq_1 = require("@nestjs/bullmq");
const lodash = require("lodash");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const nestjs_pino_1 = require("nestjs-pino");
const base_1 = require("./base");
const WAHASelf_1 = require("../../../app_sdk/waha/WAHASelf");
const WhatsAppContactInfo_1 = require("../../contacts/WhatsAppContactInfo");
const contacts_dto_1 = require("../../../../structures/contacts.dto");
const pagination_dto_1 = require("../../../../structures/pagination.dto");
const ContactService_1 = require("../../client/ContactService");
const JobUtils_1 = require("../../../app_sdk/JobUtils");
const promiseTimeout_1 = require("../../../../utils/promiseTimeout");
const jids_1 = require("../../../../core/utils/jids");
const Paginator_1 = require("../../../app_sdk/waha/Paginator");
const waha_1 = require("../../waha");
let TaskContactsPullConsumer = TaskContactsPullConsumer_1 = class TaskContactsPullConsumer extends base_1.ChatWootTaskConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, TaskContactsPullConsumer_1.name);
    }
    ErrorHeaderKey() {
        return null;
    }
    async Process(container, job, signal) {
        const options = job.data.options;
        const locale = container.Locale();
        const waha = container.WAHASelf();
        const session = new WAHASelf_1.WAHASessionAPI(job.data.session, waha);
        const conversation = this.conversationForReport(container, job.data.body);
        const handler = new ContactsPullHandler(signal, container.Logger(), conversation, session, locale, container.ContactService());
        return await handler.handle(options, job);
    }
};
exports.TaskContactsPullConsumer = TaskContactsPullConsumer;
exports.TaskContactsPullConsumer = TaskContactsPullConsumer = TaskContactsPullConsumer_1 = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.TASK_CONTACTS_PULL, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager, nestjs_pino_1.PinoLogger, rmutex_service_1.RMutexService])
], TaskContactsPullConsumer);
function total(progress) {
    return (progress.created + progress.updated + progress.skipped + progress.errors);
}
const NullProgress = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    avatar: {
        updated: 0,
    },
};
class ContactsPullHandler {
    constructor(signal, logger, conversation, session, l, contactService) {
        this.signal = signal;
        this.logger = logger;
        this.conversation = conversation;
        this.session = session;
        this.l = l;
        this.contactService = contactService;
        this.activity = new TaskActivity(this.l, this.conversation);
    }
    async handle(options, job) {
        var _a, e_1, _b, _c;
        const batch = options.batch;
        let progress = lodash.merge({}, NullProgress, job.progress);
        this.logger.debug(`Pulling contacts for session ${job.data.session} with batch size ${batch}...`);
        if (lodash.isEqual(progress, NullProgress)) {
            await this.activity.started(progress);
        }
        const query = {
            sortBy: contacts_dto_1.ContactSortField.ID,
            sortOrder: pagination_dto_1.SortOrder.ASC,
            limit: batch,
            offset: 0,
        };
        const params = {
            processed: total(progress),
        };
        const paginator = new Paginator_1.ArrayPaginator(params);
        const contacts = paginator.iterate((processed) => {
            query.offset = processed;
            return this.session.getContacts(query, {
                signal: this.signal,
            });
        });
        try {
            for (var _d = true, contacts_1 = __asyncValues(contacts), contacts_1_1; contacts_1_1 = await contacts_1.next(), _a = contacts_1_1.done, !_a; _d = true) {
                _c = contacts_1_1.value;
                _d = false;
                const contact = _c;
                this.signal.throwIfAborted();
                const thetotal = total(progress);
                if (options.progress && thetotal) {
                    if (thetotal % options.progress == 0) {
                        await this.activity.progress(progress);
                    }
                }
                if (thetotal && options.delay.batch) {
                    if (thetotal % batch == 0) {
                        await (0, promiseTimeout_1.sleep)(options.delay.batch);
                    }
                }
                try {
                    if (!waha_1.EngineHelper.ContactIsMy(contact)) {
                        progress.skipped += 1;
                        await job.updateProgress(progress);
                        continue;
                    }
                    const chatId = contact.id;
                    if ((0, jids_1.isJidGroup)(chatId)) {
                        if (!options.contacts.groups) {
                            this.logger.debug(`Skipping group contact ${chatId}...`);
                            progress.skipped += 1;
                            await job.updateProgress(progress);
                            continue;
                        }
                    }
                    else if ((0, jids_1.isLidUser)(chatId)) {
                        if (!options.contacts.lids) {
                            this.logger.debug(`Skipping LID contact ${chatId}...`);
                            progress.skipped += 1;
                            await job.updateProgress(progress);
                            continue;
                        }
                    }
                    else if (!(0, jids_1.isPnUser)(chatId)) {
                        this.logger.info(`Skipping non-phone-number contact ${chatId}...`);
                        progress.skipped += 1;
                        await job.updateProgress(progress);
                        continue;
                    }
                    this.logger.debug(`Pulling ${chatId}...`);
                    const result = await this.pullOneContact(options, chatId);
                    progress.created += result.created;
                    progress.updated += result.updated;
                    progress.avatar.updated += result.avatar.updated;
                    this.logger.info(`Contact ${chatId}: created=${result.created}, updated=${result.updated}, avatar.updated=${result.avatar.updated}`);
                }
                catch (e) {
                    this.logger.error(`Error pulling contact ${contact.id}: ${e}`);
                    progress.errors += 1;
                }
                await job.updateProgress(progress);
                await (0, promiseTimeout_1.sleep)(options.delay.contact);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = contacts_1.return)) await _b.call(contacts_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        await this.activity.completed(progress);
    }
    async pullOneContact(options, chatId) {
        const contactInfo = (0, WhatsAppContactInfo_1.WhatsAppContactInfo)(this.session, chatId, this.l);
        let [cwContact, created] = await this.contactService.findOrCreateContact(contactInfo);
        if (options.attributes) {
            const attributes = await contactInfo.Attributes();
            await this.contactService.upsertCustomAttributes(cwContact.data, attributes);
        }
        let avatarUpdated = false;
        switch (options.avatar) {
            case 'if-missing':
                avatarUpdated = await this.contactService.updateAvatar(cwContact, contactInfo, ContactService_1.AvatarUpdateMode.IF_MISSING);
                break;
            case 'update':
                avatarUpdated = await this.contactService.updateAvatar(cwContact, contactInfo, ContactService_1.AvatarUpdateMode.ALWAYS);
                break;
        }
        return {
            created: created ? 1 : 0,
            updated: created ? 0 : 1,
            avatar: {
                updated: avatarUpdated ? 1 : 0,
            },
        };
    }
}
class TaskActivity {
    constructor(l, conversation) {
        this.l = l;
        this.conversation = conversation;
    }
    async started(progress) {
        await this.conversation.activity(this.l.r('task.contacts.started', { progress: progress }));
    }
    async progress(progress) {
        await this.conversation.activity(this.l.r('task.contacts.progress', { progress: progress }));
    }
    async completed(progress) {
        await this.conversation.activity(this.l.r('task.contacts.completed', { progress: progress }));
    }
}
function ContactsPullStatusMessage(l, job, state) {
    const details = (0, JobUtils_1.JobLink)(job);
    const progress = lodash.merge({}, NullProgress, job.progress);
    const payload = {
        error: state === 'failed' || state === 'unknown' || progress.errors > 0,
        state: lodash.capitalize(state !== null && state !== void 0 ? state : 'unknown'),
        progress: progress,
        details: details,
    };
    return l.r('task.contacts.status', payload);
}
//# sourceMappingURL=contacts.pull.js.map