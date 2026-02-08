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
exports.WebhookConfig = exports.HmacConfiguration = exports.CustomHeader = exports.RetriesConfiguration = exports.RetryPolicy = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const enums_dto_1 = require("./enums.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var RetryPolicy;
(function (RetryPolicy) {
    RetryPolicy["LINEAR"] = "linear";
    RetryPolicy["EXPONENTIAL"] = "exponential";
    RetryPolicy["CONSTANT"] = "constant";
})(RetryPolicy || (exports.RetryPolicy = RetryPolicy = {}));
class RetriesConfiguration {
    static _OPENAPI_METADATA_FACTORY() {
        return { delaySeconds: { required: false, type: () => Number }, attempts: { required: false, type: () => Number }, policy: { required: false, enum: require("./webhooks.config.dto").RetryPolicy } };
    }
}
exports.RetriesConfiguration = RetriesConfiguration;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetriesConfiguration.prototype, "delaySeconds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetriesConfiguration.prototype, "attempts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: RetryPolicy.LINEAR,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(RetryPolicy),
    __metadata("design:type", String)
], RetriesConfiguration.prototype, "policy", void 0);
class CustomHeader {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, value: { required: true, type: () => String } };
    }
}
exports.CustomHeader = CustomHeader;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'X-My-Custom-Header',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomHeader.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Value',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomHeader.prototype, "value", void 0);
class HmacConfiguration {
    static _OPENAPI_METADATA_FACTORY() {
        return { key: { required: false, type: () => String } };
    }
}
exports.HmacConfiguration = HmacConfiguration;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'your-secret-key',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], HmacConfiguration.prototype, "key", void 0);
class WebhookConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, events: { required: true, type: () => [Object], enum: enums_dto_1.AllEvents }, hmac: { required: false, type: () => require("./webhooks.config.dto").HmacConfiguration }, retries: { required: false, type: () => require("./webhooks.config.dto").RetriesConfiguration }, customHeaders: { required: false, type: () => [require("./webhooks.config.dto").CustomHeader] } };
    }
}
exports.WebhookConfig = WebhookConfig;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://webhook.site/11111111-1111-1111-1111-11111111',
        required: true,
        description: 'You can use https://docs.webhook.site/ to test webhooks and see the payload',
    }),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_tld: false,
    }),
    __metadata("design:type", String)
], WebhookConfig.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['message', 'session.status'],
        required: true,
    }),
    (0, class_validator_1.IsIn)(enums_dto_1.AllEvents, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WebhookConfig.prototype, "events", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => HmacConfiguration),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", HmacConfiguration)
], WebhookConfig.prototype, "hmac", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RetriesConfiguration),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", RetriesConfiguration)
], WebhookConfig.prototype, "retries", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomHeader),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], WebhookConfig.prototype, "customHeaders", void 0);
//# sourceMappingURL=webhooks.config.dto.js.map