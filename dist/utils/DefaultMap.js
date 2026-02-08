"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMap = void 0;
class DefaultMap extends Map {
    constructor(factory) {
        super();
        this.factory = factory;
    }
    get(key) {
        if (!this.has(key)) {
            this.set(key, this.factory(key));
        }
        return super.get(key);
    }
}
exports.DefaultMap = DefaultMap;
//# sourceMappingURL=DefaultMap.js.map