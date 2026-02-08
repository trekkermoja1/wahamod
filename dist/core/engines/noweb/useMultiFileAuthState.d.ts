import type { AuthenticationState } from '@adiwajshing/baileys';
export declare const useMultiFileAuthState: (folder: string) => Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
    close: () => Promise<void>;
}>;
