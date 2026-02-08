"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsDisabledService = void 0;
const common_1 = require("@nestjs/common");
class AppsIsDisabledError extends common_1.UnprocessableEntityException {
    constructor() {
        super("Apps are disabled. Enable it by setting 'WAHA_APPS_ENABLED=True' environment variable.");
    }
}
let AppsDisabledService = class AppsDisabledService {
    async list(manager, session) {
        throw new AppsIsDisabledError();
    }
    async get(manager, appId) {
        throw new AppsIsDisabledError();
    }
    async create(manager, app) {
        throw new AppsIsDisabledError();
    }
    async upsert(manager, app) {
        throw new AppsIsDisabledError();
    }
    async update(manager, app) {
        throw new AppsIsDisabledError();
    }
    async delete(manager, appId) {
        throw new AppsIsDisabledError();
    }
    async removeBySession(manager, session) {
        return;
    }
    migrate(knex) {
        return;
    }
    async beforeSessionStart(session, store) {
        return;
    }
    async afterSessionStart(session, store) {
        return;
    }
    async syncSessionApps(manager, sessionName, apps) {
        throw new AppsIsDisabledError();
    }
};
exports.AppsDisabledService = AppsDisabledService;
exports.AppsDisabledService = AppsDisabledService = __decorate([
    (0, common_1.Injectable)()
], AppsDisabledService);
//# sourceMappingURL=AppsDisabledService.js.map