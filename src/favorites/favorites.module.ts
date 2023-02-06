import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoriteStorage } from './store/favorite.storage';
import { forwardRef } from '@nestjs/common/utils';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteStorage],
  exports: [FavoritesService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
})
export class FavoritesModule {}
