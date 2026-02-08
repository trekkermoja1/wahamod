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
exports.ServerStatusResponse = exports.WorkerInfo = exports.StopResponse = exports.StopRequest = exports.EnvironmentQuery = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const BooleanString_1 = require("../nestjs/validation/BooleanString");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class EnvironmentQuery {
    constructor() {
        this.all = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { all: { required: true, type: () => Boolean, default: false } };
    }
}
exports.EnvironmentQuery = EnvironmentQuery;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'Include all environment variables',
    }),
    (0, class_transformer_1.Transform)(BooleanString_1.BooleanString),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EnvironmentQuery.prototype, "all", void 0);
class StopRequest {
    constructor() {
        this.force = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { force: { required: true, type: () => Boolean, default: false } };
    }
}
exports.StopRequest = StopRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'By default, it gracefully stops the server, ' +
            'but you can force it to terminate immediately.',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], StopRequest.prototype, "force", void 0);
class StopResponse {
    constructor() {
        this.stopping = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { stopping: { required: true, type: () => Boolean, default: true } };
    }
}
exports.StopResponse = StopResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Always 'true' if the server is stopping.",
    }),
    __metadata("design:type", Boolean)
], StopResponse.prototype, "stopping", void 0);
class WorkerInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.WorkerInfo = WorkerInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'waha',
        description: 'The worker ID.',
    }),
    __metadata("design:type", String)
], WorkerInfo.prototype, "id", void 0);
class ServerStatusResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { startTimestamp: { required: true, type: () => Number }, uptime: { required: true, type: () => Number }, worker: { required: true, type: () => require("./server.dto").WorkerInfo } };
    }
}
exports.ServerStatusResponse = ServerStatusResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1723788847247,
        description: 'The timestamp when the server started (milliseconds).',
    }),
    __metadata("design:type", Number)
], ServerStatusResponse.prototype, "startTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3600000,
        description: 'The uptime of the server in milliseconds.',
    }),
    __metadata("design:type", Number)
], ServerStatusResponse.prototype, "uptime", void 0);
//# sourceMappingURL=server.dto.js.map