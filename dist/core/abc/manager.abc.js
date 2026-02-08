"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
exports.populateSessionInfo = populateSessionInfo;
const common_1 = require("@nestjs/common");
const EngineBootstrap_1 = require("./EngineBootstrap");
const GowsBootstrap_1 = require("../engines/gows/GowsBootstrap");
const promiseTimeout_1 = require("../../utils/promiseTimeout");
const version_1 = require("../../version");
const lodash = require("lodash");
const rxjs_1 = require("rxjs");
const enums_dto_1 = require("../../structures/enums.dto");
const AsyncLock = require('async-lock');
class SessionManager {
    constructor(log, config, gowsConfigService, appsService) {
        this.log = log;
        this.config = config;
        this.gowsConfigService = gowsConfigService;
        this.appsService = appsService;
        this.WAIT_SESSION_RUNNING_INTERVAL = 500;
        this.WAIT_SESSION_RUNNING_TIMEOUT = 5000;
        this.WAIT_STATUS_INTERVAL = 500;
        this.WAIT_STATUS_TIMEOUT = 10000;
        this.lock = new AsyncLock({
            timeout: 5000,
            maxPending: Infinity,
            maxExecutionTime: 30000,
        });
        this.log.setContext(SessionManager.name);
    }
    startPredefinedSessions() {
        const startSessions = this.config.startSessions;
        startSessions.forEach((sessionName) => {
            this.withLock(sessionName, async () => {
                const log = this.log.logger.child({ session: sessionName });
                log.info(`Restarting PREDEFINED session...`);
                await this.start(sessionName).catch((error) => {
                    log.error(`Failed to start PREDEFINED session: ${error}`);
                    log.error(error.stack);
                });
            });
        });
    }
    withLock(name, fn) {
        return this.lock.acquire(name, fn);
    }
    getSessionEvent(session, event) {
        return (0, rxjs_1.of)();
    }
    getSessionEvents(session, events) {
        return (0, rxjs_1.merge)(...events.map((event) => this.getSessionEvent(session, event)));
    }
    restart(name) {
        return this.withLock(name, async () => {
            const exists = await this.exists(name);
            if (!exists) {
                throw new common_1.NotFoundException('Session not found');
            }
            await this.assign(name);
            await this.stop(name, true);
            await this.start(name);
        });
    }
    get workerId() {
        return this.config.workerId;
    }
    async assign(name) {
        var _a;
        await ((_a = this.sessionWorkerRepository) === null || _a === void 0 ? void 0 : _a.assign(name, this.workerId));
    }
    async unassign(name) {
        var _a;
        await ((_a = this.sessionWorkerRepository) === null || _a === void 0 ? void 0 : _a.unassign(name, this.workerId));
    }
    async getWorkingSession(sessionName) {
        return this.waitUntilStatus(sessionName, [enums_dto_1.WAHASessionStatus.WORKING]);
    }
    async waitUntilStatus(sessionName, expected) {
        if (!sessionName) {
            throw new common_1.UnprocessableEntityException({
                error: `Session name is required`,
                session: sessionName,
            });
        }
        const running = await (0, promiseTimeout_1.waitUntil)(async () => this.isRunning(sessionName), this.WAIT_SESSION_RUNNING_INTERVAL, this.WAIT_SESSION_RUNNING_TIMEOUT);
        if (!running) {
            const exists = await this.exists(sessionName);
            if (!exists) {
                throw new common_1.UnprocessableEntityException({
                    error: `Session "${sessionName}" does not exist`,
                    session: sessionName,
                });
            }
            const msg = {
                error: 'Session status is not as expected. Try again later or restart the session',
                session: sessionName,
                status: 'STOPPED',
                expected: expected,
            };
            throw new common_1.UnprocessableEntityException(msg);
        }
        const session = this.getSession(sessionName);
        const valid = await (0, promiseTimeout_1.waitUntil)(async () => expected.includes(session.status), this.WAIT_STATUS_INTERVAL, this.WAIT_STATUS_TIMEOUT);
        if (!valid) {
            const msg = {
                error: 'Session status is not as expected. Try again later or restart the session',
                session: sessionName,
                status: session.status,
                expected: expected,
            };
            throw new common_1.UnprocessableEntityException(msg);
        }
        return session;
    }
    beforeApplicationShutdown(signal) {
        return;
    }
    onApplicationBootstrap() {
        return;
    }
    getEngineBootstrap(engine) {
        const logger = this.log.logger.child({ engine: engine.toLowerCase() });
        if (engine === enums_dto_1.WAHAEngine.GOWS) {
            const config = this.gowsConfigService.getBootstrapConfig();
            return new GowsBootstrap_1.GowsBootstrap(logger, config);
        }
        return new EngineBootstrap_1.NoopEngineBootstrap();
    }
    ignoreChatsConfig(config) {
        const ignore = this.config.getIgnoreChatsConfig();
        return lodash.defaults({}, config === null || config === void 0 ? void 0 : config.ignore, ignore);
    }
}
exports.SessionManager = SessionManager;
function populateSessionInfo(event, session) {
    return (payload) => {
        var _a;
        const id = payload._eventId;
        const timestampMs = payload._timestampMs;
        const data = Object.assign({}, payload);
        delete data._eventId;
        delete data._timestampMs;
        const me = session.getSessionMeInfo();
        return {
            id: id,
            timestamp: timestampMs,
            event: event,
            session: session.name,
            metadata: (_a = session.sessionConfig) === null || _a === void 0 ? void 0 : _a.metadata,
            me: me,
            payload: data,
            engine: session.engine,
            environment: version_1.VERSION,
        };
    };
}
//# sourceMappingURL=manager.abc.js.map