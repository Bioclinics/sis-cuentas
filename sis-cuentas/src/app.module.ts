import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CuentasModule } from './modules/cuentas/cuentas.module';

@Module({
  imports: [
    MyConfigModule,
    DatabaseModule,
    CuentasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
