import { NestMiddleware } from '@nestjs/common';
import { IApiKeyAuth } from './auth';
export declare class AuthMiddleware implements NestMiddleware {
    private auth;
    constructor(auth: IApiKeyAuth);
    use(req: any, res: any, next: () => void): void;
}
