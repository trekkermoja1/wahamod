import { CommandContext } from '@waha/apps/chatwoot/cli/types';
import { MessagesPullOptions } from '@waha/apps/chatwoot/consumers/task/messages.pull';
import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { JobDataTimeout } from '@waha/apps/app_sdk/AppConsumer';
import { JobsOptions, Queue } from 'bullmq';
export declare function MessagesPullStart(ctx: CommandContext, options: MessagesPullOptions, jobOptions: JobsOptions & JobDataTimeout): Promise<void>;
export declare function MessagesPullStatus(ctx: CommandContext): Promise<void>;
export declare function MessagesPullRemove(queue: Queue, app: string, logger: ILogger): Promise<boolean>;
