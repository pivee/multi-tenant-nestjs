import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class TenantPrismaService extends PrismaClient implements OnModuleInit {
  constructor(datasourceUrl: string) {
    super({
      datasourceUrl,
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "event",
          level: "error",
        },
        {
          emit: "event",
          level: "info",
        },
        {
          emit: "event",
          level: "warn",
        },
      ],
    });
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
    this.$on("query" as never, (e: Prisma.QueryEvent) => {
      Logger.debug("Query: " + e.query);
      Logger.debug("Params: " + e.params);
      Logger.debug("Duration: " + e.duration + "ms");
    });

    await this.$connect();
  }
}

export const TENANT_PRISMA_SERVICE = TenantPrismaService.name;
