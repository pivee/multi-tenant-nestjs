import { Global, Module } from '@nestjs/common';
import { MainPrismaService } from './main-prisma.service';
import { TenantPrismaService } from './tenant-prisma.service';

@Global()
@Module({
  exports: [MainPrismaService, TenantPrismaService],
  providers: [MainPrismaService, TenantPrismaService],
})
export class PrismaModule {}
