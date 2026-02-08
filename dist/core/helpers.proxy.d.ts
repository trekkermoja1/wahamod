import { WhatsappConfigService } from '../config.service';
import { ProxyConfig } from '../structures/sessions.dto';
import { WhatsappSession } from './abc/session.abc';
import { Agents } from '@waha/core/engines/noweb/types';
export declare function getProxyConfig(config: WhatsappConfigService, sessions: Record<string, WhatsappSession>, sessionName: string): ProxyConfig | undefined;
export declare function createAgentProxy(proxyConfig: ProxyConfig): Agents | undefined;
