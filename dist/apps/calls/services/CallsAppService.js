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
exports.CallsAppService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const CallsListener_1 = require("./CallsListener");
let CallsAppService = class CallsAppService {
    constructor(logger) {
        this.logger = logger;
    }
    validate(app) {
        void app;
        return;
    }
    async beforeCreated(app) {
        void app;
        return;
    }
    async beforeEnabled(savedApp, newApp) {
        void savedApp;
        void newApp;
        return;
    }
    async beforeDisabled(savedApp, newApp) {
        void newApp;
        void savedApp;
    }
    async beforeUpdated(savedApp, newApp) {
        void savedApp;
        void newApp;
    }
    async beforeDeleted(app) {
        void app;
    }
    beforeSessionStart(app, session) {
        const listener = new CallsListener_1.CallsListener(app, session, this.logger);
        listener.attach();
    }
    afterSessionStart(app, session) {
        void app;
        void session;
        return;
    }
};
exports.CallsAppService = CallsAppService;
exports.CallsAppService = CallsAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_pino_1.InjectPinoLogger)('CallsAppService')),
    __metadata("design:paramtypes", [nestjs_pino_1.PinoLogger])
], CallsAppService);
//# sourceMappingURL=CallsAppService.js.map