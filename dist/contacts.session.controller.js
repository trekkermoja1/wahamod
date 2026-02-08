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
exports.ContactsSessionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session_abc_1 = require("./core/abc/session.abc");
const ChatIdApiParam_1 = require("./nestjs/params/ChatIdApiParam");
const SessionApiParam_1 = require("./nestjs/params/SessionApiParam");
const WAHAValidationPipe_1 = require("./nestjs/pipes/WAHAValidationPipe");
const manager_abc_1 = require("./core/abc/manager.abc");
const contacts_dto_1 = require("./structures/contacts.dto");
let ContactsSessionController = class ContactsSessionController {
    constructor(manager) {
        this.manager = manager;
    }
    async put(session, chatId, body) {
        await session.upsertContact(chatId, body);
        return { success: true };
    }
};
exports.ContactsSessionController = ContactsSessionController;
__decorate([
    (0, common_1.Put)('/:chatId'),
    SessionApiParam_1.SessionApiParam,
    ChatIdApiParam_1.ChatIdApiParam,
    (0, swagger_1.ApiOperation)({
        summary: 'Create or update contact',
        description: 'Create or update contact on the phone address book. May not work if you have installed many WhatsApp apps on the same phone',
    }),
    (0, common_1.UsePipes)(new WAHAValidationPipe_1.WAHAValidationPipe()),
    openapi.ApiResponse({ status: 200, type: require("./structures/base.dto").Result }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('chatId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String, contacts_dto_1.ContactUpdateBody]),
    __metadata("design:returntype", Promise)
], ContactsSessionController.prototype, "put", null);
exports.ContactsSessionController = ContactsSessionController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/contacts'),
    (0, swagger_1.ApiTags)('👤 Contacts'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], ContactsSessionController);
//# sourceMappingURL=contacts.session.controller.js.map