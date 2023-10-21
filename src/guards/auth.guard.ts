import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequestWithProps } from '@/types/IRequestWithProps';
import { UserGuard } from './user.guard';

@Injectable()
export class AuthGuard extends UserGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(
      'allowPublicAccess',
      context.getHandler(),
    );
    if (isPublicRoute) return true;

    const request: IRequestWithProps = context.switchToHttp().getRequest();

    const apiKeyInRequest = request.headers.authorization?.split(' ')[1];
    if (apiKeyInRequest) {
      request.apiKey = apiKeyInRequest;
      const apiKeyOnServer = process.env.RETOOL_API_KEY;
      if (apiKeyOnServer && apiKeyInRequest !== apiKeyOnServer) return false;
    }

    return await super.canActivate(context);
  }
}
