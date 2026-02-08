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
var CheckVersionConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckVersionConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("../../../app_sdk/constants");
const QueueName_1 = require("../QueueName");
const manager_abc_1 = require("../../../../core/abc/manager.abc");
const constants_2 = require("../../../../core/constants");
const rmutex_service_1 = require("../../../../modules/rmutex/rmutex.service");
const version_1 = require("../../../../version");
const axios_1 = require("axios");
const nestjs_pino_1 = require("nestjs-pino");
const base_1 = require("./base");
const templates_1 = require("../../i18n/templates");
let CheckVersionConsumer = CheckVersionConsumer_1 = class CheckVersionConsumer extends base_1.ChatWootScheduledConsumer {
    constructor(manager, log, rmutex) {
        super(manager, log, rmutex, CheckVersionConsumer_1.name);
    }
    ErrorHeaderKey() {
        return templates_1.TKey.JOB_SCHEDULED_ERROR_HEADER;
    }
    async Process(container, job) {
        await this.CheckWAHACoreVersion(container);
        await this.CheckNewVersionAvailable(container);
    }
    async CheckWAHACoreVersion(container) {
        const logger = container.Logger();
        const locale = container.Locale();
        const conversation = await container
            .ContactConversationService()
            .InboxNotifications();
        if (version_1.VERSION.tier !== version_1.WAHAVersion.CORE) {
            logger.info('WAHA is not using the CORE version');
            return;
        }
        logger.info('WAHA is using the CORE version');
        const supportMessage = locale.key(templates_1.TKey.WAHA_CORE_VERSION_USED).render({
            supportUrl: constants_2.SUPPORT_US_URL,
        });
        await conversation.incoming(supportMessage);
    }
    async CheckNewVersionAvailable(container) {
        const logger = container.Logger();
        logger.info('Processing version check job');
        const currentVersion = version_1.VERSION.version;
        logger.info(`Current WAHA version: ${currentVersion}`);
        const latestVersion = await this.fetchLatestVersion(logger);
        const isNewVersionAvailable = currentVersion !== latestVersion;
        if (!isNewVersionAvailable) {
            logger.info('WAHA is up to date');
            return;
        }
        logger.info(`New version available: ${latestVersion} (current: ${currentVersion})`);
        const locale = container.Locale();
        const message = locale.key(templates_1.TKey.WAHA_NEW_VERSION_AVAILABLE).render({
            currentVersion: currentVersion,
            newVersion: latestVersion,
            changelogUrl: constants_2.CHANGELOG_URL,
        });
        const conversation = await container
            .ContactConversationService()
            .InboxNotifications();
        await conversation.incoming(message);
    }
    async fetchLatestVersion(logger) {
        const response = await axios_1.default.get('https://api.github.com/repos/devlikeapro/waha/releases/latest');
        const latestVersion = response.data.name;
        logger.info(`Latest WAHA version: ${latestVersion}`);
        return latestVersion;
    }
};
exports.CheckVersionConsumer = CheckVersionConsumer;
exports.CheckVersionConsumer = CheckVersionConsumer = CheckVersionConsumer_1 = __decorate([
    (0, bullmq_1.Processor)(QueueName_1.QueueName.SCHEDULED_CHECK_VERSION, { concurrency: constants_1.JOB_CONCURRENCY }),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager, nestjs_pino_1.PinoLogger, rmutex_service_1.RMutexService])
], CheckVersionConsumer);
//# sourceMappingURL=check.version.js.map