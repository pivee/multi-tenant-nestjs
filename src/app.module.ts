import { RequestIdMiddleware } from "@/middlewares/request-id.middleware";
import { RequestLoggerMiddleware } from "@/middlewares/request-logger.middleware";
import { TenantDatasourceMiddleware } from "@/middlewares/tenant-datasource.middleware";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./modules/prisma/prisma.module";

@Module({
  imports: [TerminusModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*");
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
    consumer.apply(TenantDatasourceMiddleware).forRoutes("*");
  }
}
