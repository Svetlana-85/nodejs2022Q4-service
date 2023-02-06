import { Injectable } from '@nestjs/common';
import { FavoriteEntity } from '../entities/favorite.entity';
import { FavoriteStore } from '../interfaces/favorite-storage.interface';

@Injectable()
export class FavoriteStorage implements FavoriteStore {
  private favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  findAll(): FavoriteEntity {
    return this.favorites;
  }

  addTrack(id: string): number {
    return this.favorites.tracks.push(id);
  }

  addAlbum(id: string): number {
    return this.favorites.albums.push(id);
  }

  addArtist(id: string): number {
    return this.favorites.artists.push(id);
  }

  deleteTrack(id: string): void {
    this.favorites.tracks = this.favorites.tracks.filter((item) => item !== id);
  }

  deleteAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter((item) => item !== id);
  }

  deleteArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (item) => item !== id,
    );
  }
}
