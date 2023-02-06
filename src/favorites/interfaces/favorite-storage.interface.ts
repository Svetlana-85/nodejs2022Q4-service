import { FavoriteEntity } from '../entities/favorite.entity';

export interface FavoriteStore {
  findAll(): FavoriteEntity;
  addTrack(id: string): number;
  addAlbum(id: string): number;
  addArtist(id: string): number;
  deleteTrack(id: string): void;
}
