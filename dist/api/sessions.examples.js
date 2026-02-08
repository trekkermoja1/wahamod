"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExamples = void 0;
const name_1 = require("../apps/app_sdk/apps/name");
exports.SessionExamples = {
    basic: {
        summary: 'Basic Session',
        value: {
            name: 'default',
        },
    },
    withWebhooks: {
        summary: 'Session Webhooks',
        value: {
            name: 'default',
            config: {
                webhooks: [
                    {
                        url: 'https://example.com/webhooks/waha',
                        events: ['message', 'session.status'],
                        hmac: {
                            key: 'super-secret',
                        },
                        retries: {
                            delaySeconds: 2,
                            attempts: 5,
                            policy: 'linear',
                        },
                        customHeaders: [
                            {
                                name: 'X-Request-ID',
                                value: '123',
                            },
                        ],
                    },
                ],
            },
        },
    },
    withApps: {
        summary: 'Session Apps',
        value: {
            name: 'default',
            apps: [
                {
                    app: name_1.AppName.calls,
                    id: 'app_unique_id',
                    session: '',
                    config: {
                        dm: {
                            reject: true,
                            message: "📞❌ We don't take calls right now.\n🎤 Please send a voice message or 📝 text — we'll reply ASAP!",
                        },
                        group: {
                            reject: true,
                            message: "📞❌ We don't take calls right now.\n🎤 Please send a voice message or 📝 text — we'll reply ASAP!",
                        },
                    },
                },
            ],
            start: true,
        },
    },
    full: {
        summary: 'Full Session Example',
        value: {
            name: 'default',
            start: true,
            config: {
                metadata: {
                    'user.id': '123',
                },
                debug: true,
                webhooks: [
                    {
                        url: 'https://example.com/webhooks/waha',
                        events: ['message', 'session.status'],
                        hmac: {
                            key: 'super-secret',
                        },
                    },
                ],
            },
            apps: [
                {
                    app: name_1.AppName.calls,
                    enabled: true,
                    config: {
                        dm: {
                            reject: true,
                            message: "📞❌ We don't take calls right now.\n🎤 Please send a voice message or 📝 text — we'll reply ASAP!",
                        },
                        group: {
                            reject: true,
                        },
                    },
                },
            ],
        },
    },
};
//# sourceMappingURL=sessions.examples.js.map