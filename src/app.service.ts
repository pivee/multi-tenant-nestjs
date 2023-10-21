import { Injectable } from '@nestjs/common';
import * as metadata from 'package.json'

@Injectable()
export class AppService {
  getHealthcheck() {
    return {
      name: metadata.name,
      version: metadata.version,
      environment: process.env.NODE_ENV,
    };
  }
}
