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
exports.WhatsappConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const GlobalWebhookConfig_1 = require("./core/config/GlobalWebhookConfig");
const helpers_1 = require("./helpers");
const config_2 = require("./core/auth/config");
let WhatsappConfigService = class WhatsappConfigService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger('WhatsappConfigService');
        this.webhookConfig = new GlobalWebhookConfig_1.GlobalWebhookConfigConfig(configService);
    }
    get schema() {
        return this.configService.get('WHATSAPP_API_SCHEMA', 'http');
    }
    get hostname() {
        return this.configService.get('WHATSAPP_API_HOSTNAME', 'localhost');
    }
    get port() {
        if (this.configService.get('PORT')) {
            return this.configService.get('PORT');
        }
        return this.configService.get('WHATSAPP_API_PORT', '3000');
    }
    get baseUrl() {
        let baseUrl = this.configService.get('WAHA_BASE_URL', '');
        if (!baseUrl) {
            baseUrl = `${this.schema}://${this.hostname}:${this.port}`;
        }
        return baseUrl.replace(/\/$/, '');
    }
    get workerId() {
        return this.configService.get('WAHA_WORKER_ID', '');
    }
    get shouldRestartWorkerSessions() {
        const value = this.configService.get('WAHA_WORKER_RESTART_SESSIONS', 'true');
        return (0, helpers_1.parseBool)(value);
    }
    get autoStartDelaySeconds() {
        const value = this.configService.get('WAHA_AUTO_START_DELAY_SECONDS', '0');
        try {
            return parseInt(value, 10);
        }
        catch (error) {
            return 0;
        }
    }
    get mimetypes() {
        if (!this.shouldDownloadMedia) {
            return ['mimetype/ignore-all-media'];
        }
        const types = this.configService.get('WHATSAPP_FILES_MIMETYPES', '');
        return types ? types.split(',') : [];
    }
    get shouldDownloadMedia() {
        const value = this.configService.get('WHATSAPP_DOWNLOAD_MEDIA', 'true');
        return (0, helpers_1.parseBool)(value);
    }
    get startSessions() {
        const value = this.configService.get('WHATSAPP_START_SESSION', '');
        if (!value) {
            return [];
        }
        return value.split(',');
    }
    get shouldRestartAllSessions() {
        const value = this.configService.get('WHATSAPP_RESTART_ALL_SESSIONS', 'false');
        return (0, helpers_1.parseBool)(value);
    }
    get proxyServer() {
        const single = this.configService.get('WHATSAPP_PROXY_SERVER', undefined);
        const multipleValues = this.configService.get('WHATSAPP_PROXY_SERVER_LIST', undefined);
        const multiple = multipleValues ? multipleValues.split(',') : undefined;
        return single ? single : multiple;
    }
    get proxyServerIndexPrefix() {
        return this.configService.get('WHATSAPP_PROXY_SERVER_INDEX_PREFIX', undefined);
    }
    get proxyServerUsername() {
        return this.configService.get('WHATSAPP_PROXY_SERVER_USERNAME', undefined);
    }
    get proxyServerPassword() {
        return this.configService.get('WHATSAPP_PROXY_SERVER_PASSWORD', undefined);
    }
    getWebhookConfig() {
        return this.webhookConfig.config;
    }
    getSessionMongoUrl() {
        return this.configService.get('WHATSAPP_SESSIONS_MONGO_URL', undefined);
    }
    getSessionPostgresUrl() {
        return this.configService.get('WHATSAPP_SESSIONS_POSTGRESQL_URL', undefined);
    }
    get(name, defaultValue = undefined) {
        return this.configService.get(name, defaultValue);
    }
    getApiKey() {
        return config_2.Auth.key.value;
    }
    getExcludedPaths() {
        const value = this.configService.get('WHATSAPP_API_KEY_EXCLUDE_PATH', '');
        if (!value) {
            return [];
        }
        return value.split(',').filter(Boolean);
    }
    getExcludedFullPaths() {
        const paths = this.getExcludedPaths();
        return paths.map((path) => (path.startsWith('/') ? path : `/${path}`));
    }
    getHealthMediaFilesThreshold() {
        return this.configService.get('WHATSAPP_HEALTH_MEDIA_FILES_THRESHOLD_MB', 100);
    }
    getHealthSessionFilesThreshold() {
        return this.configService.get('WHATSAPP_HEALTH_SESSION_FILES_THRESHOLD_MB', 100);
    }
    getHealthMongoTimeout() {
        return this.configService.get('WHATSAPP_HEALTH_MONGO_TIMEOUT_MS', 3000);
    }
    get debugModeEnabled() {
        const value = this.configService.get('WAHA_DEBUG_MODE', 'false');
        return (0, helpers_1.parseBool)(value);
    }
    getIgnoreChatsConfig() {
        const status = (0, helpers_1.parseBool)(this.configService.get('WAHA_SESSION_CONFIG_IGNORE_STATUS', 'false'));
        const groups = (0, helpers_1.parseBool)(this.configService.get('WAHA_SESSION_CONFIG_IGNORE_GROUPS', 'false'));
        const channels = (0, helpers_1.parseBool)(this.configService.get('WAHA_SESSION_CONFIG_IGNORE_CHANNELS', 'false'));
        const broadcast = (0, helpers_1.parseBool)(this.configService.get('WAHA_SESSION_CONFIG_IGNORE_BROADCAST', 'false'));
        return { status, groups, channels, broadcast };
    }
    onApplicationBootstrap() {
        const error = this.webhookConfig.validateConfig();
        if (error) {
            throw new Error(`Invalid global webhook config:\n${error}\n`);
        }
    }
};
exports.WhatsappConfigService = WhatsappConfigService;
exports.WhatsappConfigService = WhatsappConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsappConfigService);
//# sourceMappingURL=config.service.js.map