import { DataStore } from '../../abc/DataStore';
import { LocalStore } from '../../storage/LocalStore';
export declare class NowebAuthFactoryCore {
    buildAuth(store: DataStore, name: string): Promise<{
        state: import("@adiwajshing/baileys").AuthenticationState;
        saveCreds: () => Promise<void>;
        close: () => Promise<void>;
    }>;
    protected buildLocalAuth(store: LocalStore, name: string): Promise<{
        state: import("@adiwajshing/baileys").AuthenticationState;
        saveCreds: () => Promise<void>;
        close: () => Promise<void>;
    }>;
}
