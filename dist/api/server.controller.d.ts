import { WhatsappConfigService } from '@waha/config.service';
import { WAHAEnvironment } from '@waha/structures/environment.dto';
import { EnvironmentQuery, ServerStatusResponse, StopRequest, StopResponse } from '@waha/structures/server.dto';
export declare class ServerController {
    private config;
    private logger;
    constructor(config: WhatsappConfigService);
    get(): WAHAEnvironment;
    environment(query: EnvironmentQuery): object;
    status(): Promise<ServerStatusResponse>;
    stop(request: StopRequest): Promise<StopResponse>;
}
