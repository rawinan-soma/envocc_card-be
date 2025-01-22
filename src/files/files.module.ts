import { Module } from '@nestjs/common';

import { FilesService } from './files.service';

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

@Module({
  imports: [],
  controllers: [],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
