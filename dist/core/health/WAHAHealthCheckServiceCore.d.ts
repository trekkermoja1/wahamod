import { HealthCheckResult } from '@nestjs/terminus';
import { WAHAHealthCheckService } from '../abc/WAHAHealthCheckService';
export declare class WAHAHealthCheckServiceCore extends WAHAHealthCheckService {
    check(): Promise<HealthCheckResult>;
}
