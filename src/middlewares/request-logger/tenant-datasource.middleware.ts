import { MainPrismaService } from '@/modules/prisma/main-prisma.service';
import { IRequestWithProps } from '@/types/IRequestWithProps';
import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class TenantSourceMiddleware implements NestMiddleware {
  constructor(private readonly mainPrisma: MainPrismaService) {}

  async use(request: IRequestWithProps, response: Response, next: () => void) {
    const tenantCode = request.headers["x-tenant-code"] as string;

    const tenant = await this.mainPrisma.tenant.findFirst({
      include: { datasource: true },
      where: { code: tenantCode }
    });

    if (!tenant) throw new BadRequestException("Invalid tenant code.");
    if (!tenant.datasource) throw new NotFoundException("This tenant has no datasource.");

    request.tenant = {
      tenantCode: tenantCode,
      datasourceUrl: tenant.datasource.url
    };

    next();
  }
}
