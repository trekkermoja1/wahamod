import { OutputConfiguration } from 'commander';
export declare class BufferedOutput implements OutputConfiguration {
    private outBuffer;
    private errBuffer;
    writeOut: (str: string) => void;
    writeErr: (str: string) => void;
    outputError: (str: string, write: (s: string) => void) => void;
    get out(): string;
    get err(): string;
}
