import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck } from '@nestjs/terminus';
import * as metadata from 'package.json'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HealthCheck()
  async getHealthcheck() {
    const app = {
      name: metadata.name,
      version: metadata.version,
      environment: process.env.NODE_ENV,
    };

    const healthcheck = await this.appService.getHealthcheck();

    return { app, ...healthcheck };
  }
}
