import { AppName } from '@waha/apps/app_sdk/apps/name';
export declare const SessionExamples: {
    basic: {
        summary: string;
        value: {
            name: string;
        };
    };
    withWebhooks: {
        summary: string;
        value: {
            name: string;
            config: {
                webhooks: {
                    url: string;
                    events: string[];
                    hmac: {
                        key: string;
                    };
                    retries: {
                        delaySeconds: number;
                        attempts: number;
                        policy: string;
                    };
                    customHeaders: {
                        name: string;
                        value: string;
                    }[];
                }[];
            };
        };
    };
    withApps: {
        summary: string;
        value: {
            name: string;
            apps: {
                app: AppName;
                id: string;
                session: string;
                config: {
                    dm: {
                        reject: boolean;
                        message: string;
                    };
                    group: {
                        reject: boolean;
                        message: string;
                    };
                };
            }[];
            start: boolean;
        };
    };
    full: {
        summary: string;
        value: {
            name: string;
            start: boolean;
            config: {
                metadata: {
                    'user.id': string;
                };
                debug: boolean;
                webhooks: {
                    url: string;
                    events: string[];
                    hmac: {
                        key: string;
                    };
                }[];
            };
            apps: {
                app: AppName;
                enabled: boolean;
                config: {
                    dm: {
                        reject: boolean;
                        message: string;
                    };
                    group: {
                        reject: boolean;
                    };
                };
            }[];
        };
    };
};
