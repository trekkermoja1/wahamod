import { LoggerService } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import type { HealthCheckResult } from '@nestjs/terminus/dist/health-check/health-check-result.interface';
import { WhatsappConfigService } from '../../config.service';
import { SessionManager } from './manager.abc';
export declare abstract class WAHAHealthCheckService {
    protected sessionManager: SessionManager;
    protected health: HealthCheckService;
    protected config: WhatsappConfigService;
    protected logger: LoggerService;
    constructor(sessionManager: SessionManager, health: HealthCheckService, config: WhatsappConfigService);
    abstract check(): Promise<HealthCheckResult>;
}
