import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as crypto from 'crypto';
import { Response } from 'express';
import { IRequestWithProps } from '@/types/IRequestWithProps';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(request: IRequestWithProps, response: Response, next: () => void) {
    request['ref'] = crypto.randomUUID();

    const { method, originalUrl, body } = request;
    const { statusCode } = response;

    Logger.log(`${method} ${statusCode} ${originalUrl} (${request['ref']})`);
    if (method !== 'GET') Logger.debug(body, `RequestBody: ${request['ref']}`);

    next();
  }
}
