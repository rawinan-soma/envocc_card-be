import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  //   providers: [QueueProcessor, QueueService],
  //   exports: [QueueService],
})
export class QueueModule {}
