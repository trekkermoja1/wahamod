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

const QUEUES_IMPORTS_REQUIRED = [
  BullModule.forRoot({
    connection: {
      url: process.env.REDIS_URL || 'redis://:redis@localhost:6379',
      maxRetriesPerRequest: null,
    },
    prefix: `waha-${process.env.WAHA_WORKER_ID}`,
  }),
  RedisModule.forRoot({
    closeClient: true,
    config: {
      url: process.env.REDIS_URL || 'redis://:redis@localhost:6379',
      onClientCreated: async (client) => {
        try {
          await client.ping();
        } catch (err) {
          console.error('[Redis] Connection failed:', err);
          // Don't exit process in Replit if Redis fails, just log and continue without queues
        }
      },
    },
  }),
  RMutexModule,
  BullBoardModule.forRoot({
    route: '/jobs',
    adapter: ExpressAdapter,
    middleware: BullAuthMiddleware(),
    boardOptions: {
      uiConfig: {
        boardTitle: 'Jobs | WAHA',
        boardLogo: {
          path: '/dashboard/layout/images/logo-white.svg',
          width: 35,
          height: 35,
        },
        favIcon: {
          default: '/dashboard/favicon.ico',
          alternative: '/dashboard/favicon.ico',
        },
        miscLinks: [
          {
            text: '📊 Dashboard',
            url: '/dashboard',
          },
          {
            text: '📚 Swagger (OpenAPI)',
            url: '/',
          },
        ],
      },
    },
  }),
];
const QUEUES_IMPORTS = process.env.REDIS_URL ? QUEUES_IMPORTS_REQUIRED : [];

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
