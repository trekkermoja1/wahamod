import Knex from 'knex';
import { LocalStore } from './LocalStore';
export declare class LocalStoreCore extends LocalStore {
    protected readonly baseDirectory: string;
    private readonly engine;
    private knex;
    constructor(engine: string);
    init(sessionName?: string): Promise<void>;
    getBaseDirectory(): string;
    getEngineDirectory(): string;
    getSessionDirectory(name: string): string;
    getFilePath(session: string, file: string): string;
    protected getDirectoryPath(name: string): string;
    getWAHADatabase(): Knex.Knex;
    buildKnex(): Knex.Knex;
    close(): Promise<void>;
}
