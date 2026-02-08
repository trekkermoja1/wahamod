"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProxyConfig = getProxyConfig;
exports.createAgentProxy = createAgentProxy;
const https_proxy_agent_1 = require("https-proxy-agent");
const url_1 = require("url");
const undici_1 = require("undici");
function getProxyConfig(config, sessions, sessionName) {
    if (typeof config.proxyServer === 'string') {
        return {
            server: config.proxyServer,
            username: config.proxyServerUsername,
            password: config.proxyServerPassword,
        };
    }
    if (Array.isArray(config.proxyServer)) {
        const prefix = config.proxyServerIndexPrefix;
        let indexToUse = undefined;
        if (prefix && sessionName.includes(prefix)) {
            const matches = sessionName.match(/\d+$/);
            indexToUse = matches ? parseInt(matches[0], 10) : undefined;
        }
        let idx = 0;
        idx = Object.keys(sessions).length % config.proxyServer.length;
        const index = indexToUse ? indexToUse % config.proxyServer.length : idx;
        return {
            server: config.proxyServer[index],
            username: config.proxyServerUsername,
            password: config.proxyServerPassword,
        };
    }
    return undefined;
}
function getAuthenticatedUrl(url, username, password) {
    const hasSchema = url.startsWith('http://') || url.startsWith('https://');
    if (!hasSchema) {
        url = `http://${url}`;
    }
    const parsedUrl = new url_1.URL(url);
    parsedUrl.protocol = parsedUrl.protocol || 'http';
    parsedUrl.username = username;
    parsedUrl.password = password;
    return parsedUrl.toString();
}
function createAgentProxy(proxyConfig) {
    const url = getAuthenticatedUrl(proxyConfig.server, proxyConfig.username || '', proxyConfig.password || '');
    const socketAgent = new https_proxy_agent_1.HttpsProxyAgent(url);
    const fetchAgent = new undici_1.ProxyAgent({ uri: url });
    return { socket: socketAgent, fetch: fetchAgent };
}
//# sourceMappingURL=helpers.proxy.js.map