import { RequestIdMiddleware } from "@/middlewares/request-id.middleware";
import { RequestLoggerMiddleware } from "@/middlewares/request-logger.middleware";
import { TenantDatasourceMiddleware } from "@/middlewares/tenant-datasource.middleware";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TerminusModule } from "@nestjs/terminus";
import * as Joi from "joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UsersModule } from "./modules/routes/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test", "staging")
          .default("development"),
        PORT: Joi.number().port().default(3000),
        CORS_ORIGINS: Joi.string().default("*"),
        DATABASE_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TerminusModule,
    PrismaModule,
    UsersModule,
  ],
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
