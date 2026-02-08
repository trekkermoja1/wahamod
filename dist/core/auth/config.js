"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AuthConfig = void 0;
exports.rand = rand;
exports.ReportGeneratedValue = ReportGeneratedValue;
const helpers_1 = require("../../helpers");
function rand() {
    return crypto.randomUUID().toString().replace(/-/g, '');
}
function FromEnv(param, skip, adefault, search) {
    let value = process.env[param];
    const common = search.includes(value);
    if (common && !skip) {
        return {
            param: param,
            value: adefault,
            generated: true,
        };
    }
    return {
        param: param,
        value: value,
        generated: false,
    };
}
const keys = [
    '',
    null,
    undefined,
    '123',
    '321',
    'waha',
    'admin',
    '00000000000000000000000000000000',
    '11111111111111111111111111111111',
    'sha512:98b6d128682e280b74b324ca82a6bae6e8a3f7174e0605bfd52eb9948fad8984854ec08f7652f32055c4a9f12b69add4850481d9503a7f2225501671d6124648',
];
const nulls = ['', null, undefined];
class AuthConfig {
    constructor() {
        var _a;
        if (process.env.WHATSAPP_API_KEY) {
            process.env.WAHA_API_KEY = process.env.WHATSAPP_API_KEY;
        }
        this.key = FromEnv('WAHA_API_KEY', true, rand(), keys);
        this.keyplain = FromEnv('WAHA_API_KEY_PLAIN', false, ((_a = this.key.value) === null || _a === void 0 ? void 0 : _a.startsWith('sha512:')) ? null : this.key.value, []);
        this.dashboard = this.getDashboard();
        this.swagger = this.getSwagger();
    }
    getDashboard() {
        const password = FromEnv('WAHA_DASHBOARD_PASSWORD', (0, helpers_1.parseBool)(process.env.WAHA_DASHBOARD_NO_PASSWORD), rand(), keys);
        const username = FromEnv('WAHA_DASHBOARD_USERNAME', false, 'admin', password.value ? nulls : []);
        return {
            username: username,
            password: password,
        };
    }
    getSwagger() {
        const password = FromEnv('WHATSAPP_SWAGGER_PASSWORD', (0, helpers_1.parseBool)(process.env.WHATSAPP_SWAGGER_NO_PASSWORD), this.dashboard.password.value, keys);
        const username = FromEnv('WHATSAPP_SWAGGER_USERNAME', false, 'admin', password.value ? nulls : []);
        return {
            username: username,
            password: password,
        };
    }
}
exports.AuthConfig = AuthConfig;
exports.Auth = new AuthConfig();
function ReportGeneratedValue() {
    let values = [
        exports.Auth.key,
        exports.Auth.dashboard.username,
        exports.Auth.dashboard.password,
        exports.Auth.swagger.username,
        exports.Auth.swagger.password,
    ];
    values = values.filter((key) => key.generated);
    if (values.length === 0) {
        return;
    }
    console.warn('');
    console.warn('⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️');
    console.warn('Generated credentials (persist to .env or WAHA_* env vars)');
    console.warn('Save these values to your environment (.env or WAHA_*) to reuse them; new keys are generated on every start otherwise.');
    console.warn('');
    console.warn("cat <<'EOF' > .env");
    console.warn('');
    for (const key of values) {
        console.warn(`${key.param}=${key.value}`);
    }
    console.warn('EOF');
    console.warn('');
    console.warn('Generated credentials ready to copy');
    console.warn('⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️');
}
//# sourceMappingURL=config.js.map