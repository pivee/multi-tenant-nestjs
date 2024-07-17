import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import * as metadata from 'package.json';
import { AppService } from './app.service';
import { PublicPrismaService } from "./modules/prisma/public-prisma.service";
import {
  TENANT_PRISMA_SERVICE,
  TenantPrismaService,
} from "./modules/prisma/tenant-prisma.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mainPrisma: PublicPrismaService,
    @Inject(TENANT_PRISMA_SERVICE)
    private readonly tenantPrisma: TenantPrismaService
  ) {}

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

  @Get("/tenants")
  async getTenants() {
    const tenants = await this.mainPrisma.tenant.findMany();

    return { tenants };
  }

  @Get("/users")
  async getUsers() {
    /**
     * Since we're using query extensions with the Prisma client,
     * this query should return only the users with the column
     * "tenantId" matching that in the request "x-tenant-code".
     */
    const users = await this.tenantPrisma.user.findMany();

    return { users };
  }
}
