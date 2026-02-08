import { Response } from 'express';
import { SessionManager } from '../core/abc/manager.abc';
import { SessionQuery } from '../structures/base.dto';
export declare class ScreenshotController {
    private manager;
    constructor(manager: SessionManager);
    screenshot(res: Response, sessionQuery: SessionQuery): Promise<Buffer<ArrayBufferLike>>;
}
