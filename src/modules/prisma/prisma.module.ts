import { IRequestWithProps } from '@/types/IRequestWithProps';
import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { MainPrismaService } from './main-prisma.service';
import { TENANT_PRISMA_SERVICE, TenantPrismaService } from './tenant-prisma.service';

@Global()
@Module({
  exports: [MainPrismaService, "TenantPrismaService"],
  providers: [
    MainPrismaService,
    {
      provide: TENANT_PRISMA_SERVICE,
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: (request: IRequestWithProps) => {
        const { tenant: { datasourceUrl, tenantCode } } = request;
        return new TenantPrismaService(datasourceUrl).withQueryExtensions(tenantCode);
      },
    }
  ],
})
export class PrismaModule {}
