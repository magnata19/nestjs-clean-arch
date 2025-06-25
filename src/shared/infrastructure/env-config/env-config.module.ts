import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [

    ]
  })],
  providers: [EnvConfigService],
  exports: [EnvConfigService]
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(): Promise<DynamicModule> {
    return super.forRoot({
      envFilePath: [
        join(__dirname, `../../../../.env.${process.env.NODE_ENV}`)
      ]
    })
  }
}
