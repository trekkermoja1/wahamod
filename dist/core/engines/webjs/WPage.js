"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WPage = exports.PAGE_CALL_ERROR_EVENT = void 0;
const events_1 = require("events");
exports.PAGE_CALL_ERROR_EVENT = 'page.call.error';
class WPage extends events_1.EventEmitter {
    constructor(page) {
        super();
        this.page = page;
    }
    async evaluate(fn, ...args) {
        try {
            return await this.page.evaluate(fn, ...args);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, { method: 'evaluate', error: err });
            throw err;
        }
    }
    async screenshot(options) {
        try {
            return await this.page.screenshot(options);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, { method: 'screenshot', error: err });
            throw err;
        }
    }
    async waitForNavigation(options) {
        try {
            return await this.page.waitForNavigation(options);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, {
                method: 'waitForNavigation',
                error: err,
            });
            throw err;
        }
    }
    async waitForFunction(fn, options, ...args) {
        try {
            return await this.page.waitForFunction(fn, options, ...args);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, {
                method: 'waitForFunction',
                error: err,
            });
            throw err;
        }
    }
    async setRequestInterception(value) {
        try {
            return await this.page.setRequestInterception(value);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, {
                method: 'setRequestInterception',
                error: err,
            });
            throw err;
        }
    }
    async exposeFunction(name, fn) {
        try {
            return await this.page.exposeFunction(name, fn);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, {
                method: 'exposeFunction',
                error: err,
            });
            throw err;
        }
    }
    async reload(options) {
        try {
            return await this.page.reload(options);
        }
        catch (err) {
            this.emit(exports.PAGE_CALL_ERROR_EVENT, {
                method: 'reload',
                error: err,
            });
            throw err;
        }
    }
    on(event, listener) {
        if (event === exports.PAGE_CALL_ERROR_EVENT) {
            super.on(event, listener);
            return this;
        }
        this.page.on(event, listener);
        return this.page;
    }
    get tracing() {
        return this.page.tracing;
    }
}
exports.WPage = WPage;
//# sourceMappingURL=WPage.js.map