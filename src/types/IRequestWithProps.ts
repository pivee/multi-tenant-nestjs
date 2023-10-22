import { Request } from 'express';

export interface IRequestWithProps extends Request {
  auth?: any;
  user?: any;
  apiKey?: string;
  tenant?: {
    tenantCode?: string;
    datasourceUrl?: string;
  }
}
