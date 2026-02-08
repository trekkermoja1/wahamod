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
exports.BufferResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let BufferResponseInterceptor = class BufferResponseInterceptor {
    constructor(mimetype, filename = null) {
        this.mimetype = mimetype;
        this.filename = filename;
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        return next
            .handle()
            .pipe((0, operators_1.map)((buffer) => this.processBuffer(buffer, request, response)));
    }
    processBuffer(buffer, request, response) {
        if (!Buffer.isBuffer(buffer)) {
            return buffer;
        }
        const accept = request.headers['accept'];
        if (accept == 'application/json') {
            return {
                mimetype: this.mimetype,
                data: buffer.toString('base64'),
            };
        }
        const file = new common_1.StreamableFile(buffer);
        response.set({
            'Content-Type': this.mimetype,
            'Content-Length': buffer.length,
        });
        if (this.filename) {
            response.set({
                'Content-Disposition': `attachment; filename="${this.filename}"`,
            });
        }
        return file;
    }
};
exports.BufferResponseInterceptor = BufferResponseInterceptor;
exports.BufferResponseInterceptor = BufferResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, String])
], BufferResponseInterceptor);
//# sourceMappingURL=BufferResponseInterceptor.js.map