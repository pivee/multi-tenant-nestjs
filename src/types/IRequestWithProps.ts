import { Request } from 'express';

export interface IRequestWithProps extends Request {
  auth?: any;
  user?: any;
  apiKey?: string;
}
