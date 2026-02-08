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
exports.LabelsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session_abc_1 = require("../core/abc/session.abc");
const ChatIdApiParam_1 = require("../nestjs/params/ChatIdApiParam");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const labels_dto_1 = require("../structures/labels.dto");
const lodash = require("lodash");
const manager_abc_1 = require("../core/abc/manager.abc");
let LabelsController = class LabelsController {
    constructor(manager) {
        this.manager = manager;
    }
    getAll(session) {
        return session.getLabels();
    }
    async create(session, body) {
        const labelDto = body.toDTO();
        const labels = await session.getLabels();
        if (labels.length >= 20) {
            throw new common_1.UnprocessableEntityException('Maximum 20 labels allowed');
        }
        const labelByName = lodash.find(labels, { name: labelDto.name });
        if (labelByName) {
            throw new common_1.UnprocessableEntityException(`Label with '${labelByName.name}' already exists, id: ${labelByName.id}`);
        }
        return session.createLabel(labelDto);
    }
    async update(session, labelId, body) {
        const label = await session.getLabel(labelId);
        if (!label) {
            throw new common_1.NotFoundException('Label not found');
        }
        const labelDto = body.toDTO();
        const labels = await session.getLabels();
        const labelByName = lodash.find(labels, { name: labelDto.name });
        if (labelByName) {
            throw new common_1.UnprocessableEntityException(`Label with '${labelByName.name}' already exists, id: ${labelByName.id}`);
        }
        label.name = labelDto.name;
        label.color = labelDto.color;
        label.colorHex = labels_dto_1.Label.toHex(label.color);
        await session.updateLabel(label);
        return label;
    }
    async delete(session, labelId) {
        const label = await session.getLabel(labelId);
        if (!label) {
            throw new common_1.NotFoundException('Label not found');
        }
        await session.deleteLabel(label);
        return { result: true };
    }
    getChatLabels(session, chatId) {
        return session.getChatLabels(chatId);
    }
    putChatLabels(session, chatId, request) {
        return session.putLabelsToChat(chatId, request.labels);
    }
    getChatsByLabel(session, labelId) {
        return session.getChatsByLabelId(labelId);
    }
};
exports.LabelsController = LabelsController;
__decorate([
    (0, common_1.Get)('/'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get all labels' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/labels.dto").Label] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Create a new label' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 201, type: require("../structures/labels.dto").Label }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        labels_dto_1.LabelBody]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:labelId'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Update a label' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/labels.dto").Label }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('labelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, labels_dto_1.LabelBody]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:labelId'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Delete a label' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('labelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/chats/:chatId'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get labels for the chat' }),
    openapi.ApiResponse({ status: 200, type: [require("../structures/labels.dto").Label] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "getChatLabels", null);
__decorate([
    (0, common_1.Put)('/chats/:chatId'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Save labels for the chat' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, labels_dto_1.SetLabelsRequest]),
    __metadata("design:returntype", void 0)
], LabelsController.prototype, "putChatLabels", null);
__decorate([
    (0, common_1.Get)('/:labelId/chats'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get chats by label' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('labelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", void 0)
], LabelsController.prototype, "getChatsByLabel", null);
exports.LabelsController = LabelsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/labels'),
    (0, swagger_1.ApiTags)('🏷️ Labels'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], LabelsController);
//# sourceMappingURL=labels.controller.js.map