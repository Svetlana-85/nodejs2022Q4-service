import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TrackStorage } from './store/track.storage';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TrackStorage],
  exports: [TracksService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumsModule),
  ],
})
export class TracksModule {}
