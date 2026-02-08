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
exports.ContactsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const manager_abc_1 = require("../core/abc/manager.abc");
const base_dto_1 = require("../structures/base.dto");
const chatting_dto_1 = require("../structures/chatting.dto");
const contacts_dto_1 = require("../structures/contacts.dto");
let ContactsController = class ContactsController {
    constructor(manager) {
        this.manager = manager;
    }
    async getAll(query, pagination) {
        const whatsapp = await this.manager.getWorkingSession(query.session);
        return whatsapp.getContacts(pagination);
    }
    async get(query) {
        const whatsapp = await this.manager.getWorkingSession(query.session);
        return whatsapp.getContact(query);
    }
    async checkExists(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.checkNumberStatus(request);
    }
    async getAbout(query) {
        const whatsapp = await this.manager.getWorkingSession(query.session);
        return whatsapp.getContactAbout(query);
    }
    async getProfilePicture(query) {
        const whatsapp = await this.manager.getWorkingSession(query.session);
        const url = await whatsapp.getContactProfilePicture(query.contactId, query.refresh);
        return { profilePictureURL: url };
    }
    async block(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.blockContact(request);
    }
    async unblock(request) {
        const whatsapp = await this.manager.getWorkingSession(request.session);
        return whatsapp.unblockContact(request);
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all contacts' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.SessionQuery,
        contacts_dto_1.ContactsPaginationParams]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get contact basic info',
        description: 'The method always return result, even if the phone number is not registered in WhatsApp. For that - use /contacts/check-exists endpoint below.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contacts_dto_1.ContactQuery]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/check-exists'),
    (0, swagger_1.ApiOperation)({ summary: 'Check phone number is registered in WhatsApp.' }),
    openapi.ApiResponse({ status: 200, type: require("../structures/chatting.dto").WANumberExistResult }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.CheckNumberStatusQuery]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "checkExists", null);
__decorate([
    (0, common_1.Get)('/about'),
    (0, swagger_1.ApiOperation)({
        summary: 'Gets the Contact\'s "about" info',
        description: 'Returns null if you do not have permission to read their status.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contacts_dto_1.ContactQuery]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getAbout", null);
__decorate([
    (0, common_1.Get)('/profile-picture'),
    (0, swagger_1.ApiOperation)({
        summary: "Get contact's profile picture URL",
        description: 'If privacy settings do not allow to get the picture, the method will return null.',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contacts_dto_1.ContactProfilePictureQuery]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getProfilePicture", null);
__decorate([
    (0, common_1.Post)('/block'),
    (0, swagger_1.ApiOperation)({ summary: 'Block contact' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contacts_dto_1.ContactRequest]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "block", null);
__decorate([
    (0, common_1.Post)('/unblock'),
    (0, swagger_1.ApiOperation)({ summary: 'Unblock contact' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contacts_dto_1.ContactRequest]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "unblock", null);
exports.ContactsController = ContactsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/contacts'),
    (0, swagger_1.ApiTags)('👤 Contacts'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], ContactsController);
//# sourceMappingURL=contacts.controller.js.map