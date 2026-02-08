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
exports.QRCodeSessionPipe = exports.WorkingSessionPipe = exports.SessionPipe = void 0;
const common_1 = require("@nestjs/common");
const manager_abc_1 = require("../../core/abc/manager.abc");
const enums_dto_1 = require("../../structures/enums.dto");
let SessionPipe = class SessionPipe {
    constructor(manager) {
        this.manager = manager;
    }
    async transform(value) {
        return this.manager.getSession(value);
    }
};
exports.SessionPipe = SessionPipe;
exports.SessionPipe = SessionPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], SessionPipe);
let StatusSessionPipe = class StatusSessionPipe {
    constructor(manager) {
        this.manager = manager;
    }
    async transform(value) {
        return this.manager.waitUntilStatus(value, this.STATUSES);
    }
};
StatusSessionPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [manager_abc_1.SessionManager])
], StatusSessionPipe);
let WorkingSessionPipe = class WorkingSessionPipe extends StatusSessionPipe {
    constructor() {
        super(...arguments);
        this.STATUSES = [enums_dto_1.WAHASessionStatus.WORKING];
    }
};
exports.WorkingSessionPipe = WorkingSessionPipe;
exports.WorkingSessionPipe = WorkingSessionPipe = __decorate([
    (0, common_1.Injectable)()
], WorkingSessionPipe);
let QRCodeSessionPipe = class QRCodeSessionPipe extends StatusSessionPipe {
    constructor() {
        super(...arguments);
        this.STATUSES = [enums_dto_1.WAHASessionStatus.SCAN_QR_CODE];
    }
};
exports.QRCodeSessionPipe = QRCodeSessionPipe;
exports.QRCodeSessionPipe = QRCodeSessionPipe = __decorate([
    (0, common_1.Injectable)()
], QRCodeSessionPipe);
//# sourceMappingURL=SessionPipe.js.map