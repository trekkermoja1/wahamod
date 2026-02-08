import { ValidationOptions } from 'class-validator';
export declare function IsDynamicObject(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
