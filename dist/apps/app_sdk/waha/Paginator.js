"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayPaginator = void 0;
const lodash = require("lodash");
const DefaultParams = {
    processed: 0,
    max: Infinity,
};
class ArrayPaginator {
    constructor(params = DefaultParams) {
        this.params = lodash.merge({}, DefaultParams, params);
    }
    iterate(call) {
        return __asyncGenerator(this, arguments, function* iterate_1() {
            let processed = this.params.processed;
            let records = [];
            while (true) {
                records = yield __await(call(processed));
                if (records.length === 0) {
                    return yield __await(void 0);
                }
                for (const record of records) {
                    yield yield __await(record);
                    processed += 1;
                    if (processed >= this.params.max) {
                        return yield __await(void 0);
                    }
                }
            }
        });
    }
}
exports.ArrayPaginator = ArrayPaginator;
//# sourceMappingURL=Paginator.js.map