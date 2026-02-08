import { CommandContext } from '@waha/apps/chatwoot/cli/types';
import { ContactsPullOptions } from '@waha/apps/chatwoot/consumers/task/contacts.pull';
import { JobsOptions, Queue } from 'bullmq';
import { ILogger } from '@waha/apps/app_sdk/ILogger';
import { JobDataTimeout } from '@waha/apps/app_sdk/AppConsumer';
export declare function ContactsPullStart(ctx: CommandContext, options: ContactsPullOptions, jobOptions: JobsOptions & JobDataTimeout): Promise<void>;
export declare function ContactsPullStatus(ctx: CommandContext): Promise<void>;
export declare function ContactsPullRemove(queue: Queue, app: string, logger: ILogger): Promise<boolean>;
