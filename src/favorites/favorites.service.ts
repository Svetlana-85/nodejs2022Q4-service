import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistsService } from '../artists/artists.service';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { TracksService } from '../tracks/tracks.service';
import { Favorite } from './interfaces/favorite.interface';
import { FavoriteStorage } from './store/favorite.storage';

@Injectable()
export class FavoritesService {
  constructor(
    private storage: FavoriteStorage,
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
  ) {}

  findAll(): Favorite {
    const favorites = this.storage.findAll();
    const tracks: TrackEntity[] = favorites.tracks.map((item) => {
      return this.trackService.findOne(item);
    });
    const albums: AlbumEntity[] = favorites.albums.map((item) => {
      return this.albumService.findOne(item);
    });
    const artists: ArtistEntity[] = favorites.artists.map((item) => {
      return this.artistService.findOne(item);
    });
    return { artists, albums, tracks };
  }

  findTrack(id: string) {
    return this.trackService.findOne(id);
  }

  addTrack(id: string): number {
    return this.storage.addTrack(id);
  }

  findAlbum(id: string) {
    return this.albumService.findOne(id);
  }

  addAlbum(id: string): number {
    return this.storage.addAlbum(id);
  }

  findArtist(id: string) {
    return this.artistService.findOne(id);
  }

  addArtist(id: string): number {
    return this.storage.addArtist(id);
  }

  removeTrack(id: string) {
    this.storage.deleteTrack(id);
  }

  removeAlbum(id: string) {
    this.storage.deleteAlbum(id);
  }

  removeArtist(id: string) {
    this.storage.deleteArtist(id);
  }
}
