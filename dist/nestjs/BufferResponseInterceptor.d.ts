import { CallHandler, ExecutionContext, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { Base64File } from '../structures/files.dto';
export declare class BufferResponseInterceptor<T> implements NestInterceptor<Buffer, Base64File | StreamableFile> {
    private mimetype;
    private filename;
    constructor(mimetype: string, filename?: string);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Base64File | StreamableFile>;
    processBuffer(buffer: Buffer, request: Request, response: Response): StreamableFile | {
        mimetype: string;
        data: string;
    };
}
