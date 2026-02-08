import { SessionConfig } from '../../structures/sessions.dto';
import { ISessionConfigRepository } from './ISessionConfigRepository';
import { LocalStore } from './LocalStore';
export declare class LocalSessionConfigRepository extends ISessionConfigRepository {
    FILENAME: string;
    private store;
    constructor(store: LocalStore);
    exists(sessionName: string): Promise<boolean>;
    getConfig(sessionName: string): Promise<SessionConfig | null>;
    saveConfig(sessionName: string, config: SessionConfig): Promise<void>;
    private getFilePath;
    deleteConfig(sessionName: string): Promise<void>;
    getAllConfigs(): Promise<string[]>;
    init(): Promise<void>;
}
