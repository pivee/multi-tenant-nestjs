import { IRequestWithProps } from "@/types/IRequestWithProps";
import {
  BadRequestException,
  Global,
  Module,
  NotFoundException,
  Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { PublicPrismaService } from "./public-prisma.service";
import {
  TENANT_PRISMA_SERVICE,
  TenantPrismaService,
} from "./tenant-prisma.service";

@Global()
@Module({
  exports: [PublicPrismaService, TENANT_PRISMA_SERVICE],
  providers: [
    PublicPrismaService,
    {
      provide: TENANT_PRISMA_SERVICE,
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: (request: IRequestWithProps) => {
        const { tenant } = request;

        if (!tenant) throw new BadRequestException("Invalid tenant code.");

        const { tenantCode, datasourceUrl } = tenant;

        if (datasourceUrl) {
          throw new NotFoundException("This tenant has no datasource.");
        }

        return new TenantPrismaService(datasourceUrl).withQueryExtensions(
          tenantCode,
        );
      },
    },
  ],
})
export class PrismaModule {}
