import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [FilesModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, FilesService],
})
export class DocumentsModule {}
