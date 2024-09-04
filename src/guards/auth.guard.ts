import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserGuard } from "./user.guard";

@Injectable()
export class AuthGuard extends UserGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(
      "allowPublicAccess",
      context.getHandler(),
    );

    if (isPublicRoute) return true;

    return await super.canActivate(context);
  }
}
