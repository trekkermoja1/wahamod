"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosLogging = void 0;
class AxiosLogging {
    constructor(logger) {
        this.logger = logger;
    }
    applyTo(instance) {
        instance.interceptors.request.use(this.onRequest.bind(this));
        instance.interceptors.response.use(this.onResponse.bind(this), this.onError.bind(this));
    }
    onRequest(config) {
        var _a, _b, _c;
        const method = (_b = (_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : 'GET';
        const url = (_c = config.url) !== null && _c !== void 0 ? _c : '';
        const query = config.params
            ? `?${new URLSearchParams(config.params).toString()}`
            : '';
        const body = config.data ? JSON.stringify(config.data) : '';
        this.logger.debug(`${method} ${url}${query} ${body}`);
        return config;
    }
    onResponse(response) {
        var _a;
        const { method, url } = response.config;
        const status = response.status;
        const methodStr = (_a = method === null || method === void 0 ? void 0 : method.toUpperCase()) !== null && _a !== void 0 ? _a : 'GET';
        const type = response.headers['content-type'];
        if (status < 200 || status >= 400) {
            const data = JSON.stringify(response.data);
            this.logger.warn(`${methodStr} ${status} ${url} ${data}`);
            return response;
        }
        this.logger.debug(`${methodStr} ${status}:OK ${url}`);
        if (type.startsWith('application/json')) {
            const data = JSON.stringify(response.data);
            this.logger.trace(`${methodStr} ${status}:OK ${url} ${data}`);
        }
        else {
            this.logger.trace(`${methodStr} ${status}:OK ${url} [${type}]`);
        }
        return response;
    }
    onError(error) {
        var _a;
        if (error.response) {
            const { method, url } = error.config;
            const status = error.response.status;
            const message = `${(_a = method === null || method === void 0 ? void 0 : method.toUpperCase()) !== null && _a !== void 0 ? _a : 'GET'} ${status} ${url} ${JSON.stringify(error.response.data)}`;
            this.logger.error(message);
        }
        else {
            this.logger.error(`Axios error: ${error.message}`);
        }
        return Promise.reject(error);
    }
}
exports.AxiosLogging = AxiosLogging;
//# sourceMappingURL=AxiosLogging.js.map