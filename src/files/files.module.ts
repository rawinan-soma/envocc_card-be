import { Module, Global } from '@nestjs/common';

import { FilesService, UploadService } from './files.service';
import { FilesController } from './files.controller';
import { RequestFileModule } from 'src/request-file/request-file.module';
import { ExpfileModule } from 'src/expfile/expfile.module';
import { GovcardModule } from 'src/govcard/govcard.module';
import { RequestFileServices } from 'src/request-file/request-file.service';
import { ExpfileService } from 'src/expfile/expfile.service';
import { GovcardService } from 'src/govcard/govcard.service';
import { MinioModule } from 'src/minio/minio.module';

// interface FileModuleOptions {
//   allowedExtensions: string[];
//   allowedSize: number;
// }

// @Module({})
// export class FilesModule {
//   static register(options: FileModuleOptions): DynamicModule {
//     return {
//       module: FilesModule,
//       providers: [
//         {
//           provide: 'FILE_OPTIONS',
//           useValue: options,
//         },
//         FilesService,
//       ],
//       exports: [FilesService],
//     };
//   }
// }
@Global()
@Module({
  imports: [RequestFileModule, ExpfileModule, GovcardModule, MinioModule],
  controllers: [FilesController],
  providers: [
    FilesService,
    UploadService,
    RequestFileServices,
    ExpfileService,
    GovcardService,
  ],
  exports: [FilesService],
})
export class FilesModule {}
