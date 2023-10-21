import { RolesAllowed } from '@/decorators/roles-allowed.decorator';
import { IRequestWithProps } from '@/types/IRequestWithProps';
import { IUserRole } from '@/types/IUserRole';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

function matchRoles(rolesRequired: IUserRole[], userRole: IUserRole) {
  return rolesRequired.includes(userRole);
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.get<boolean>("allowPublicAccess", context.getHandler());
    if (isPublicRoute) return true;

    const request: IRequestWithProps = context.switchToHttp().getRequest();

    if (!request.user) return false;

    const { role: userRole } = request.user;

    const allowedRoles = this.reflector.get(RolesAllowed, context.getHandler());
    if (!allowedRoles || allowedRoles.length === 0) return true;

    return matchRoles(allowedRoles, userRole ?? "GUEST");
  }
}