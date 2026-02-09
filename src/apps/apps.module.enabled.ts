import { BullModule } from '@nestjs/bullmq';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RMutexModule } from '@waha/modules/rmutex';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAuthMiddleware } from '@waha/apps/app_sdk/auth';
import { ChatWootExports } from '@waha/apps/chatwoot/chatwoot.module';
import { AppsController } from '@waha/apps/app_sdk/api/apps.controller';
import { CallsAppExports } from '@waha/apps/calls/calls.module';
import { AppsService } from '@waha/apps/app_sdk/services/IAppsService';
import { AppsEnabledService } from '@waha/apps/app_sdk/services/AppsEnabledService';
import { Auth } from '@waha/core/auth/config';
import { AppRuntimeConfig } from '@waha/apps/app_sdk/apps/AppRuntime';
import { AppName } from '@waha/apps/app_sdk/apps/name';

const QUEUES_IMPORTS_REQUIRED = [];
const QUEUES_IMPORTS = [];

function getAppModule(name: AppName) {
  if (!AppRuntimeConfig.HasApp(name)) {
    return {
      imports: [],
      controllers: [],
      providers: [],
    };
  }
  switch (name) {
    case AppName.calls:
      return {
        imports: [],
        controllers: [],
        providers: [],
      };
    case AppName.chatwoot:
      return {
        imports: [],
        controllers: [],
        providers: [],
      };
    default:
      throw Error(`App module not found for ${name}`);
  }
}

export const AppsEnabled = {
  imports: [
    ...QUEUES_IMPORTS,
  ],
  controllers: [
    AppsController,
  ],
  providers: [
    {
      provide: AppsService,
      useClass: AppsEnabledService,
    },
  ],
};

function checkApiKey() {
  const key = Auth.key.value;
  if (!key) {
    return;
  }
  const plain = Auth.keyplain.value;
  if (!plain) {
    throw Error(
      'WAHA_API_KEY set, please provide WAHA_API_KEY_PLAIN when WAHA_APPS_ENABLED',
    );
  }
}

if (AppRuntimeConfig.HasAppsRequiringPlainKey()) {
  checkApiKey();
}
