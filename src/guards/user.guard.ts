import { IRequestWithProps } from "@/types/IRequestWithProps";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";

@Injectable()
export class UserGuard extends RolesGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(
      "allowPublicAccess",
      context.getHandler(),
    );
    if (isPublicRoute) return true;

    const request: IRequestWithProps = context.switchToHttp().getRequest();

    const { auth } = request;

    if (!auth) return false;

    const { userId } = auth;

    const user = { userId };

    if (user) {
      Logger.debug(`✅ Authenticated: ${userId}`, "UserGuard");
    } else {
      Logger.debug(
        `⛔ Unauthorized: ${request.hostname} [${request.ip}]`,
        "UserGuard",
      );
      return false;
    }

    request.user = user;

    return await super.canActivate(context);
  }
}
