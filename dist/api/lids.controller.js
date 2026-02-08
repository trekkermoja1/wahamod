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
exports.LidsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session_abc_1 = require("../core/abc/session.abc");
const SessionApiParam_1 = require("../nestjs/params/SessionApiParam");
const lids_dto_1 = require("../structures/lids.dto");
const pagination_dto_1 = require("../structures/pagination.dto");
const manager_abc_1 = require("../core/abc/manager.abc");
const jids_1 = require("../core/utils/jids");
let LidsController = class LidsController {
    constructor(manager) {
        this.manager = manager;
    }
    async getAll(session, params) {
        const pagination = params;
        pagination.sortBy = 'lid';
        pagination.sortOrder = pagination_dto_1.SortOrder.ASC;
        const lids = await session.getAllLids(pagination);
        return lids;
    }
    async getLidsCount(session) {
        const count = await session.getLidsCount();
        return {
            count: count,
        };
    }
    async findPNByLid(session, lid) {
        if (!lid.includes('@')) {
            lid = lid + '@lid';
        }
        if (!(0, jids_1.isLidUser)(lid)) {
            throw new common_1.UnprocessableEntityException('Invalid LID - it must end with @lid');
        }
        const result = await session.findPNByLid(lid);
        result.pn = result.pn || null;
        return result;
    }
    async findLIDByPhoneNumber(session, phoneNumber) {
        if ((0, jids_1.isLidUser)(phoneNumber)) {
            return {
                lid: phoneNumber,
                pn: null,
            };
        }
        const result = await session.findLIDByPhoneNumber(phoneNumber);
        result.lid = result.lid || null;
        return result;
    }
};
exports.LidsController = LidsController;
__decorate([
    (0, common_1.Get)('/'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get all known lids to phone number mapping' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: [require("../structures/lids.dto").LidToPhoneNumber] }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession,
        lids_dto_1.LidsListQueryParams]),
    __metadata("design:returntype", Promise)
], LidsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/count'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get the number of known lids' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/base.dto").CountResponse }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession]),
    __metadata("design:returntype", Promise)
], LidsController.prototype, "getLidsCount", null);
__decorate([
    (0, common_1.Get)('/:lid'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get phone number by lid' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/lids.dto").LidToPhoneNumber }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('lid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], LidsController.prototype, "findPNByLid", null);
__decorate([
    (0, common_1.Get)('/pn/:phoneNumber'),
    SessionApiParam_1.SessionApiParam,
    (0, swagger_1.ApiOperation)({ summary: 'Get lid by phone number (chat id)' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: require("../structures/lids.dto").LidToPhoneNumber }),
    __param(0, SessionApiParam_1.WorkingSessionParam),
    __param(1, (0, common_1.Param)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_abc_1.WhatsappSession, String]),
    __metadata("design:returntype", Promise)
], LidsController.prototype, "findLIDByPhoneNumber", null);
exports.LidsController = LidsController = __decorate([
    (0, swagger_1.ApiSecurity)('api_key'),
    (0, common_1.Controller)('api/:session/lids'),
    (0, swagger_1.ApiTags)('👤 Contacts'),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], LidsController);
//# sourceMappingURL=lids.controller.js.map