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
exports.RMutexService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const nestjs_pino_1 = require("nestjs-pino");
const mutex_1 = require("./mutex");
const RedisMutexClient_1 = require("./RedisMutexClient");
let RMutexService = class RMutexService {
    constructor(redis, logger, ttl) {
        this.redis = redis;
        this.logger = logger;
        this.ttl = ttl || 60000;
        this.client = new RedisMutexClient_1.RedisMutexClient(this.redis, this.logger);
    }
    get(key, ttl) {
        ttl = ttl !== undefined ? ttl : this.ttl;
        return new mutex_1.RMutexImpl(this.client, key, ttl);
    }
};
exports.RMutexService = RMutexService;
exports.RMutexService = RMutexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __param(1, (0, nestjs_pino_1.InjectPinoLogger)('RMutexService')),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [ioredis_1.default, Object, Number])
], RMutexService);
//# sourceMappingURL=rmutex.service.js.map