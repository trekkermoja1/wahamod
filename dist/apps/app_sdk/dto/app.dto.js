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
exports.CallsAppDto = exports.ChatWootAppDto = exports.App = void 0;
const openapi = require("@nestjs/swagger");
const config_dto_1 = require("../../chatwoot/dto/config.dto");
const config_dto_2 = require("../../calls/dto/config.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const name_1 = require("../apps/name");
let App = class App {
    constructor() {
        this.enabled = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, session: { required: true, type: () => String }, app: { required: true, enum: require("../apps/name").AppName }, enabled: { required: false, type: () => Boolean, default: true }, config: { required: true } };
    }
};
exports.App = App;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], App.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], App.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(name_1.AppName),
    __metadata("design:type", String)
], App.prototype, "app", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enable or disable this app without deleting it. If omitted, treated as enabled (true).',
        required: false,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], App.prototype, "enabled", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)((options) => {
        if (options && options.object && options.object.app) {
            switch (options.object.app) {
                case name_1.AppName.chatwoot:
                    return config_dto_1.ChatWootAppConfig;
                case name_1.AppName.calls:
                    return config_dto_2.CallsAppConfig;
                default:
                    return Object;
            }
        }
        return Object;
    }),
    __metadata("design:type", Object)
], App.prototype, "config", void 0);
exports.App = App = __decorate([
    (0, swagger_1.ApiExtraModels)(config_dto_1.ChatWootAppConfig, config_dto_2.CallsAppConfig)
], App);
class ChatWootAppDto extends App {
    static _OPENAPI_METADATA_FACTORY() {
        return { config: { required: true, type: () => require("../../chatwoot/dto/config.dto").ChatWootAppConfig } };
    }
}
exports.ChatWootAppDto = ChatWootAppDto;
__decorate([
    (0, class_transformer_1.Type)(() => config_dto_1.ChatWootAppConfig),
    __metadata("design:type", config_dto_1.ChatWootAppConfig)
], ChatWootAppDto.prototype, "config", void 0);
class CallsAppDto extends App {
    static _OPENAPI_METADATA_FACTORY() {
        return { config: { required: true, type: () => require("../../calls/dto/config.dto").CallsAppConfig } };
    }
}
exports.CallsAppDto = CallsAppDto;
__decorate([
    (0, class_transformer_1.Type)(() => config_dto_2.CallsAppConfig),
    __metadata("design:type", config_dto_2.CallsAppConfig)
], CallsAppDto.prototype, "config", void 0);
//# sourceMappingURL=app.dto.js.map