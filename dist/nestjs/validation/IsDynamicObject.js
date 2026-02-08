"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDynamicObject = IsDynamicObject;
const class_validator_1 = require("class-validator");
function IsDynamicObject(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsDynamicObject',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (!value || typeof value !== 'object') {
                        return false;
                    }
                    for (const key in value) {
                        if (typeof key !== 'string' || typeof value[key] !== 'string') {
                            return false;
                        }
                    }
                    return true;
                },
                defaultMessage(validationArguments) {
                    return `${validationArguments.property} accepts string key-value pairs only`;
                },
            },
        });
    };
}
//# sourceMappingURL=IsDynamicObject.js.map