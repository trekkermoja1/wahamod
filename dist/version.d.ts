import { getEngineName } from '@waha/config';
import { WAHAEnvironment } from './structures/environment.dto';
export declare enum WAHAVersion {
    PLUS = "PLUS",
    CORE = "CORE"
}
export declare function getWAHAVersion(): WAHAVersion;
export declare const VERSION: WAHAEnvironment;
export declare const IsChrome: boolean;
export { getEngineName };
