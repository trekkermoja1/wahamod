import { WAHASessionStatus } from '../structures/enums.dto';
export declare class StatusTracker {
    private numberOfStarting;
    track(status: WAHASessionStatus): void;
    isStuckInStarting(): boolean;
}
