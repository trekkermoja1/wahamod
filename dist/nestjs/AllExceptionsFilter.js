"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
exports.serializeError = serializeError;
const common_1 = require("@nestjs/common");
const version_1 = require("../version");
function serializeError(err) {
    const properties = Object.getOwnPropertyNames(err);
    properties.push('name');
    const result = JSON.parse(JSON.stringify(err, properties));
    const stack = result.stack;
    delete result.stack;
    result.stack = stack;
    return result;
}
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (exception.code === 'ENOENT') {
            response.status(common_1.HttpStatus.NOT_FOUND).json({
                error: {
                    code: 404,
                    key: 'FILE_NOT_FOUND',
                    message: 'File not found',
                    details: 'File not found or no longer available',
                },
            });
            response.send();
            return;
        }
        if (exception instanceof common_1.HttpException) {
            response.status(exception.getStatus()).json(exception.getResponse());
            return;
        }
        const httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(httpStatus).json({
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            exception: serializeError(exception),
            request: {
                path: request.url,
                method: request.method,
                body: request.body,
                query: request.query,
            },
            version: version_1.VERSION,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=AllExceptionsFilter.js.map