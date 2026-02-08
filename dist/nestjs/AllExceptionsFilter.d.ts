import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare function serializeError(err: unknown): any;
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any | Error, host: ArgumentsHost): void;
}
