import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    if (!request.headers["x-request-id"]) {
      const requestId = randomUUID();
      request.headers["x-request-id"] = requestId;
    }
    next();
  }
}
