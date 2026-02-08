import { StreamableFile } from '@nestjs/common';
import { WhatsappConfigService } from '@waha/config.service';
import { SessionManager } from '@waha/core/abc/manager.abc';
import { WhatsappSession } from '@waha/core/abc/session.abc';
import { BrowserTraceQuery, CpuProfileQuery } from '@waha/structures/server.debug.dto';
export declare class ServerDebugController {
    private config;
    private manager;
    private logger;
    private readonly enabled;
    constructor(config: WhatsappConfigService, manager: SessionManager);
    cpuProfile(query: CpuProfileQuery): Promise<StreamableFile>;
    heapsnapshot(): Promise<StreamableFile>;
    browserTrace(session: WhatsappSession, query: BrowserTraceQuery): Promise<StreamableFile>;
}
