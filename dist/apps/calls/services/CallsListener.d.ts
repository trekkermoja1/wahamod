import { CallsAppConfig } from '@waha/apps/calls/dto/config.dto';
import { App } from '@waha/apps/app_sdk/dto/app.dto';
import { PinoLogger } from 'nestjs-pino';
import { WhatsappSession } from '@waha/core/abc/session.abc';
export declare class CallsListener {
    private subscription?;
    private config;
    private readonly log;
    private readonly session;
    constructor(app: App<CallsAppConfig>, session: WhatsappSession, logger: PinoLogger);
    attach(): void;
    detach(): void;
    private configFor;
    private handleCall;
    private rejectCall;
    private replyWithTyping;
    private setTyping;
    private setPaused;
}
