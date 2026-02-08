import { NotImplementedException, UnprocessableEntityException } from '@nestjs/common';
export declare const DOCS_URL = "https://waha.devlike.pro/";
export declare class NotImplementedByEngineError extends NotImplementedException {
    constructor(msg?: string);
}
export declare class AvailableInPlusVersion extends UnprocessableEntityException {
    constructor(feature?: string);
}
