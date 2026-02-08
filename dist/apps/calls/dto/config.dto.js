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
exports.CallsAppConfig = exports.CallsAppChannelConfig = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CallsAppChannelConfig {
    constructor() {
        this.reject = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { reject: { required: true, type: () => Boolean, default: true }, message: { required: false, type: () => String } };
    }
}
exports.CallsAppChannelConfig = CallsAppChannelConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reject incoming calls for this chat type',
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CallsAppChannelConfig.prototype, "reject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional auto-reply message sent after the call is rejected. If empty, no message is sent.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CallsAppChannelConfig.prototype, "message", void 0);
class CallsAppConfig {
    constructor() {
        this.dm = new CallsAppChannelConfig();
        this.group = new CallsAppChannelConfig();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { dm: { required: true, type: () => require("./config.dto").CallsAppChannelConfig, default: new CallsAppChannelConfig() }, group: { required: true, type: () => require("./config.dto").CallsAppChannelConfig, default: new CallsAppChannelConfig() } };
    }
}
exports.CallsAppConfig = CallsAppConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rules applied to direct messages (non-group calls)',
        type: CallsAppChannelConfig,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CallsAppChannelConfig),
    __metadata("design:type", CallsAppChannelConfig)
], CallsAppConfig.prototype, "dm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rules applied to group calls',
        type: CallsAppChannelConfig,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CallsAppChannelConfig),
    __metadata("design:type", CallsAppChannelConfig)
], CallsAppConfig.prototype, "group", void 0);
//# sourceMappingURL=config.dto.js.map