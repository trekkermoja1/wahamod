import { ChatWootAppConfig } from '@waha/apps/chatwoot/dto/config.dto';
import { CallsAppConfig } from '@waha/apps/calls/dto/config.dto';
import { AppName } from '@waha/apps/app_sdk/apps/name';
export type AllowedAppConfig = ChatWootAppConfig | CallsAppConfig;
export declare class App<T extends AllowedAppConfig = any> {
    id: string;
    session: string;
    app: AppName;
    enabled?: boolean;
    config: T;
}
export declare class ChatWootAppDto extends App<ChatWootAppConfig> {
    config: ChatWootAppConfig;
}
export declare class CallsAppDto extends App<CallsAppConfig> {
    config: CallsAppConfig;
}
export type AppDto = ChatWootAppDto | CallsAppDto;
