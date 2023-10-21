import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck } from '@nestjs/terminus';
import * as metadata from 'package.json';
import { MainPrismaService } from './modules/prisma/main-prisma.service';
import { TenantPrismaService } from './modules/prisma/tenant-prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mainPrisma: MainPrismaService, private readonly tenantPrisma: TenantPrismaService) {}

  @Get()
  @HealthCheck()
  async getHealthcheck() {
    const app = {
      name: metadata.name,
      version: metadata.version,
      environment: process.env.NODE_ENV,
    };

    const healthcheck = await this.appService.getHealthcheck();

    return { app, ...healthcheck };
  }

  @Get('/test')
  async testDbConnections() {
    const tenants = await this.mainPrisma.tenant.findMany();
    const users = await this.tenantPrisma.user.findMany();

    return { tenants, users };
  }
}
