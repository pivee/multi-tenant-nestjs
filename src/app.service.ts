import { Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(private health: HealthCheckService){}
  
  getHealthcheck() {
    return this.health.check([]);
  }
}
