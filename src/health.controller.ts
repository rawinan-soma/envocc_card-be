import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Controller('health')
export class HealthController {
  private redisClient;

  constructor(private configService: ConfigService) {
    this.redisClient = createClient({
      url: `redis://default@${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
    });
  }

  @Get('redis')
  async checkRedisConnection() {
    try {
      await this.redisClient.connect();
      await this.redisClient.ping();
      await this.redisClient.disconnect();

      return { status: 'ok', msg: 'Connected to Redis' };
    } catch {
      return { status: 'error', msg: 'Redis did not connected' };
    }
  }
}
