import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { parseBool } from '../../helpers';
import { Auth } from '@waha/core/auth/config';

@Injectable()
export class DashboardConfigServiceCore {
  public dashboardUri = '/dashboard';

  constructor(
    protected configService: ConfigService,
    @InjectPinoLogger('DashboardConfigService')
    protected logger: PinoLogger,
  ) {}

  get enabled(): boolean {
    return true;
  }

  get credentials(): [string, string] | null {
    return null;
  }
}
