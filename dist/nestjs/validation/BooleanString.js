"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanString = BooleanString;
function BooleanString({ value }) {
    switch (value) {
        case 'true':
            return true;
        case 'True':
            return true;
        case '1':
            return true;
        case 'false':
            return false;
        case 'False':
            return false;
        case '0':
            return false;
        default:
            return value;
    }
}
//# sourceMappingURL=BooleanString.js.map