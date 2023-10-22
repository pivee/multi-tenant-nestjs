import { RequestLoggerMiddleware } from '@/middlewares/request-logger/request-logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantSourceMiddleware } from './middlewares/request-logger/tenant-datasource.middleware';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // Setup middleware functions here
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    consumer.apply(TenantSourceMiddleware).forRoutes('*');
  }
}
