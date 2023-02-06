import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsStorage } from './store/artist.storage';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsStorage],
  exports: [ArtistsService],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
})
export class ArtistsModule {}
