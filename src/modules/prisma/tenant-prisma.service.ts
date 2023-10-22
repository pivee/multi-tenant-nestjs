import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-tenant/prisma/client';

@Injectable()
export class TenantPrismaService extends PrismaClient implements OnModuleInit {
  constructor(datasourceUrl: string) {
    super({ datasourceUrl });
  }

  withQueryExtensions(tenantCode: string) {
    return this.$extends({
      query: {
        $allOperations({ query }) {
          return query({ where: { tenantId: tenantCode } });
        },
      },
    });
  }

  async onModuleInit() {
    this.$connect();
  }
}

export const TENANT_PRISMA_SERVICE = TenantPrismaService.name;
