"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAHAHealthCheckServiceCore = void 0;
const common_1 = require("@nestjs/common");
const WAHAHealthCheckService_1 = require("../abc/WAHAHealthCheckService");
const exceptions_1 = require("../exceptions");
let WAHAHealthCheckServiceCore = class WAHAHealthCheckServiceCore extends WAHAHealthCheckService_1.WAHAHealthCheckService {
    check() {
        throw new exceptions_1.AvailableInPlusVersion();
    }
};
exports.WAHAHealthCheckServiceCore = WAHAHealthCheckServiceCore;
exports.WAHAHealthCheckServiceCore = WAHAHealthCheckServiceCore = __decorate([
    (0, common_1.Injectable)()
], WAHAHealthCheckServiceCore);
//# sourceMappingURL=WAHAHealthCheckServiceCore.js.map