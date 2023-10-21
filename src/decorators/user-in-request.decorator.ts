import { IRequestWithProps } from '@/types/IRequestWithProps';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: IRequestWithProps = ctx.switchToHttp().getRequest();
    return request.user;
  },
);