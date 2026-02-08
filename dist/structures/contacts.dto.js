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
exports.ContactUpdateBody = exports.ContactRequest = exports.ContactsPaginationParams = exports.ContactSortField = exports.ContactProfilePictureQuery = exports.ContactQuery = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const BooleanString_1 = require("../nestjs/validation/BooleanString");
const pagination_dto_1 = require("./pagination.dto");
const properties_dto_1 = require("./properties.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class ContactQuery extends base_dto_1.SessionQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactId: { required: true, type: () => String } };
    }
}
exports.ContactQuery = ContactQuery;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQuery.prototype, "contactId", void 0);
class ContactProfilePictureQuery extends ContactQuery {
    constructor() {
        super(...arguments);
        this.refresh = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { refresh: { required: false, type: () => Boolean, default: false } };
    }
}
exports.ContactProfilePictureQuery = ContactProfilePictureQuery;
__decorate([
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'Refresh the picture from the server (24h cache by default). Do not refresh if not needed, you can get rate limit error',
    }),
    __metadata("design:type", Boolean)
], ContactProfilePictureQuery.prototype, "refresh", void 0);
var ContactSortField;
(function (ContactSortField) {
    ContactSortField["ID"] = "id";
    ContactSortField["NAME"] = "name";
})(ContactSortField || (exports.ContactSortField = ContactSortField = {}));
class ContactsPaginationParams extends pagination_dto_1.PaginationParams {
    static _OPENAPI_METADATA_FACTORY() {
        return { sortBy: { required: false, type: () => String } };
    }
}
exports.ContactsPaginationParams = ContactsPaginationParams;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort by field',
        enum: ContactSortField,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ContactSortField),
    __metadata("design:type", String)
], ContactsPaginationParams.prototype, "sortBy", void 0);
class ContactRequest extends base_dto_1.SessionBaseRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactId: { required: true, type: () => String } };
    }
}
exports.ContactRequest = ContactRequest;
__decorate([
    (0, properties_dto_1.ChatIdProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactRequest.prototype, "contactId", void 0);
class ContactUpdateBody {
    constructor() {
        this.firstName = 'John';
        this.lastName = 'Doe';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String, default: "John" }, lastName: { required: true, type: () => String, default: "Doe" } };
    }
}
exports.ContactUpdateBody = ContactUpdateBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact First Name',
        example: 'John',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactUpdateBody.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact Last Name',
        example: 'Doe',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactUpdateBody.prototype, "lastName", void 0);
//# sourceMappingURL=contacts.dto.js.map