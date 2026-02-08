import { WAHAHealthCheckService } from '../core/abc/WAHAHealthCheckService';
export declare class HealthController {
    private wahaHealth;
    constructor(wahaHealth: WAHAHealthCheckService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
