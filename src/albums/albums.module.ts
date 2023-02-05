import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumStorage } from './store/album.storage';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumStorage],
})
export class AlbumsModule {}
