"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRenderer = void 0;
const ApiError_1 = require("@figuro/chatwoot-sdk/dist/core/ApiError");
class AxiosErrorRenderer {
    text(error) {
        var _a;
        let errorText = `API Error: ${error.message}`;
        if (!((_a = error.response) === null || _a === void 0 ? void 0 : _a.data)) {
            return errorText;
        }
        try {
            const data = error.response.data;
            let json;
            if (Buffer.isBuffer(data)) {
                json = JSON.parse(data.toString());
            }
            else if (typeof data === 'object') {
                json = data;
            }
            else {
                json = JSON.parse(data);
            }
            errorText += `\nData: ${JSON.stringify(json, null, 2)}`;
        }
        catch (e) {
            errorText += 'Data: <unparsable>';
        }
        return errorText;
    }
    data(error) {
        const { config, response, request } = error;
        return {
            class: 'APIError',
            request: {
                method: (request === null || request === void 0 ? void 0 : request.method) || (config === null || config === void 0 ? void 0 : config.method),
                url: (request === null || request === void 0 ? void 0 : request.path) || (config === null || config === void 0 ? void 0 : config.url),
                params: config === null || config === void 0 ? void 0 : config.params,
                body: (request === null || request === void 0 ? void 0 : request.body) || (config === null || config === void 0 ? void 0 : config.data),
            },
            response: {
                status: response === null || response === void 0 ? void 0 : response.status,
                statusText: response === null || response === void 0 ? void 0 : response.statusText,
                headers: response === null || response === void 0 ? void 0 : response.headers,
                body: response === null || response === void 0 ? void 0 : response.data,
            },
            message: error.message,
            code: error === null || error === void 0 ? void 0 : error.code,
            stack: error.stack,
        };
    }
}
class ChatWootAPIErrorRenderer {
    text(error) {
        let errorText = `ChatWoot API Error: ${error.message}`;
        errorText += `\nStatus: ${error.status}`;
        if (error.body) {
            try {
                const body = typeof error.body === 'object' ? error.body : JSON.parse(error.body);
                errorText += `\nBody: ${JSON.stringify(body, null, 2)}`;
            }
            catch (e) {
                errorText += `\nBody: ${error.body}`;
            }
        }
        return errorText;
    }
    data(error) {
        var _a, _b, _c, _d, _e;
        return {
            class: 'ChatWootAPIError',
            request: {
                method: (_a = error.request) === null || _a === void 0 ? void 0 : _a.method,
                url: (_b = error.request) === null || _b === void 0 ? void 0 : _b.url,
                query: (_c = error.request) === null || _c === void 0 ? void 0 : _c.query,
                path: (_d = error.request) === null || _d === void 0 ? void 0 : _d.path,
                body: (_e = error.request) === null || _e === void 0 ? void 0 : _e.body,
            },
            response: {
                status: error.status,
                statusText: error.statusText,
                body: error.body,
            },
            message: error.message,
            stack: error.stack,
        };
    }
}
class GenericErrorRenderer {
    text(error) {
        var _a, _b;
        return (_b = (_a = error === null || error === void 0 ? void 0 : error.toString) === null || _a === void 0 ? void 0 : _a.call(error)) !== null && _b !== void 0 ? _b : String(error);
    }
    data(error) {
        var _a, _b, _c, _d;
        return {
            class: (_c = (_a = error === null || error === void 0 ? void 0 : error.name) !== null && _a !== void 0 ? _a : (_b = error === null || error === void 0 ? void 0 : error.constructor) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : typeof error,
            message: (_d = error === null || error === void 0 ? void 0 : error.message) !== null && _d !== void 0 ? _d : String(error),
            stack: error.stack,
        };
    }
}
class ErrorRenderer {
    constructor() {
        this.axiosRenderer = new AxiosErrorRenderer();
        this.chatwootRenderer = new ChatWootAPIErrorRenderer();
        this.genericRenderer = new GenericErrorRenderer();
    }
    text(error) {
        if (error === null || error === void 0 ? void 0 : error.isAxiosError) {
            return this.axiosRenderer.text(error);
        }
        if (error instanceof ApiError_1.ApiError) {
            return this.chatwootRenderer.text(error);
        }
        return this.genericRenderer.text(error);
    }
    data(error) {
        if (error === null || error === void 0 ? void 0 : error.isAxiosError) {
            return this.axiosRenderer.data(error);
        }
        if (error instanceof ApiError_1.ApiError) {
            return this.chatwootRenderer.data(error);
        }
        return this.genericRenderer.data(error);
    }
}
exports.ErrorRenderer = ErrorRenderer;
//# sourceMappingURL=ErrorRenderer.js.map