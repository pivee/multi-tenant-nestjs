import { MainPrismaService } from '@/modules/prisma/main-prisma.service';
import { IRequestWithProps } from '@/types/IRequestWithProps';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class TenantDatasourceMiddleware implements NestMiddleware {
  constructor(private readonly mainPrisma: MainPrismaService) {}

  async use(request: IRequestWithProps, response: Response, next: () => void) {
    const tenantCode = request.headers["x-tenant-code"] as string;

    const tenant = await this.mainPrisma.tenant.findFirst({
      include: { datasource: true },
      where: { code: tenantCode },
    });

    request.tenant = {
      tenantCode: tenantCode,
      datasourceUrl: tenant?.datasource?.url,
    };

    next();
  }
}
