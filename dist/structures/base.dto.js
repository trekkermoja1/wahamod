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
exports.CountResponse = exports.Result = exports.SessionBaseRequest = exports.SessionQuery = exports.WHATSAPP_DEFAULT_SESSION_NAME = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
exports.WHATSAPP_DEFAULT_SESSION_NAME = 'default';
class SessionQuery {
    constructor() {
        this.session = exports.WHATSAPP_DEFAULT_SESSION_NAME;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { session: { required: true, type: () => String, default: exports.WHATSAPP_DEFAULT_SESSION_NAME } };
    }
}
exports.SessionQuery = SessionQuery;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SessionQuery.prototype, "session", void 0);
class SessionBaseRequest {
    constructor() {
        this.session = exports.WHATSAPP_DEFAULT_SESSION_NAME;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { session: { required: true, type: () => String, default: exports.WHATSAPP_DEFAULT_SESSION_NAME } };
    }
}
exports.SessionBaseRequest = SessionBaseRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SessionBaseRequest.prototype, "session", void 0);
class Result {
    constructor() {
        this.success = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { success: { required: true, type: () => Boolean, default: true } };
    }
}
exports.Result = Result;
class CountResponse {
    constructor() {
        this.count = 0;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { count: { required: true, type: () => Number, default: 0 } };
    }
}
exports.CountResponse = CountResponse;
//# sourceMappingURL=base.dto.js.map