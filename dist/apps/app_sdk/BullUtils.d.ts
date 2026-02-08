import { RegisterQueueOptions } from '@nestjs/bullmq/dist/interfaces/register-queue-options.interface';
import { DynamicModule } from '@nestjs/common';
export declare function RegisterAppQueue(options: RegisterQueueOptions): DynamicModule[];
