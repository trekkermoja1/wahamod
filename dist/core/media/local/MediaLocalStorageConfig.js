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
exports.MediaLocalStorageConfig = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../../config.service");
let MediaLocalStorageConfig = class MediaLocalStorageConfig {
    constructor(config) {
        this.config = config;
        this.filesUri = '/api/files';
    }
    get filesURL() {
        return `${this.config.baseUrl}${this.filesUri}/`;
    }
    get filesFolder() {
        return this.config.get('WHATSAPP_FILES_FOLDER', '/tmp/whatsapp-files');
    }
    get filesLifetime() {
        return parseInt(this.config.get('WHATSAPP_FILES_LIFETIME', '180'));
    }
};
exports.MediaLocalStorageConfig = MediaLocalStorageConfig;
exports.MediaLocalStorageConfig = MediaLocalStorageConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.WhatsappConfigService])
], MediaLocalStorageConfig);
//# sourceMappingURL=MediaLocalStorageConfig.js.map