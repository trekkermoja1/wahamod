import { LogLevel } from '@nestjs/common';
import { ChildLoggerOptions, Level, LevelWithSilent, Logger } from 'pino';
export interface LoggerBuilder {
    child(bindings: Record<string, any>, options?: ChildLoggerOptions): Logger;
}
declare function getNestJSLogLevels(): LogLevel[];
export declare function getPinoLogLevel(debug?: boolean): Level;
export declare function isDebugEnabled(): boolean;
export declare function getPinoHttpUseLevel(): LevelWithSilent;
export declare function getDefaultPinoLogLevel(): Level;
export declare function getPinoTransport(): {
    target: string;
    options: {
        singleLine: boolean;
        colorize: boolean;
        messageFormat: string;
    };
};
export { getNestJSLogLevels };
