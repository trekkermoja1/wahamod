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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupInfo = exports.GroupId = exports.GroupParticipant = exports.GroupParticipantRole = exports.GroupsPaginationParams = exports.GroupSortField = exports.GroupsListFields = exports.GroupField = exports.JoinGroupResponse = exports.JoinGroupRequest = exports.CreateGroupRequest = exports.SubjectRequest = exports.DescriptionRequest = exports.ParticipantsRequest = exports.SettingsSecurityChangeInfo = exports.Participant = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("./pagination.dto");
class Participant {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.Participant = Participant;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '123456789@c.us',
    }),
    __metadata("design:type", String)
], Participant.prototype, "id", void 0);
class SettingsSecurityChangeInfo {
    constructor() {
        this.adminsOnly = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { adminsOnly: { required: true, type: () => Boolean, default: true } };
    }
}
exports.SettingsSecurityChangeInfo = SettingsSecurityChangeInfo;
class ParticipantsRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { participants: { required: true, type: () => [require("./groups.dto").Participant] } };
    }
}
exports.ParticipantsRequest = ParticipantsRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ParticipantsRequest.prototype, "participants", void 0);
class DescriptionRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: true, type: () => String } };
    }
}
exports.DescriptionRequest = DescriptionRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DescriptionRequest.prototype, "description", void 0);
class SubjectRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { subject: { required: true, type: () => String } };
    }
}
exports.SubjectRequest = SubjectRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubjectRequest.prototype, "subject", void 0);
class CreateGroupRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, participants: { required: true, type: () => [require("./groups.dto").Participant] } };
    }
}
exports.CreateGroupRequest = CreateGroupRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateGroupRequest.prototype, "participants", void 0);
class JoinGroupRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => String } };
    }
}
exports.JoinGroupRequest = JoinGroupRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Group code (123) or url (https://chat.whatsapp.com/123)',
        example: 'https://chat.whatsapp.com/1234567890abcdef',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JoinGroupRequest.prototype, "code", void 0);
class JoinGroupResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.JoinGroupResponse = JoinGroupResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Group ID',
        example: '123@g.us',
    }),
    __metadata("design:type", String)
], JoinGroupResponse.prototype, "id", void 0);
var GroupField;
(function (GroupField) {
    GroupField["NONE"] = "";
    GroupField["PARTICIPANTS"] = "participants";
})(GroupField || (exports.GroupField = GroupField = {}));
class GroupsListFields {
    static _OPENAPI_METADATA_FACTORY() {
        return { exclude: { required: true, type: () => [String] } };
    }
}
exports.GroupsListFields = GroupsListFields;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Exclude fields',
        enum: GroupField,
        isArray: true,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(GroupField, { each: true }),
    __metadata("design:type", Array)
], GroupsListFields.prototype, "exclude", void 0);
var GroupSortField;
(function (GroupSortField) {
    GroupSortField["ID"] = "id";
    GroupSortField["SUBJECT"] = "subject";
})(GroupSortField || (exports.GroupSortField = GroupSortField = {}));
class GroupsPaginationParams extends pagination_dto_1.PaginationParams {
    static _OPENAPI_METADATA_FACTORY() {
        return { sortBy: { required: false, type: () => String } };
    }
}
exports.GroupsPaginationParams = GroupsPaginationParams;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort by field',
        enum: GroupSortField,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(GroupSortField),
    __metadata("design:type", String)
], GroupsPaginationParams.prototype, "sortBy", void 0);
var GroupParticipantRole;
(function (GroupParticipantRole) {
    GroupParticipantRole["LEFT"] = "left";
    GroupParticipantRole["PARTICIPANT"] = "participant";
    GroupParticipantRole["ADMIN"] = "admin";
    GroupParticipantRole["SUPERADMIN"] = "superadmin";
})(GroupParticipantRole || (exports.GroupParticipantRole = GroupParticipantRole = {}));
class GroupParticipant {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, pn: { required: false, type: () => String }, role: { required: true, enum: require("./groups.dto").GroupParticipantRole } };
    }
}
exports.GroupParticipant = GroupParticipant;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Member ID in @c.us or @lid format',
        example: '123456789@lid',
    }),
    __metadata("design:type", String)
], GroupParticipant.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Member ID in @c.us format',
        example: '123456789@c.us',
    }),
    __metadata("design:type", String)
], GroupParticipant.prototype, "pn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: GroupParticipantRole.PARTICIPANT,
    }),
    __metadata("design:type", String)
], GroupParticipant.prototype, "role", void 0);
class GroupId {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.GroupId = GroupId;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456789@g.us',
    }),
    __metadata("design:type", String)
], GroupId.prototype, "id", void 0);
class GroupInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, subject: { required: true, type: () => String }, description: { required: true, type: () => String }, participants: { required: true, type: () => [require("./groups.dto").GroupParticipant] }, invite: { required: false, type: () => String }, membersCanAddNewMember: { required: true, type: () => Boolean }, membersCanSendMessages: { required: true, type: () => Boolean }, newMembersApprovalRequired: { required: true, type: () => Boolean } };
    }
}
exports.GroupInfo = GroupInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456789@g.us',
    }),
    __metadata("design:type", String)
], GroupInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Group Name',
    }),
    __metadata("design:type", String)
], GroupInfo.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Group Description',
    }),
    __metadata("design:type", String)
], GroupInfo.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Invite URL',
        example: 'https://chat.whatsapp.com/1234567890abcdef',
    }),
    __metadata("design:type", String)
], GroupInfo.prototype, "invite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Members can add new members',
    }),
    __metadata("design:type", Boolean)
], GroupInfo.prototype, "membersCanAddNewMember", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Members can send messages to the group',
    }),
    __metadata("design:type", Boolean)
], GroupInfo.prototype, "membersCanSendMessages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin approval required for new members',
    }),
    __metadata("design:type", Boolean)
], GroupInfo.prototype, "newMembersApprovalRequired", void 0);
//# sourceMappingURL=groups.dto.js.map