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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatwootWebhookController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ids_1 = require("../client/ids");
const types_1 = require("../client/types");
const ChatWootQueueService_1 = require("../services/ChatWootQueueService");
const manager_abc_1 = require("../../../core/abc/manager.abc");
const AppRepository_1 = require("../../app_sdk/storage/AppRepository");
const cli_1 = require("../cli");
let ChatwootWebhookController = class ChatwootWebhookController {
    constructor(chatWootQueueService, manager) {
        this.chatWootQueueService = chatWootQueueService;
        this.manager = manager;
    }
    async webhook(session, id, body) {
        var _a, _b, _c, _d, _e;
        if (!body || !(body === null || body === void 0 ? void 0 : body.event)) {
            return { success: true };
        }
        if (body.message_type == types_1.MessageType.INCOMING) {
            return { success: true };
        }
        const isCommandsChat = (0, ids_1.IsCommandsChat)(body);
        const deleted = (_a = body === null || body === void 0 ? void 0 : body.content_attributes) === null || _a === void 0 ? void 0 : _a.deleted;
        if (body.private) {
            if (isCommandsChat) {
                return { success: true };
            }
            if (!deleted) {
                return { success: true };
            }
        }
        const data = {
            session: session,
            app: id,
            body: body,
        };
        const knex = this.manager.store.getWAHADatabase();
        const repo = new AppRepository_1.AppRepository(knex);
        const app = await repo.findEnabledAppById(id);
        if (!app || app.session !== session) {
            throw new common_1.NotFoundException(`App '${id}' not found`);
        }
        if (deleted && !isCommandsChat) {
            await this.chatWootQueueService.addMessageDeletedJob(data);
            return { success: true };
        }
        switch (body.event) {
            case types_1.EventName.MESSAGE_CREATED:
                if (isCommandsChat || ((_b = body.content) === null || _b === void 0 ? void 0 : _b.startsWith(cli_1.CommandPrefix))) {
                    await this.chatWootQueueService.addCommandsJob(body.event, data);
                }
                else {
                    await this.chatWootQueueService.addMessageCreatedJob(data);
                }
                return { success: true };
            case types_1.EventName.MESSAGE_UPDATED:
                const isRetryNull = ((_c = body.content_attributes) === null || _c === void 0 ? void 0 : _c.external_error) === null;
                const isRetrySomething = Boolean((_d = body.content_attributes) === null || _d === void 0 ? void 0 : _d.external_error);
                const isRetry = isRetryNull || isRetrySomething;
                if (!isRetry) {
                    return { success: true };
                }
                if (isCommandsChat || ((_e = body.content) === null || _e === void 0 ? void 0 : _e.startsWith(cli_1.CommandPrefix))) {
                    await this.chatWootQueueService.addCommandsJob(body.event, data);
                }
                else {
                    await this.chatWootQueueService.addMessageUpdatedJob(data);
                }
                return { success: true };
            default:
                await this.chatWootQueueService.addJobToQueue(body.event, data);
                return { success: true };
        }
    }
};
exports.ChatwootWebhookController = ChatwootWebhookController;
__decorate([
    (0, common_1.Post)(':session/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Chatwoot Webhook',
        description: 'Chatwoot Webhook',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('session')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatwootWebhookController.prototype, "webhook", null);
exports.ChatwootWebhookController = ChatwootWebhookController = __decorate([
    (0, common_1.Controller)('webhooks/chatwoot/'),
    (0, swagger_1.ApiTags)('🧩 Apps'),
    __metadata("design:paramtypes", [ChatWootQueueService_1.ChatWootQueueService,
        manager_abc_1.SessionManager])
], ChatwootWebhookController);
//# sourceMappingURL=chatwoot.webhook.controller.js.map