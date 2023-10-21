import { BadRequestException, Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma-tenant/prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class TenantPrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(REQUEST) private readonly request: Request) {
    function getDatasourceUrl(tenantCode: string) {
      // TODO: Get this from the main database using `mainPrisma`.
      switch (tenantCode) {
        case "tenant_1":
          return process.env.TENANT_1_DATABASE_URL;
          break;
        case "tenant_2":
          return process.env.TENANT_2_DATABASE_URL;
          break;
        default:
          throw new BadRequestException("Invalid tenant code.");
          break;
      }
    }

    super({
      datasourceUrl: getDatasourceUrl(request.headers["x-tenant-code"])
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}