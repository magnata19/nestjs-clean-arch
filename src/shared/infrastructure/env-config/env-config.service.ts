import { Injectable } from '@nestjs/common';
import { EnvConfigInterface } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfigInterface {

  constructor(private configService: ConfigService) { }

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  };
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') ?? '';
  };
}
