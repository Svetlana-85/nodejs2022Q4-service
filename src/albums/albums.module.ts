import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumStorage } from './store/album.storage';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumStorage],
  exports: [AlbumsService],
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => TracksModule)],
})
export class AlbumsModule {}
