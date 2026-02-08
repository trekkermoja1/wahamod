"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFileType = IsFileType;
const class_validator_1 = require("class-validator");
function IsFileType(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isFileType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, _args) {
                    return (value &&
                        typeof value === 'object' &&
                        (typeof value.data === 'string' || typeof value.url === 'string'));
                },
                defaultMessage() {
                    return 'must contain either "data" or "url".';
                },
            },
        });
    };
}
//# sourceMappingURL=IsFileType.js.map